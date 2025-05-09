import cn from "classnames";

import * as styles from "./Text.scss";
import { TextProps } from "./types";

export function Text({
  size = "md",
  type = "primary",
  className,
  children,
  onClick,
}: TextProps) {
  return (
    <div
      onClick={onClick}
      className={cn(className, styles.text, {
        [styles.text_sm]: size === "sm",
        [styles.text_md]: size === "md",
        [styles.text_primary]: type === "primary",
        [styles.text_secondary]: type === "secondary",
        [styles.text_ghost]: type === "ghost",
      })}
    >
      {children}
    </div>
  );
}
