import { ReactNode } from "react";

import { ButtonConfig } from "@components/buttons";

export type ModalProps = {
  title: string;
  content: ReactNode;
  buttonsConfig: ButtonConfig[];
  onClose?(): void;
};
