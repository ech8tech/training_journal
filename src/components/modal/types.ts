import { ReactNode } from "react";

export type ModalProps = {
  title: string;
  content: ReactNode;
  onClose?(): void;
};
