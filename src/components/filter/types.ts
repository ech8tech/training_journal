import { ChangeEvent } from "react";
import { UseFormRegisterReturn } from "react-hook-form";

export type FilterProps = {
  configDateStart: Omit<UseFormRegisterReturn, "onChange"> & {
    value?: string;
    onChange(e: ChangeEvent<HTMLInputElement>): void;
  };
  configDateEnd: Omit<UseFormRegisterReturn, "onChange"> & {
    value?: string;
    onChange(e: ChangeEvent<HTMLInputElement>): void;
  };
  activeChipsId?: string;
  onClickChips(id: string): void;
};
