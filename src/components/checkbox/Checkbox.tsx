import IconTick from "@assets/icons/other/IconTick.svg";
import { Text } from "@components/text/Text";

type CheckboxProps = {
  name: string;
  label: string;
  checked?: boolean;
  className?: string;
  onChange(value: boolean): void;
};

import * as styles from "./Checkbox.scss";

export function Checkbox({ name, label, checked, onChange }: CheckboxProps) {
  return (
    <label className={styles.container}>
      <Text className={styles.label}>{label}</Text>
      <input
        name={name}
        type="checkbox"
        checked={checked}
        onChange={(e) => onChange(e.target.checked)}
      />
      <span className={styles.checkmark}>
        <IconTick width={8} className={styles.checkmark_icon} />
      </span>
    </label>
  );
}
