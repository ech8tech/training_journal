import { LineChartData } from "@components/charts/lineChart";
import { MuscleGroup } from "@constants/muscles";
import { ApiData } from "@typings/api";

export type ExerciseGraphData = {
  exerciseName: string;
  muscleGroup: MuscleGroup;
  lineChartData: LineChartData[];
};

export type ExerciseApiGraphData = ApiData<ExerciseGraphData>;
