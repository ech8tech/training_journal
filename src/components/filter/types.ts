import { UseFormRegisterReturn } from "react-hook-form";

export type FilterProps = {
  configDateStart: UseFormRegisterReturn & { value?: string };
  configDateEnd: UseFormRegisterReturn & { value?: string };
  activeChipsId?: string;
  onClickChips(id: string): void;
  onResetCalendar(): void;
};
