"use client";

import {
  Dialog,
  DialogContent, DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {useModal} from "@/hooks/use-modal-store";
import {EditUsernameForm} from "@/components/forms/edit-username-form";


export const EditUsernameModal = () => {
  const {isOpen, onClose, type, data} = useModal();
  const isModalOpen = isOpen && type === 'editUsername';

  const {username} = data as {username: string};

  return (
    <Dialog open={isModalOpen} onOpenChange={onClose}>
      <DialogContent className="overflow-hidden">
        <DialogHeader>
          <DialogTitle>Edit username</DialogTitle>
          <DialogDescription>
            Your username will be visible near the things you shared
          </DialogDescription>
        </DialogHeader>

        <EditUsernameForm currentUsername={username} />
      </DialogContent>
    </Dialog>
  )
}
