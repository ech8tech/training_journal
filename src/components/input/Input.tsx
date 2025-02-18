import cn from "classnames";

import * as styles from "./Input.scss";
import { InputProps } from "./types";

export function Input({
  className,
  placeholder = "Введите",
  variant = "default",
}: InputProps) {
  return (
    <input
      placeholder={placeholder}
      className={cn(className, styles.input, {
        [styles.input__thin]: variant === "thin",
      })}
    />
  );
}
