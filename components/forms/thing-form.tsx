"use client";

import {z} from "zod";
import {useState, useEffect} from "react";
import {ThingValidator} from "@/lib/validators/thing";
import {useRouter} from "next/navigation";
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  FormDescription,
} from "@/components/ui/form";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {Button, buttonVariants} from "@/components/ui/button";
import {Input} from "@/components/ui/input";
import {Icons} from "@/components/icons";
import {cn, isAxiosError} from "@/lib/utils";
import {toast} from "sonner";
import axios from "axios";
import {Textarea} from "@/components/ui/textarea";
import Link from "next/link";
import {useModal} from "@/hooks/use-modal-store";

interface ThingFormProps {
  initialId?: string;
  initialTitle?: string;
  initialContent?: string;
}

type formData = z.infer<typeof ThingValidator>;

export const ThingForm = (
  {
    initialId,
    initialTitle,
    initialContent
  }: ThingFormProps
) => {
  const router = useRouter();
  const [formType, setFormType] = useState<'create' | 'edit'>('create');
  const {onClose} = useModal();

  useEffect(() => {
    if (initialContent) {
      setFormType('edit');
    } else {
      setFormType('create');
    }
  }, [initialContent]);


  const form = useForm<formData>({
    resolver: zodResolver(ThingValidator),
    defaultValues: {
      title: initialTitle || '',
      content: initialContent || '',
    },
  });

  const {isSubmitting, isValid} = form.formState;

  const onSubmit = async (values: formData) => {
    if (formType === 'create') {
      try {
        const response = await axios.post('/api/thing', values);
        toast.success('Thing has been saved.');
        form.reset();
        router.push(`/thing/${response?.data?.id}`);
      } catch (error) {
        console.log("[CREATE THING CLIENT_ERROR]", error);
        if (isAxiosError(error)) {
          toast.error(`Something went wrong: ${error?.response?.data}`);
        } else {
          toast.error(`Something went wrong.`);
        }
      }
    } else {
      try {
        await axios.patch(`/api/thing/${initialId}`, values);
        router.refresh();
        toast.success('Thing edited.');
        onClose();
      } catch (error) {
        console.log("[EDIT THING CLIENT_ERROR]", error);
        if (isAxiosError(error)) {
          toast.error(`Something went wrong: ${error?.response?.data}`);
        } else {
          toast.error(`Something went wrong.`);
        }
      }
    }
  }

  return (
    <Card
      className={cn(
        'w-full max-w-3xl bg-zinc-100',
        formType === 'edit' && 'bg-zinc-200'
      )}
    >
      <CardHeader>
        <CardTitle>
          {formType === 'create' ? 'Create' : 'Edit'} CopyThing
        </CardTitle>
        <CardDescription>Share whatever you want. Up to 3000 characters</CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="w-full space-y-4"
          >
            <FormField
              name={'title'}
              control={form.control}
              render={({field}) => (
                <FormItem>
                  <FormLabel>
                    Title {formType === 'create' && '(not required)'}
                  </FormLabel>
                  <FormControl>
                    <Input
                      disabled={isSubmitting}
                      placeholder={"Doctor\'s phone number"}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              name={'content'}
              control={form.control}
              render={({field}) => (
                <FormItem>
                  <FormLabel>
                    Content {formType === 'create' && '(required)'}
                  </FormLabel>
                  <FormControl>
                    <Textarea
                      disabled={isSubmitting}
                      placeholder={"Content..."}
                      className="max-h-[300px]"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="flex items-center gap-x-2 w-full">
              {formType === 'create' ? (
                <Link
                  href={isSubmitting ? '' : '/'}
                  className={cn(buttonVariants({variant: 'outline'}))}
                >
                  Cancel
                </Link>
              ) : (
                <Button
                  variant={'outline'}
                  onClick={onClose}
                >
                  Cancel
                </Button>
              )}
              <Button
                className="gap-x-2 grow"
                disabled={isSubmitting || !isValid}
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
      </CardContent>
    </Card>
  )
}
