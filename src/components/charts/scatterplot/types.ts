import { MuscleGroup } from "@constants/muscles";

export type LineChartData = {
  date: string;
  muscleGroupType: MuscleGroup;
  exerciseName: string;
  sets: Array<{
    order: number;
    weight: number;
    reps: number;
  }>;
};

export type LineChartProps = {
  data: LineChartData[];
};
