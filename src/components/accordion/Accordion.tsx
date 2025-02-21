import { IconArrow } from "@components/icons/IconArrow";
import { Text } from "@components/text/Text";
import { TEXT_PRIMARY } from "@constants/colors";
import { getSvgElement } from "@utils/elements";
import cn from "classnames";
import { useState } from "react";

import * as styles from "./Accordion.scss";
import { AccordionProps } from "./types";

export function Accordion({ icon, title, children }: AccordionProps) {
  const [isOpened, setIsOpened] = useState(false);

  const handleOpen = () => {
    setIsOpened((prevState) => !prevState);
  };

  return (
    <div className={styles.accordion}>
      <div className={styles.header} onClick={handleOpen}>
        {icon && getSvgElement(icon, 28, 28)}
        <div className={styles.title}>
          <Text size="md">{title}</Text>
          <IconArrow
            className={cn(styles.title_icon, {
              [styles.title_icon__opened]: isOpened,
            })}
            color={TEXT_PRIMARY}
          />
        </div>
      </div>

      {isOpened && <div className={styles.content}>{children}</div>}
    </div>
  );
}
