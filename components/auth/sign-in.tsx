import {Icons} from '@/components/icons';
import {UserAuthForm} from "@/components/auth/user-auth-form";

export const SignIn = () => {
  return (
    <div className="container mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[400px]">
      <div className="flex flex-col space-y-2 text-center">
        <Icons.copy className="mx-auto w-6 h-6" />
        <h2 className="text-2xl font-semibold tracking-tight">Welcome back</h2>
        <p className="text-sm max-w-xs mx-auto balance">By continuing, you are setting up a Copy Thing App account</p>

        <UserAuthForm type={'Sign In'} />
      </div>
    </div>
  )
}
