import { InputHTMLAttributes } from "react";

type InputBaseProps = Omit<InputHTMLAttributes<HTMLInputElement>, "onChange">;

export type InputMask = "tel";

export type InputProps = InputBaseProps & {
  label?: string;
  className?: string;
  classNameInput?: string;
  mask?: InputMask;
  onChange(value: string): void;
};
