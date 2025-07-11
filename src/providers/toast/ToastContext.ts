import { createContext } from "react";

export type ToastContextProps = {
  openToastSuccess(text: string): void;
  openToastError(text: string): void;
};

export const ToastContext = createContext<ToastContextProps | null>(null);
