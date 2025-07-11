import { useContext } from "react";

import { ToastContext, ToastContextProps } from "@providers/toast";

export const useToast = (): ToastContextProps => {
  const ctx = useContext(ToastContext);
  if (!ctx) {
    throw new Error("useToast должен вызываться внутри ToastProvider");
  }
  return ctx;
};
