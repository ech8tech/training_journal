import cn from "classnames";

import * as styles from "./Text.scss";
import { TextProps } from "./types";

export function Text({ size, className, children }: TextProps) {
  return (
    <div
      className={cn(className, styles.text, {
        [styles.text__sm]: size === "sm",
        [styles.text__md]: size === "md",
      })}
    >
      {children}
    </div>
  );
}
