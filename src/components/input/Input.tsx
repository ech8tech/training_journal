import { Spacing } from "@components/spacing/Spacing";
import { Text } from "@components/text/Text";

import * as styles from "./Input.scss";
import { InputProps } from "./types";

export function Input({ className, placeholder, label, register }: InputProps) {
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
      <input {...register} placeholder={placeholder} className={styles.input} />
    </div>
  );
}
