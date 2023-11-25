import {create} from "zustand";
import {Thing} from '@prisma/client';

export type ModalType = 'editUsername'
  | 'deleteThing'
  | 'editThing';

interface ModalData {
  username?: string;
  thing?: Thing;
}

interface ModalStore {
  type: ModalType | null;
  data: ModalData | null | undefined;
  isOpen: boolean;
  onOpen: (type: ModalType, data?: ModalData) => void;
  onClose: () => void;
}

export const useModal = create<ModalStore>((set) => ({
  type: null,
  isOpen: false,
  data: {},
  onOpen: (type, data = {}) => set({isOpen: true, type, data}),
  onClose: () => set({isOpen: false, type: null})
}));
