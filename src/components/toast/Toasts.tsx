import cn from "classnames";
import { createPortal } from "react-dom";

import * as styles from "./Toasts.scss";
import { Toast, ToastType } from "./types";

export function Toasts({ toasts }: { toasts: Toast[] }) {
  return createPortal(
    <div>
      {toasts.map((toast) => (
        <div
          key={toast.id}
          className={cn(styles.toast, {
            [styles.toast__success]: toast.type === ToastType.SUCCESS,
            [styles.toast__error]: toast.type === ToastType.ERROR,
          })}
        >
          {toast.text}
        </div>
      ))}
    </div>,
    document.getElementById("toasts-root")!,
  );
}
