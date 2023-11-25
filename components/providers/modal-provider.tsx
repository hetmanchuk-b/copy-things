"use client"

import {useEffect, useState} from "react";
import {EditUsernameModal} from "@/components/modals/edit-username-modal";
import {EditThingModal} from "@/components/modals/edit-thing-modal";
import {DeleteThingModal} from "@/components/modals/delete-thing-modal";

export const ModalProvider = () => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) return null;

  return (
    <>
      <DeleteThingModal />
      <EditThingModal />
      <EditUsernameModal />
    </>
  )
}
