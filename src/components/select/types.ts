import { Control, FieldValues, Path } from "react-hook-form";

import { SVGElement } from "@typings/ui";

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
  label?: string;
  onChange(option?: Option): void;
};
