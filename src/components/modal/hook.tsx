import { useState } from "react";
import { createPortal } from "react-dom";

import { Modal } from "./Modal";
import { ModalProps } from "./types";

export function useModal() {
  const [modalProps, setModalProps] = useState<ModalProps | null>(null);

  const handleClose = () => {
    setModalProps(null);
  };

  const openModal = (props: ModalProps) => {
    setModalProps(props);
  };

  const modal =
    modalProps &&
    createPortal(
      <Modal {...modalProps} onClose={handleClose} />,
      document.body,
    );

  return { openModal, modal };
}
