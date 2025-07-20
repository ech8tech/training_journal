import { useToast } from "@hooks/useToast";
import { api } from "@src/api";
import { useMutation } from "@tanstack/react-query";

import { CreateSessionDto } from "./types";

export function useCreateSession(onClose?: () => void) {
  const { openToastSuccess, openToastError } = useToast();

  const { isPending, mutateAsync, error } = useMutation({
    mutationFn: (payload: CreateSessionDto) =>
      api.apiJournal.createSession(payload),
    onSuccess: () => {
      openToastSuccess("Сессия добавлена");
      if (onClose) onClose();
    },
    onError: () => {
      openToastError("Ошибка добавлении сессии");
    },
  });

  return {
    createSession: mutateAsync,
    error,
    isLoading: isPending,
  };
}
