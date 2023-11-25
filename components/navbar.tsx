import {getAuthSession} from "@/lib/auth";
import {Icons} from '@/components/icons';
import Link from "next/link";
import {cn} from "@/lib/utils";
import {buttonVariants} from "@/components/ui/button";
import {UserAccountNav} from "@/components/user-account-nav";
import {User} from "next-auth";

export const Navbar = async () => {
  const session = await getAuthSession();
  let loggedIn = false;
  if (session?.user) loggedIn = true;

  return (
    <div className="w-full bg-muted-foreground text-primary-foreground sm:fixed top-0 z-10 h-auto sm:h-[60px] flex-col-reverse sm:flex-row py-2 sm:py-0 justify-center gap-2 flex items-center px-2">
      <Link href={'/'} className="flex items-center gap-x-2 p-3 font-semibold text-md text-zinc-50 transition rounded-md hover:bg-zinc-900/20 hover:text-zinc-300">
        <Icons.copy className="w-6 h-6" />
        CopyThing App
      </Link>

      {loggedIn ? (
        <div className="sm:ml-auto flex flex-col sm:flex-row gap-2 items-center">
          <Link
            href='/new-thing'
            className={cn(buttonVariants({size: 'lg'}), 'bg-zinc-600 h-[48px] gap-x-2 text-md')}
          >
            Create Thing
            <Icons.addCircle className="w-5 h-5" />
          </Link>
          <UserAccountNav user={session?.user as User} />
        </div>
      ) : (
        <Link href='/sign-in' className={cn('sm:ml-auto', buttonVariants())}>
          Sign in and share your things
        </Link>
      )}
    </div>
  )
}
