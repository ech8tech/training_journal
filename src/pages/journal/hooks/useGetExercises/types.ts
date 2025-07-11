import { MuscleGroup, MuscleType } from "@constants/muscles";
import { SetDto } from "@pages/journal/types";
import { ApiData } from "@typings/api";

export type ExerciseData = {
  id: string;
  name: string;
  muscleType: MuscleType;
  muscleGroup: MuscleGroup;
  isDone: boolean;
  sets?: SetDto[];
};

export type ExerciseApiData = ApiData<ExerciseData[]>;
