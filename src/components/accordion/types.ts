import { PropsWithChildren } from "react";

import { SVGElement } from "@typings/ui";

export type AccordionProps = PropsWithChildren<{
  title: string;
  iconPrimary?: SVGElement;
  iconSecondary?: SVGElement;
}>;
