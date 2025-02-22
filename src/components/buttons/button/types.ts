import { SVGElement } from "@src/types/common";

type ButtonType = "primary" | "ghost" | "danger";
type ButtonVariant = "default" | "full";

export type ButtonConfig = {
  text: string;
  type?: ButtonType;
  className?: string;
  variant?: ButtonVariant;
  icon?: SVGElement;
  onClick?(): void;
};

export type ButtonProps = ButtonConfig;
