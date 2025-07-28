import { MuscleGroup } from "@constants/muscles";

export type ScatterplotModel = {
  date: string;
  muscleGroup: MuscleGroup;
  exerciseName: string;
  sets: Array<{
    id: string;
    order: number;
    weight: number;
    reps: number;
  }>;
};

export type ScatterplotProps = {
  data?: ScatterplotModel[];
};
