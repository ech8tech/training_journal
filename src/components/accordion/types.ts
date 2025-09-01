import { PropsWithChildren } from "react";

import { SVGElement } from "@typings/ui";

export type AccordionProps = PropsWithChildren<{
  id: string;
  isOpen: boolean;
  title: string;
  iconPrimary?: SVGElement;
  iconSecondary?: SVGElement;
  onOpen(id: string): void;
}>;
