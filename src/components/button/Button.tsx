import { Text } from "@components/text/Text";
import cn from "classnames";

import * as styles from "./Button.scss";
import { ButtonProps } from "./types";

export function Button({ children, type, variant, icon }: ButtonProps) {
  return (
    <button
      className={cn(styles.button, {
        [styles.button__primary]: type === "primary",
        [styles.button__ghost]: type === "ghost",
        [styles.button__danger]: type === "danger",
      })}
    >
      <Text size="md">{children}</Text>
      {icon && <div>{icon}</div>}
    </button>
  );
}
