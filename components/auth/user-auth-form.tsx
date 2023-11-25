"use client"

import {useState} from "react";
import {Button} from "@/components/ui/button";
import {Icons} from '@/components/icons';
import {signIn} from "next-auth/react";

interface UserAuthFormProps {
  type: 'Sign In' | 'Sign Up';
}

export const UserAuthForm = ({type}: UserAuthFormProps) => {
  const [isLoading, setIsLoading] = useState(false);

  const loginWithGoogle = async () => {
    setIsLoading(true);
    try {
      await signIn('google')
    } catch (error) {
      console.log("[GOOGLE LOGIN_ERROR]", error);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="flex justify-center flex-col gap-y-2">
      <Button
        size='sm'
        className="w-full"
        disabled={isLoading}
        onClick={loginWithGoogle}
      >
        {isLoading
          ? <Icons.spinner className="animate-spin w-4 h-4 mr-2" />
          : <Icons.google className="w-4 h-4 mr-2" />}
        {type} with Google
      </Button>
    </div>
  )
}
