import { ChangeEvent, TextareaHTMLAttributes } from "react";

type TextAreaBaseProps = Omit<
  TextareaHTMLAttributes<HTMLTextAreaElement>,
  "onChange"
>;

export type TextAreaProps = TextAreaBaseProps & {
  label?: string;
  className?: string;
  classNameTextArea?: string;
  onChange(e: ChangeEvent<HTMLTextAreaElement>): void;
};
