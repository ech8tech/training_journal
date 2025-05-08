import { MouseEvent, PropsWithChildren } from "react";

type TextSize = "sm" | "md";
type TextType = "primary" | "secondary" | "ghost";

export type TextProps = PropsWithChildren<{
  size?: TextSize;
  type?: TextType;
  className?: string;
  onClick?(event: MouseEvent): void;
}>;
