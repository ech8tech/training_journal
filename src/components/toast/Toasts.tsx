import cn from "classnames";
import { createPortal } from "react-dom";

import { Text } from "@components/text";

import * as styles from "./Toasts.scss";
import { Toast, ToastType } from "./types";

export function Toasts({ toasts }: { toasts: Toast[] }) {
  return createPortal(
    <div className={styles.container}>
      {toasts.map((toast) => {
        return (
          <div
            key={toast.id}
            className={cn(styles.toast, {
              [styles.toast__success]: toast.type === ToastType.SUCCESS,
              [styles.toast__error]: toast.type === ToastType.ERROR,
            })}
          >
            <Text size="sm">{toast.text}</Text>
          </div>
        );
      })}
    </div>,
    document.getElementById("toasts-root")!,
  );
}
