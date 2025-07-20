import { useToast } from "@hooks/useToast";
import { apiJournal } from "@pages/journal/api";
import { useMutation } from "@tanstack/react-query";

import { EditExerciseDto } from "./types";

export function useEditExercise(onClose: () => void) {
  const { openToastSuccess, openToastError } = useToast();

  const { isPending, mutateAsync, error } = useMutation({
    mutationFn: ({
      exerciseId,
      payload,
    }: {
      exerciseId: string;
      payload: EditExerciseDto;
    }) => apiJournal.editExercise(exerciseId, payload),
    onSuccess: () => {
      openToastSuccess("Упражнение отредактировано");
      onClose();
    },
    onError: () => {
      openToastError("Ошибка редактирования упражнения");
    },
  });

  return {
    editExercise: mutateAsync,
    error,
    isLoading: isPending,
  };
}
