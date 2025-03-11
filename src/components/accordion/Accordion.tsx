import cn from "classnames";
import { useState } from "react";

import IconArrow from "@assets/icons/other/IconArrow.svg";
import { Text } from "@components/text/Text";
import { getSvgElement } from "@utils/elements";

import * as styles from "./Accordion.scss";
import { AccordionProps } from "./types";

export function Accordion({ icon, title, children }: AccordionProps) {
  const [isOpened, setIsOpened] = useState(false);

  const handleOpen = () => {
    setIsOpened((prevState) => !prevState);
  };

  return (
    <div>
      <div className={styles.header} onClick={handleOpen}>
        {icon && getSvgElement(icon, 28, 28)}
        <div className={styles.title}>
          <Text size="md">{title}</Text>
          <IconArrow
            width={28}
            height={28}
            className={cn(styles.title_icon, {
              [styles.title_icon__opened]: isOpened,
            })}
          />
        </div>
      </div>

      {isOpened && <div className={styles.content}>{children}</div>}
    </div>
  );
}
