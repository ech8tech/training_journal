import { useMemo } from "react";

import { api } from "@src/api";
import { useQuery } from "@tanstack/react-query";

import { ExercisesApiData } from "./types";

export function useGetExercises() {
  const { data, isFetching, error, refetch } = useQuery<ExercisesApiData>({
    queryKey: ["GET_USER_EXERCISES"],
    queryFn: () => api.apiStatistics.getExercises(),
  });

  return {
    data: useMemo(() => data?.data, [data]),
    error,
    isLoading: isFetching,
    getExercises: refetch,
  };
}
