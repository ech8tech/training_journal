import { MuscleGroup, MuscleType } from "@constants/muscles";
import { ApiData } from "@typings/api";

export type ExerciseData = {
  id: string;
  name: string;
  muscleType: MuscleType;
  muscleGroup: MuscleGroup;
};

export type ExercisesApiData = ApiData<ExerciseData[]>;
