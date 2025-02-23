import IconSpinner from "@assets/icons/other/IconSpinner.svg";
import cn from "classnames";

import * as styles from "./Spinner.scss";
import { SpinnerType } from "./types";

export function Spinner({ size = 18, className }: SpinnerType) {
  return (
    <IconSpinner
      width={size}
      height={size}
      className={cn(className, styles.spinner)}
    />
  );
}
