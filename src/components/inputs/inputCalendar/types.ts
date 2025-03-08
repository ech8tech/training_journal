import { InputCommonProps } from "../inputBase/types";

export type InputCalendarProps = InputCommonProps & {
  onChange(value: string): void;
};
