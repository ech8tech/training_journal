import { PropsWithChildren, ReactNode } from "react";

type ButtonType = "primary" | "ghost" | "danger";
type ButtonVariant = "default" | "full";

export type ButtonProps = PropsWithChildren<{
  type: ButtonType;
  variant?: ButtonVariant;
  icon?: ReactNode;
}>;
