import { MuscleGroup, MuscleType } from "@constants/muscles";
import { Period } from "@pages/statistics/types";

export type ProgressFormProps = {
  period?: Period;
  calendar?: {
    dateStart: string;
    dateEnd: string;
  };
};

export type ProgressData = {
  id: string;
  exerciseName: string;
  muscleType: MuscleType;
  muscleGroupType: MuscleGroup;
  sessions: {
    date: string;
    sets: {
      order: number;
      weight: number;
      reps: number;
    }[];
  }[];
};
