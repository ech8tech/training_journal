import { SVGElement } from "@src/types/common";
import { PropsWithChildren } from "react";

export type AccordionProps = PropsWithChildren<{
  title: string;
  icon?: SVGElement;
}>;
