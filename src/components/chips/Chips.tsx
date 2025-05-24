import cn from "classnames";

import { Text } from "@components/text/Text";

import * as styles from "./Chips.scss";
import { ChipsProps } from "./types";

export function Chips({ className, activeChipsId, chips }: ChipsProps) {
  return (
    <div className={cn(className, styles.chips)}>
      {chips.map(({ id, text, onClick }) => (
        <div
          key={text}
          className={cn(styles.chip, {
            [styles.chip__active]: activeChipsId === id,
          })}
          onClick={() => onClick(id)}
        >
          <Text>{text}</Text>
        </div>
      ))}
    </div>
  );
}
