import cn from "classnames";

import IconSpinner from "@assets/icons/other/IconSpinner.svg";

import * as styles from "./Spinner.scss";
import { SpinnerProps } from "./types";

export function Spinner({
  size = 18,
  className,
  centered,
  isFullPage,
}: SpinnerProps) {
  return (
    <div
      className={cn({
        [styles.centered]: centered,
        [styles.fullPage]: isFullPage,
      })}
    >
      <IconSpinner
        width={size}
        height={size}
        className={cn(className, styles.spinner)}
      />
    </div>
  );
}
