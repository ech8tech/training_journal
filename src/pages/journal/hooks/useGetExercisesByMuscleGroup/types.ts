import { MuscleGroup, MuscleType } from "@constants/muscles";
import { SetDto } from "@pages/journal/types";
import { ApiData } from "@typings/api";

export type ExerciseData = {
  id: string;
  name: string;
  sessionId: string | null;
  muscleType: MuscleType;
  muscleGroup: MuscleGroup;
  isDone: boolean;
  comment?: string;
  sets?: SetDto[];
};

export type ExercisesApiData = ApiData<ExerciseData[]>;
