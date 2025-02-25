import { InputCommonProps } from "../inputBase/types";

export type InputNumberProps = InputCommonProps & {
  onChange(value: string): void;
};
