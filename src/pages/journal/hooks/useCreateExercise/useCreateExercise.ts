import { useToast } from "@hooks/useToast";
import { api } from "@src/api";
import { useMutation } from "@tanstack/react-query";

import { CreateExerciseDto } from "./types";

export function useCreateExercise(onClose: () => void) {
  const { openToastSuccess, openToastError } = useToast();

  const { isPending, mutateAsync, error } = useMutation({
    mutationFn: (payload: CreateExerciseDto) =>
      api.apiJournal.createExercise(payload),
    onSuccess: () => {
      openToastSuccess("Упражнение создано");
      onClose();
    },
    onError: () => {
      openToastError("Ошибка создания упражнения");
    },
  });

  return {
    createExercise: mutateAsync,
    error,
    isLoading: isPending,
  };
}
