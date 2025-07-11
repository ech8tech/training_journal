import IconCircleEmpty from "@assets/icons/other/IconCircleEmpty.svg";
import IconCircleTick from "@assets/icons/other/IconCircleTick.svg";
import { Text } from "@components/text/Text";

type CheckboxProps = {
  label: string;
  checked?: boolean;
  className?: string;
  onChange(value: boolean): void;
};

import * as styles from "./Checkbox.scss";

export function Checkbox({ label, checked, onChange }: CheckboxProps) {
  return (
    <label className={styles.container}>
      <Text className={styles.label}>{label}</Text>
      <input
        type="checkbox"
        checked={checked}
        onChange={(e) => onChange(e.target.checked)}
      />
      <span className={styles.checkmark}>
        {checked ? (
          <IconCircleTick className={styles.on} width={20} height={20} />
        ) : (
          <IconCircleEmpty className={styles.off} width={20} height={20} />
        )}
      </span>
    </label>
  );
}
