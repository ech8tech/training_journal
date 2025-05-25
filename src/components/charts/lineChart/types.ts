import { MuscleGroupType } from "@constants/muscles";

export type LineChartData = {
  date: string;
  commonRate: number;
};

export type LineChartProps = {
  data: LineChartData[];
  muscleGroupType: MuscleGroupType;
  exerciseName: string;
};
