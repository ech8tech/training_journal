import cn from "classnames";
import { useState } from "react";

import { Text } from "@components/text/Text";

import * as styles from "./Chips.scss";
import { ChipsProps } from "./types";

export function Chips({ className, chips }: ChipsProps) {
  const [isActiveChip, setIsActiveChip] = useState<string>();

  const handleClick = (text: string, onClick: () => void) => {
    setIsActiveChip(text);
    onClick();
  };

  return (
    <div className={cn(className, styles.chips)}>
      {chips.map((chip) => (
        <div
          key={chip.text}
          className={cn(styles.chip, {
            [styles.chip__active]: isActiveChip === chip.text,
          })}
          onClick={() => handleClick(chip.text, chip.onClick)}
        >
          <Text>{chip.text}</Text>
        </div>
      ))}
    </div>
  );
}
