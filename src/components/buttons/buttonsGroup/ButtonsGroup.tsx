import { Button } from "@components/buttons";

import * as styles from "./ButtonsGroup.scss";
import { ButtonsGroupProps } from "./types";

export function ButtonsGroup({ buttonsConfig }: ButtonsGroupProps) {
  return (
    <div className={styles.buttonsGroup}>
      {buttonsConfig.map((button, i) => (
        <Button
          key={i}
          type={i === 0 ? "primary" : "ghost"}
          text={button.text}
        />
      ))}
    </div>
  );
}
