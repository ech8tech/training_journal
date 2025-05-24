import { MuscleGroupType } from "@constants/muscles";

export type Period = "week" | "month" | "year";

export type StatisticsFormProps = {
  muscleGroupType?: MuscleGroupType;
  period?: Period;
  calendar?: {
    dateStart: string;
    dateEnd: string;
  };
};
