import { MuscleGroup } from "@constants/muscles";
import { SetDto } from "@pages/journal/types";

export type LineChartData = {
  date: string;
  commonRate: number;
  sets: SetDto[];
};

export type LineChartProps = {
  data?: LineChartData[];
  muscleGroup?: MuscleGroup;
  exerciseName?: string;
};
