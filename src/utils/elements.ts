import { SVGElement } from "@src/types/common";
import { cloneElement, isValidElement } from "react";

export function getSvgElement(
  icon?: SVGElement,
  width?: number,
  height?: number,
  className?: string,
) {
  return (
    isValidElement(icon) && cloneElement(icon, { width, height, className })
  );
}
