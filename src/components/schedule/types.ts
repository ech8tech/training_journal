import { MuscleGroup } from "@constants/muscles";
import { Period } from "@pages/statistics";

export type ScheduleModel = Record<string, [MuscleGroup, number][]>;

export type ScheduleProps = {
  calendarStart?: string;
  calendarEnd?: string;
  period?: Period;
};
