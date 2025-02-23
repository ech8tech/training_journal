import * as styles from "@components/buttons/button/Button.scss";
import cn from "classnames";

import { ButtonType, ButtonVariant } from "./types";

export function getConfigClass(type: ButtonType, variant: ButtonVariant) {
  return {
    button: cn({
      [styles.button__primary]: type === "primary",
      [styles.button__ghost]: type === "ghost",
      [styles.button__danger]: type === "danger",
      [styles.button__full]: variant === "full",
    }),
    spinner: cn({
      [styles.button__primary_icon]: type === "primary",
      [styles.button__danger_icon]: type === "danger",
      [styles.button__ghost_icon]: type === "ghost",
    }),
    icon: cn({
      [styles.button__primary_icon]: type === "primary",
      [styles.button__danger_icon]: type === "danger",
      [styles.button__ghost_icon]: type === "ghost",
    }),
  };
}
