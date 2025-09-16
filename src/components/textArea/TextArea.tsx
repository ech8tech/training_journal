import cn from "classnames";

import { Spacing } from "@components/spacing/Spacing";
import { Text } from "@components/text/Text";

import * as styles from "./TextArea.scss";
import { TextAreaProps } from "./types";

export function TextArea({
  value,
  label,
  className,
  classNameTextArea,
  onChange,
  ...props
}: TextAreaProps) {
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
      <textarea
        className={cn(styles.textarea, classNameTextArea)}
        onChange={onChange}
        autoComplete="off"
        value={value}
        {...props}
      />
    </div>
  );
}
