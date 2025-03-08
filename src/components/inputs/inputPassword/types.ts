import { InputCommonProps } from "../inputBase/types";

export type InputPasswordProps = InputCommonProps & {
  onChange(value: string): void;
};
