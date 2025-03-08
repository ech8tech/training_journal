import cn from "classnames";

import * as styles from "./Button.scss";
import { ButtonSize, ButtonType, ButtonVariant } from "./types";

export function getConfigClass(
  type: ButtonType,
  variant: ButtonVariant,
  size: ButtonSize,
) {
  return {
    button: cn({
      [styles.button__primary]: type === "primary",
      [styles.button__ghost]: type === "ghost",
      [styles.button__danger]: type === "danger",
      [styles.button__wide]: variant === "wide",
    }),
    buttonSize: cn({
      [styles.button__sm]: variant === "default" && size === "sm",
      [styles.button__md]: variant === "default" && size === "md",
      [styles.button__wide__sm]: variant === "wide" && size === "sm",
      [styles.button__wide__md]: variant === "wide" && size === "md",
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
