import { InputCommonProps } from "../inputBase/types";

export type InputTelProps = InputCommonProps & {
  onChange(value: string): void;
};
