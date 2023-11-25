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
    <div className="w-full bg-muted-foreground text-primary-foreground fixed top-0 z-10 h-[60px] flex items-center px-2">
      <Link href={'/'} className="flex items-center gap-x-2 font-semibold text-lg text-zinc-50 transition hover:text-zinc-300">
        <Icons.copy className="w-6 h-6" />
        CopyThing
      </Link>

      {loggedIn ? (
        <div className="ml-auto flex items-center gap-x-2">
          <Link
            href='/new-thing'
            className={cn(buttonVariants({size: 'sm'}))}
          >
            Create Thing
          </Link>
          <UserAccountNav user={session?.user as User} />
        </div>
      ) : (
        <Link href='/sign-in' className={cn('ml-auto', buttonVariants())}>
          Sign in and share your things
        </Link>
      )}
    </div>
  )
}
