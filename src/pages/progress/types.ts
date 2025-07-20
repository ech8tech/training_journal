import { Period } from "@pages/statistics/types";

export type ProgressFormProps = {
  period?: Period;
  calendar?: {
    dateStart: string;
    dateEnd: string;
  };
};
