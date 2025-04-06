import { SVGElement } from "@src/types/common";

export type ButtonVariant = "default" | "wide";
export type ButtonType = "primary" | "ghost" | "danger";
export type ButtonSize = "sm" | "md";

export type ButtonConfig = {
  text: string;
  className?: string;
  type?: ButtonType;
  variant?: ButtonVariant;
  size?: ButtonSize;
  isLoading?: boolean;
  isDisabled?: boolean;
  icon?: SVGElement;
  onClick?(): void;
};

export type ButtonProps = ButtonConfig;
