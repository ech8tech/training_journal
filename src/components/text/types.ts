import { MouseEvent, PropsWithChildren } from "react";

type TextSize = "md" | "sm";
type TextType = "primary" | "secondary" | "ghost";

export type TextProps = PropsWithChildren<{
  size: TextSize;
  type?: TextType;
  className?: string;
  onClick?(event: MouseEvent): void;
}>;
