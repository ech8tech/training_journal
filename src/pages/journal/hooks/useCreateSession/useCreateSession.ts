import { api } from "@src/api";
import { useMutation } from "@tanstack/react-query";

import { CreateSessionDto } from "./types";

export function useCreateSession() {
  const { isPending, mutateAsync, error } = useMutation({
    mutationFn: (payload: CreateSessionDto) =>
      api.apiJournal.createSession(payload),
  });

  return {
    createSession: mutateAsync,
    error,
    isLoading: isPending,
  };
}
