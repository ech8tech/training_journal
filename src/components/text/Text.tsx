import { BASE_SIZE } from "@constants/spacing";
import cn from "classnames";

import * as styles from "./Text.scss";
import { SizeValues, TextProps } from "./types";

export function Text({ size, className, children }: TextProps) {
  const stylesInline = {
    fontSize: `${SizeValues[size] / BASE_SIZE}rem`,
    lineHeight: `${(SizeValues[size] + 4) / BASE_SIZE}rem`,
  };

  return (
    <div className={cn(className, styles.text)} style={stylesInline}>
      {children}
    </div>
  );
}
