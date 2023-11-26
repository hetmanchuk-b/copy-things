import {NextResponse} from "next/server";
import {getAuthSession} from "@/lib/auth";
import {ThingValidator} from "@/lib/validators/thing";
import {db} from "@/lib/db";

export async function DELETE(
  req: Request,
  {params}: {params: {thingId: string}}
) {
  try {
    const session = await getAuthSession();
    if (!session?.user) {
      return new NextResponse('Unauthorized', {status: 401});
    }

    if (!params.thingId) {
      return new NextResponse('Thing ID missing', {status: 400});
    }

    const createdThing = await db.thing.findFirst({
      where: {
        id: params.thingId,
        creatorId: session.user.id,
      }
    });

    if (!createdThing) {
      return new NextResponse('Only creator can delete thing.', {status: 409});
    }

    await db.thing.delete({
      where: {
        id: params.thingId,
        creatorId: session.user.id,
      }
    });

    return new NextResponse('OK');
  } catch (error) {
    console.log("[DELETE THING API_ERROR]", error);
    return new NextResponse('Internal Error', {status: 500});
  }
}

export async function PATCH(
  req: Request,
  {params}: {params: {thingId: string}}
) {
  try {
    const session = await getAuthSession();
    if (!session?.user) {
      return new NextResponse('Unauthorized', {status: 401});
    }

    const body = await req.json();
    const {title, content} = ThingValidator.parse(body);

    if (!content) {
      return new NextResponse('Content missing', {status: 400});
    }

    if (!params.thingId) {
      return new NextResponse('Thing ID missing', {status: 400});
    }

    const createdThing = await db.thing.findFirst({
      where: {
        id: params.thingId,
        creatorId: session.user.id,
      }
    });

    if (!createdThing) {
      return new NextResponse('Only creator can modify thing.', {status: 409});
    }

    const thing = await db.thing.update({
      where: {
        id: params.thingId,
        creatorId: session.user.id,
      },
      data: {
        title,
        content,
      }
    });

    return NextResponse.json(thing);
  } catch (error) {
    console.log("[EDIT THING API_ERROR]", error);
    return new NextResponse('Internal Error', {status: 500});
  }
}
