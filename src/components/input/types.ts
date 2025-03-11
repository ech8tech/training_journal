import { InputHTMLAttributes } from "react";

type InputBaseProps = Omit<InputHTMLAttributes<HTMLInputElement>, "onChange">;

export type InputMask = "tel";

export type InputProps = InputBaseProps & {
  onChange(value: string): void;
  label?: string;
  className?: string;
  mask?: InputMask;
};
