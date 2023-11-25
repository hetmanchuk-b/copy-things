import {db} from "@/lib/db";
import {notFound} from "next/navigation";
import {ThingCard} from "@/components/thing-card";
import {ThingWithCreator} from "@/types/main";

interface ThingIdPageProps {
  params: {
    thingId: string;
  }
}

const ThingIdPage = async ({params}: ThingIdPageProps) => {
  const thing = await db.thing.findUnique({
    where: {
      id: params.thingId
    },
    include: {
      creator: true,
    }
  });

  if (!thing) return notFound();

  return (
    <div className="p-2 md:p-4 min-h-full flex items-center justify-center">
      <ThingCard
        thing={thing as ThingWithCreator}
      />
    </div>
  )
}

export default ThingIdPage;
