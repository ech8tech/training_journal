import { Period } from "@pages/statistics";

export type ProgressFormProps = {
  period?: Period;
  calendar: {
    dateStart: string;
    dateEnd: string;
  };
};
