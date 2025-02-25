import { ChangeEvent, HTMLAttributes } from "react";

export type InputCommonProps = {
  name: string;
  label?: string;
  placeholder?: string;
  className?: string;
};

export type InputBaseProps = InputCommonProps & {
  displayValue: string;
  inputMode?: HTMLAttributes<HTMLInputElement>["inputMode"];
  onChange(e: ChangeEvent<HTMLInputElement>): void;
};
