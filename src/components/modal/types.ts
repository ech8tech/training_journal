import { ButtonConfig } from "@components/buttons";
import { ReactNode } from "react";

export type ModalProps = {
  title: string;
  content: ReactNode;
  buttonsConfig: ButtonConfig[];
  onClose?(): void;
};
