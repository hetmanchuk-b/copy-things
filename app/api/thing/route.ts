import {NextResponse} from "next/server";
import {getAuthSession} from "@/lib/auth";
import {ThingValidator} from "@/lib/validators/thing";
import {db} from "@/lib/db";

export async function POST(req: Request) {
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

    const thing = await db.thing.create({
      data: {
        title,
        content,
        creatorId: session.user.id
      }
    });

    return NextResponse.json(thing);
  } catch (error) {
    console.log("[CREATE THING API_ERROR]", error);
    return new NextResponse('Internal Error', {status: 500});
  }
}
