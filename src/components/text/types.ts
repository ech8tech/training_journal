import { PropsWithChildren } from "react";

type TextSize = "md" | "sm";
type TextType = "primary" | "secondary";

export type TextProps = PropsWithChildren<{
  size: TextSize;
  type?: TextType;
  className?: string;
}>;
