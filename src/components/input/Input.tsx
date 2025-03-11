import { InputProps } from "@components/input/types";
import { getMask } from "@components/input/utils";
import { Spacing } from "@components/spacing/Spacing";
import { Text } from "@components/text/Text";
import useMask from "@react-input/mask/useMask";

import * as styles from "./Input.scss";

export function Input({
  name,
  label,
  placeholder,
  className,
  value,
  inputMode,
  type,
  onChange,
  mask,
}: InputProps) {
  const inputRef = useMask(getMask(mask));

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
        ref={inputRef}
        name={name}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        inputMode={inputMode}
        className={styles.input}
        type={type}
        autoComplete="off"
      />
    </div>
  );
}
