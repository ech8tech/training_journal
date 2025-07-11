import cn from "classnames";
import { cloneElement, isValidElement } from "react";

import { SVGElement } from "@typings/ui";

export function getSvgElement(
  icon?: SVGElement,
  width?: number,
  height?: number,
  className?: string,
) {
  return (
    isValidElement(icon) &&
    cloneElement(icon, {
      width,
      height,
      className: cn(icon.props.className, className),
    })
  );
}
