import { useModal } from "@components/modal/hooks/useModal";

import {
  ModalAddEdit,
  ModalAddEditFormProps,
} from "../../components/modalAddEdit";

export function useModalAddEdit() {
  const { openModal, modal, onClose } = useModal();

  const handleOpenModal = (
    title: string,
    buttonText: string,
    editData?: ModalAddEditFormProps,
  ) => {
    openModal({
      title,
      content: (
        <ModalAddEdit
          onClose={onClose}
          buttonText={buttonText}
          editData={editData}
        />
      ),
    });
  };

  return { handleOpenModal, modal };
}
