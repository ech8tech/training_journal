import { apiJournal } from "@pages/journal/api";
import { useMutation } from "@tanstack/react-query";

import { EditExerciseDto } from "./types";

export function useEditExercise() {
  const { isPending, mutateAsync, error } = useMutation({
    mutationFn: ({
      exerciseId,
      payload,
    }: {
      exerciseId: string;
      payload: EditExerciseDto;
    }) => apiJournal.editExercise(exerciseId, payload),
  });

  return {
    editExercise: mutateAsync,
    error,
    isLoading: isPending,
  };
}
