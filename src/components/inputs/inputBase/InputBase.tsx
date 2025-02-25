import { Spacing } from "@components/spacing/Spacing";
import { Text } from "@components/text/Text";

import * as styles from "./InputBase.scss";
import { InputBaseProps } from "./types";

export function InputBase({
  name,
  label,
  placeholder,
  className,
  displayValue,
  inputMode,
  type,
  onChange,
}: InputBaseProps) {
  return (
    <div className={className}>
      {label && (
        <Spacing space={4}>
          <label className={styles.label}>
            <Text size="sm" type="secondary">
              {label}
            </Text>
          </label>
        </Spacing>
      )}
      <input
        name={name}
        value={displayValue}
        onChange={onChange}
        placeholder={placeholder}
        inputMode={inputMode}
        className={styles.input}
        type={type}
        autoComplete={type === "password" ? "new-password" : "off"}
      />
    </div>
  );
}
