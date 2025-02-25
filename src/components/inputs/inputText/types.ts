import { InputCommonProps } from "../inputBase/types";

export type InputTextProps = InputCommonProps & {
  onChange(value: string): void;
};
