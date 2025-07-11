import { apiJournal } from "@pages/journal/api";
import { useMutation } from "@tanstack/react-query";

export function useDeleteSession() {
  const { isPending, mutateAsync, error } = useMutation({
    mutationFn: (exerciseId: string) => apiJournal.deleteSession(exerciseId),
  });

  return {
    deleteSession: mutateAsync,
    error,
    isLoading: isPending,
  };
}
