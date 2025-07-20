import { useToast } from "@hooks/useToast";
import { apiJournal } from "@pages/journal/api";
import { useMutation } from "@tanstack/react-query";

export function useDeleteSession() {
  const { openToastSuccess, openToastError } = useToast();

  const { isPending, mutateAsync, error } = useMutation({
    mutationFn: (exerciseId: string) => apiJournal.deleteSession(exerciseId),
    onSuccess: () => {
      openToastSuccess("Сессия удалена");
    },
    onError: () => {
      openToastError("Ошибка удалении сессии");
    },
  });

  return {
    deleteSession: mutateAsync,
    error,
    isLoading: isPending,
  };
}
