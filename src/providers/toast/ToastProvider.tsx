import { ReactNode, useCallback, useState } from "react";
import { v4 as uuid } from "uuid";

import { Toasts } from "@components/toast";
import { Toast, ToastType } from "@components/toast/types";

import { ToastContext } from "./ToastContext";

export function ToastProvider({ children }: { children: ReactNode }) {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const openToast = useCallback((text: string, type: ToastType) => {
    const id = uuid();

    setToasts((prev) => [...prev, { id, text, type }]);

    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 3000);
  }, []);

  const openToastSuccess = (text: string) => {
    openToast(text, ToastType.SUCCESS);
  };

  const openToastError = (text: string) => {
    openToast(text, ToastType.ERROR);
  };

  return (
    <ToastContext.Provider value={{ openToastSuccess, openToastError }}>
      {children}
      <Toasts toasts={toasts} />
    </ToastContext.Provider>
  );
}
