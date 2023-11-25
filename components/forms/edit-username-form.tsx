"use client";

import {Button} from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  FormDescription,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {Icons} from "@/components/icons";
import {isAxiosError} from "@/lib/utils";
import {z} from "zod";
import {UsernameValidator} from "@/lib/validators/username";
import {useModal} from "@/hooks/use-modal-store";
import {useRouter} from "next/navigation";
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {toast} from "sonner";
import axios from "axios";

interface EditUsernameFormProps {
  currentUsername: string;
}

type formData = z.infer<typeof UsernameValidator>;

export const EditUsernameForm = ({currentUsername}: EditUsernameFormProps) => {
  const {onClose} = useModal();
  const router = useRouter();

  const form = useForm<formData>({
    resolver: zodResolver(UsernameValidator),
    defaultValues: {
      name: currentUsername || '',
    },
  });

  const {isSubmitting, isValid} = form.formState;

  const onSubmit = async (values: formData) => {
    try {
      const response = await axios.patch('/api/username', values);
      console.log(response.data)
      toast.success(`Username has been updated to ${response?.data?.username}.`);
      form.reset();
      onClose();
      router.refresh();
    } catch (error) {
      console.log("[EDIT USERNAME CLIENT_ERROR]", error);
      if (isAxiosError(error)) {
        toast.error(`Your username was not updated: ${error?.response?.data}`);
      } else {
        toast.error(`Your username was not updated.`);
      }
    }
  }

  return (
    <div className="max-w-5xl w-full mx-auto flex flex-col md:items-center md:justify-center">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="w-full space-y-4"
        >
          <FormField
            name={'name'}
            control={form.control}
            render={({field}) => (
              <FormItem>
                <FormLabel>New username</FormLabel>
                <FormControl>
                  <Input
                    disabled={isSubmitting}
                    placeholder={'Minimum 3 characters'}
                    {...field}
                  />
                </FormControl>
                <FormMessage />
                <FormDescription>Username must not contain spaces, use _ instead</FormDescription>
              </FormItem>
            )}
          />

          <div className="flex items-center">
            <Button
              className="grow gap-x-2"
              disabled={!isValid || isSubmitting}
              type='submit'
            >
              Save
              {isSubmitting
                ? <Icons.spinner className="animate-spin w-6 h-6" />
                : <Icons.save className="w-6 h-6" />}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  )
}
