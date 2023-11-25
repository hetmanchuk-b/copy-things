import Link from "next/link";
import {cn} from "@/lib/utils";
import {buttonVariants} from "@/components/ui/button";
import {Icons} from '@/components/icons';
import {SignIn} from "@/components/auth/sign-in";

const SignInPage = () => {
  return (
    <div className="h-full max-w-2xl mx-auto w-full flex flex-col items-center justify-center">
      <Link href='/' className={cn(buttonVariants({variant: 'ghost'}), 'self-start -mt-16')}>
        <Icons.chevronLeft className="w-6 h-6 mr-2" />
        Home
      </Link>

      <SignIn />
    </div>
  )
}

export default SignInPage;
