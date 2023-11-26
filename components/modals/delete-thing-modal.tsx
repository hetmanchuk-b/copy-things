"use client";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import {useModal} from "@/hooks/use-modal-store";
import {Thing} from '@prisma/client';
import {isAxiosError} from "@/lib/utils";
import {toast} from "sonner";
import axios from "axios";
import {useRouter} from "next/navigation";

export const DeleteThingModal = () => {
  const {isOpen, onClose, type, data} = useModal();
  const isModalOpen = isOpen && type === 'deleteThing';
  const router = useRouter();

  const {thing} = data as {thing: Thing};

  const onDelete = async () => {
    try {
      await axios.delete(`/api/thing/${thing?.id}`);
      toast.success('Thing has been deleted.');
      router.refresh();
      onClose();
    } catch (error) {
      console.log("[DELETE THING CLIENT_ERROR]", error);
      if (isAxiosError(error)) {
        toast.error(`Your username was not updated: ${error?.response?.data}`);
      } else {
        toast.error(`Your username was not updated.`);
      }
    }
  }

  return (
    <AlertDialog open={isModalOpen} onOpenChange={onClose}>
      <AlertDialogContent className="bg-zinc-200">
        <AlertDialogHeader>
          <AlertDialogTitle>
            Are you absolutely sure?
          </AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete your thing from our servers.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel className="grow">
            Cancel
          </AlertDialogCancel>
          <AlertDialogAction onClick={onDelete}>
            Continue
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}
