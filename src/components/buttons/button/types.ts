import { SVGElement } from "@src/types/common";

export type ButtonVariant = "default" | "full";
export type ButtonType = "primary" | "ghost" | "danger";

export type ButtonConfig = {
  text: string;
  type?: ButtonType;
  className?: string;
  variant?: ButtonVariant;
  isLoading?: boolean;
  icon?: SVGElement;
  onClick?(): void;
};

export type ButtonProps = ButtonConfig;
