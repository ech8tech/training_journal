import { MuscleGroup, MuscleType } from "@constants/muscles";
import { SetDto } from "@pages/journal/types";

export type CreateExerciseDto = {
  name: string;
  muscleGroup: MuscleGroup;
  muscleType: MuscleType;
  sets?: SetDto[];
};
