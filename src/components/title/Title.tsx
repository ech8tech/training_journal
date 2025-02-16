import { BASE_SIZE } from "@constants/spacing";

import * as styles from "./Title.scss";
import { SizeValues, TitleProps } from "./types";

export function Title({ size, children }: TitleProps) {
  const stylesInline = {
    fontSize: `${SizeValues[size] / BASE_SIZE}rem`,
    lineHeight: `${(SizeValues[size] + 4) / BASE_SIZE}rem`,
  };

  return (
    <div className={styles.title} style={stylesInline}>
      {children}
    </div>
  );
}
