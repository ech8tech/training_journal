import { MuscleGroup } from "@constants/muscles";

export type Period = "week" | "month" | "year";

export type StatisticsFormProps = {
  muscleGroup: MuscleGroup;
  period?: Period;
  calendar: {
    dateStart: string;
    dateEnd: string;
  };
};
