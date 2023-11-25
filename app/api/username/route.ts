import {getAuthSession} from "@/lib/auth";
import {NextResponse} from "next/server";
import {UsernameValidator} from "@/lib/validators/username";
import {db} from "@/lib/db";

export async function PATCH(req: Request) {
  try {
    const session = await getAuthSession();

    if (!session?.user) {
      return new NextResponse('Unauthorized', {status: 401});
    }

    const body = await req.json();
    const {name} = UsernameValidator.parse(body);

    const takenUsername = await db.user.findFirst({
      where: {
        username: name
      },
    });

    if (takenUsername) {
      return new NextResponse('Username is already taken', {status: 409});
    }

    const user = await db.user.update({
      where: {
        id: session.user.id,
      },
      data: {
        username: name,
      },
    });

    return NextResponse.json(user);

  } catch (error) {
    console.log("[EDIT USERNAME API_ERROR]", error);
    return new NextResponse('Internal error', {status: 500});
  }
}
