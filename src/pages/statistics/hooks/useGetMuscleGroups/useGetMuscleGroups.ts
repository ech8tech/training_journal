import { useMemo } from "react";

import { api } from "@src/api";
import { useQuery } from "@tanstack/react-query";

import { MuscleGroupsApiData } from "./types";

export function useGetMuscleGroups() {
  const { data, isFetching, error, refetch } = useQuery<MuscleGroupsApiData>({
    queryKey: ["GET_MUSCLE_GROUPS"],
    queryFn: () => api.apiStatistics.getMuscleGroups(),
  });

  return {
    data: useMemo(() => data?.data, [data]),
    error,
    isLoading: isFetching,
    getExercises: refetch,
  };
}
