import { useMemo } from "react";
import { useParams } from "react-router-dom";

import { api } from "@src/api";
import { useQuery } from "@tanstack/react-query";

import { ExerciseApiGraphData } from "./types";

export function useGetExerciseGraphData() {
  const params = useParams<{ exerciseId: string }>();
  const exerciseId = params.exerciseId!;

  const { data, isFetching, error } = useQuery<ExerciseApiGraphData>({
    queryKey: ["GET_EXERCISE_GRAPH_DATA", exerciseId],
    queryFn: () => api.apiProgress.getExerciseGraphData(exerciseId),
  });

  return {
    data: useMemo(() => data?.data, [data]),
    error,
    isLoading: isFetching,
  };
}
