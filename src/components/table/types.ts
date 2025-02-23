import { SVGElement } from "@src/types/common";

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
};
