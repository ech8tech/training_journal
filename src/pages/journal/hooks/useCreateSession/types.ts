export type CreateSessionDto = {
  date: string;
  exerciseId: string;
  sets?: {
    order: number;
    reps: number;
    weight: number;
  }[];
};
