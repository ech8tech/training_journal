import { PropsWithChildren, ReactNode } from "react";

export type PopupProps = PropsWithChildren<{
  id: string;
  isOpen: boolean;
  content: ReactNode;
  onOpen(id: string | null): void;
}>;
