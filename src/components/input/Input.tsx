import cn from "classnames";

import { InputProps } from "@components/input/types";
import { getMask } from "@components/input/utils";
import { Spacing } from "@components/spacing/Spacing";
import { Text } from "@components/text/Text";
import useMask from "@react-input/mask/useMask";

import * as styles from "./Input.scss";

export function Input({
  value,
  label,
  className,
  classNameInput,
  mask,
  onChange,
  ...props
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
        ref={mask ? inputRef : undefined}
        className={cn(styles.input, classNameInput)}
        onChange={onChange}
        autoComplete="off"
        value={value}
        {...props}
      />
    </div>
  );
}
