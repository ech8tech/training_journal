import cn from "classnames";

import * as styles from "./Title.scss";
import { TitleProps } from "./types";

export function Title({ size, children }: TitleProps) {
  return (
    <div
      className={cn(styles.title, {
        [styles.title_h1]: size === "h1",
        [styles.title_h2]: size === "h2",
        [styles.title_h3]: size === "h3",
        [styles.title_h4]: size === "h4",
        [styles.title_h5]: size === "h5",
        [styles.title_h6]: size === "h6",
      })}
    >
      {children}
    </div>
  );
}
