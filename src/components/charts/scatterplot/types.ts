import { MuscleGroupType } from "@constants/muscles";

export type LineChartData = {
  date: string;
  muscleGroupType: MuscleGroupType;
  exerciseName: string;
  sets: Array<{
    order: number;
    weight: number;
    reps: number;
  }>;
};

export type LineChartProps = {
  data: LineChartData[];
  hideDays: boolean;
};
