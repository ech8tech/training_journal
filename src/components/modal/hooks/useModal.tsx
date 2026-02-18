import { useState, useEffect } from "react";
import { createPortal } from "react-dom";

import { Modal } from "../Modal";
import { ModalProps } from "../types";

export function useModal() {
  const [modalProps, setModalProps] = useState<ModalProps | null>(null);

  const handleClose = () => {
    setModalProps(null);
  };

  const openModal = (props: ModalProps) => {
    setModalProps(props);
  };

  useEffect(() => {
    if (!modalProps) {
      document.body.style.overflow = "";
      return;
    }

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [modalProps]);
  

  const modal =
    modalProps &&
    createPortal(
      <Modal {...modalProps} onClose={handleClose} />,
      document.getElementById("modal-root")!,
    );

  return { openModal, modal, onClose: handleClose };
}
