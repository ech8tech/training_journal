import cn from "classnames";
import { useState } from "react";

import IconArrow from "@assets/icons/other/IconArrow.svg";
import { Text } from "@components/text/Text";
import { getSvgElement } from "@utils/elements";

import * as styles from "./Accordion.scss";
import { AccordionProps } from "./types";

export function Accordion({
  iconPrimary,
  iconSecondary,
  title,
  children,
}: AccordionProps) {
  const [isOpened, setIsOpened] = useState(false);

  const handleOpen = () => {
    setIsOpened((prevState) => !prevState);
  };

  return (
    <div>
      <div className={styles.wrapper} onClick={handleOpen}>
        {iconPrimary && getSvgElement(iconPrimary, 28, 28, styles.iconPrimary)}
        <div className={styles.header}>
          <Text className={styles.title} size="md">
            {title}
          </Text>
          <div className={styles.icons}>
            {iconSecondary}
            <IconArrow
              width={28}
              height={28}
              className={cn(styles.iconToggle, {
                [styles.iconToggle__opened]: isOpened,
              })}
            />
          </div>
        </div>
      </div>

      {isOpened && <div className={styles.content}>{children}</div>}
    </div>
  );
}
