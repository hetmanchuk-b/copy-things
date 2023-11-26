import {getAuthSession} from "@/lib/auth";
import {redirect} from "next/navigation";
import {db} from "@/lib/db";
import Link from "next/link";
import {cn} from "@/lib/utils";
import {buttonVariants} from "@/components/ui/button";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import {Icons} from '@/components/icons';
import {ThingSmallItem} from "@/components/thing-small-item";

const UserThingsPage = async () => {
  const session = await getAuthSession();
  if (!session?.user) {
    return redirect('/sign-in');
  }

  const user = await db.user.findFirst({
    where: {
      id: session.user.id,
    },
    include: {
      things: {
        orderBy: {
          updatedAt: 'asc',
        }
      }
    }
  });

  return (
    <div className="p-2 md:p-4 flex flex-col items-start">
      {user?.things && user?.things?.length < 1 && (
        <p className="font-semibold text-zinc-700 text-center mx-auto">Empty...</p>
      )}
      {user?.things?.map((thing) => (
        <ThingSmallItem
          key={thing.id}
          thing={thing}
        />
      ))}
    </div>
  )
}

export default UserThingsPage;
