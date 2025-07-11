import { ReactNode } from "react";

import { SVGElement } from "@typings/ui";

export type TableProps<T> = {
  className?: string;
  columns: {
    key: keyof T; // reps | weight
    title: string;
  }[];
  rows: T[];
  buttonConfig?: {
    title: string;
    icon?: SVGElement;
    onClick?(): void;
  };
  header?: ReactNode;
  bodyEmpty?: ReactNode;
};
