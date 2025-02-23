import { Spacing } from "@components/spacing/Spacing";
import { Text } from "@components/text/Text";
import { getSvgElement } from "@utils/elements";

import * as styles from "./Field.scss";
import { FieldProps } from "./types";

export function Field({ text, label, icon }: FieldProps) {
  return (
    <div>
      {label && (
        <Spacing space={4}>
          <Text type="secondary" size="sm">
            {label}
          </Text>
        </Spacing>
      )}
      <div className={styles.text}>
        {icon && getSvgElement(icon, 20, 20)}
        <Text size="md">{text}</Text>
      </div>
    </div>
  );
}
