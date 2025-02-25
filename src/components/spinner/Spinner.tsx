import IconSpinner from "@assets/icons/other/IconSpinner.svg";
import cn from "classnames";

import * as styles from "./Spinner.scss";
import { SpinnerProps } from "./types";

export function Spinner({ size = 18, className, isFullPage }: SpinnerProps) {
  return (
    <div
      className={cn({
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
