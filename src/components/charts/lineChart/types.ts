import { MuscleGroup } from "@constants/muscles";

export type LineChartData = {
  date: string;
  commonRate: number;
};

export type LineChartProps = {
  data: LineChartData[];
  muscleGroupType: MuscleGroup;
  exerciseName: string;
};
