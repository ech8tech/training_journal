import { useModal } from "@components/modal/hook";

import { ModalAddEdit, ModalAddEditFormProps } from "./modalAddEdit";

export function useOpenModal() {
  const { openModal, modal, onClose } = useModal();

  const handleOpenModal = (
    title: string,
    buttonText: string,
    formData?: ModalAddEditFormProps,
  ) => {
    openModal({
      title,
      content: <ModalAddEdit formData={formData} />,
      buttonsConfig: [{ text: buttonText, onClick: onClose }],
    });
  };

  return { handleOpenModal, modal };
}
