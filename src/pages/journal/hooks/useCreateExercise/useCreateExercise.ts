import { api } from "@src/api";
import { useMutation } from "@tanstack/react-query";

import { CreateExerciseDto } from "./types";

export function useCreateExercise() {
  const { isPending, mutateAsync, error } = useMutation({
    mutationFn: (payload: CreateExerciseDto) =>
      api.apiJournal.createExercise(payload),
  });

  return {
    createExercise: mutateAsync,
    error,
    isLoading: isPending,
  };
}
