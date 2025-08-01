import { ReactNode } from "react";

import { ButtonConfig } from "@components/buttons";

export type TableProps<T> = {
  className?: string;
  columns: {
    key: keyof T; // reps | weight
    title: string;
  }[];
  rows: T[];
  buttonConfig?: ButtonConfig;
  header?: ReactNode;
  bodyEmpty?: ReactNode;
};
