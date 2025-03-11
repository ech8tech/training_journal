import { PropsWithChildren } from "react";

import { SVGElement } from "@src/types/common";

export type AccordionProps = PropsWithChildren<{
  title: string;
  icon?: SVGElement;
}>;
