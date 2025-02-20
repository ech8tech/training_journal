import { Text } from "@components/text/Text";
import cn from "classnames";

import * as styles from "./Input.scss";
import { InputProps } from "./types";

export function Input({
  className,
  placeholder = "Введите",
  label,
}: InputProps) {
  return (
    <div className={styles.container}>
      {label && (
        <label className={styles.label}>
          <Text size="sm" type="secondary">
            {label}
          </Text>
        </label>
      )}
      <input
        placeholder={placeholder}
        className={cn(className, styles.input)}
      />
    </div>
  );
}
