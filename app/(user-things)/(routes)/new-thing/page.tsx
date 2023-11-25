import {getAuthSession} from "@/lib/auth";
import {redirect} from "next/navigation";
import {ThingForm} from "@/components/forms/thing-form";

const NewThingPage = async () => {
  const session = await getAuthSession();
  if (!session?.user) {
    return redirect('/sign-in');
  }

  return (
    <div className="p-2 md:p-4 h-full flex items-center justify-center">
      <ThingForm />
    </div>
  )
}

export default NewThingPage;
