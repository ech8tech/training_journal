import { PropsWithChildren } from "react";

type TextSize = "md" | "sm";

export type TextProps = PropsWithChildren<{
  size: TextSize;
  className?: string;
}>;
