import { PropsWithChildren } from "react";

type SizeTypes = "md" | "sm";

export type TextProps = PropsWithChildren<{
  size: SizeTypes;
  className?: string;
}>;

export enum SizeValues {
  md = 14,
  sm = 12,
}
