import { UseFormRegisterReturn } from "react-hook-form";

export type InputProps = {
  register: UseFormRegisterReturn;
  placeholder: string;
  className?: string;
  label?: string;
};
