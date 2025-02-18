import { Text } from "@components/text/Text";
import cn from "classnames";

import * as styles from "./Button.scss";
import { ButtonProps } from "./types";

export function Button({
  children,
  type,
  variant = "default",
  icon,
}: ButtonProps) {
  return (
    <button
      className={cn(styles.button, {
        [styles.button__primary]: type === "primary",
        [styles.button__ghost]: type === "ghost",
        [styles.button__danger]: type === "danger",
        [styles.button__full]: variant === "full",
      })}
    >
      <Text size="md">{children}</Text>
      {icon && <div className={styles.button__icon}>{icon}</div>}
    </button>
  );
}
