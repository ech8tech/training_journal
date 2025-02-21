import { SVGElement } from "@src/types/common";
import { UseFormRegisterReturn } from "react-hook-form";

export type Option = {
  id: string | number;
  name: string | number;
  icon?: SVGElement;
};

export type SelectProps = {
  register: UseFormRegisterReturn;
  options: Option[];
  placeholder: string;
  className?: string;
  defaultOptionId?: string | number;
  label?: string;
};
