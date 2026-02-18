import { useToast } from "@hooks/useToast";
import { apiJournal } from "@pages/journal/api";
import { useMutation } from "@tanstack/react-query";

export function useDeleteExercise() {
  const { openToastSuccess, openToastError } = useToast();

  const { isPending, mutateAsync, error } = useMutation({
    mutationFn: (exerciseId: string) => apiJournal.deleteExercise(exerciseId),
    onSuccess: () => {
      openToastSuccess("Упражнение удалено");
    },
    onError: () => {
      openToastError("Ошибка удаления упражнения");
    },
  });

  return {
    deleteExercise: mutateAsync,
    error,
    isLoading: isPending,
  };
}
