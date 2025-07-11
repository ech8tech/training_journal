import { MuscleType } from "@constants/muscles";
import { SetDto } from "@pages/journal/types";

export type EditExerciseDto = {
  name: string;
  muscleType: MuscleType;
  sets?: SetDto[];
};
