import { Control, FieldValues, Path } from "react-hook-form";

import { SVGElement } from "@src/types/common";

export type Option = {
  id: string;
  name: string | number;
  icon?: SVGElement;
};

export type SelectProps<T extends FieldValues> = {
  name: Path<T>;
  options: Option[];
  control: Control<T>;
  placeholder: string;
  className?: string;
  defaultOptionId?: string;
  label?: string;
  onChange(option: Option): void;
};
