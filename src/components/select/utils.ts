import { SVGElementProps } from "@src/types/common";
import { cloneElement, isValidElement } from "react";

export function getIcon(icon?: SVGElementProps) {
  return isValidElement(icon) && cloneElement(icon, { width: 20, height: 20 });
}
