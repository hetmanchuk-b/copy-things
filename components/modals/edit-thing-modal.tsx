"use client";

import {
  Dialog,
  DialogContent,
} from "@/components/ui/dialog";
import {useModal} from "@/hooks/use-modal-store";
import {Thing} from '@prisma/client';
import {ThingForm} from "@/components/forms/thing-form";


export const EditThingModal = () => {
  const {isOpen, onClose, type, data} = useModal();
  const isModalOpen = isOpen && type === 'editThing';

  const thing = data as Thing;

  return (
    <Dialog open={isModalOpen} onOpenChange={onClose}>
      <DialogContent className="overflow-hidden p-0">
        <ThingForm
          initialId={thing?.id}
          initialTitle={thing?.title || ''}
          initialContent={thing?.content}
        />
      </DialogContent>
    </Dialog>
  )
}
