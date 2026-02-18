import { useModal } from "@components/modal/hooks/useModal";

import { ModalDelete } from "../../ModalDelete";

export function useModalDelete() {
  const { openModal, modal, onClose } = useModal();

  const handleClose = async () => {
    onClose();
  };

  const handleOpenModal = (exerciseId: string) => {
    openModal({
      title: "Удаление упражнения",
      content: <ModalDelete exerciseId={exerciseId} onClose={handleClose} />,
    });
  };

  return { handleOpenModal, modal };
}
