import { useMemo } from "react";

import { MuscleGroup } from "@constants/muscles";
import { apiJournal } from "@pages/journal/api";
import { useQuery } from "@tanstack/react-query";

import { ExerciseApiData } from "./types";

export function useGetExercises(muscleGroup: MuscleGroup) {
  const { data, isFetching, error } = useQuery<ExerciseApiData>({
    queryKey: ["GET_USER_EXERCISES"],
    queryFn: () => apiJournal.getExercises(muscleGroup),
  });

  return {
    data: useMemo(() => data?.data, [data]),
    error,
    isLoading: isFetching,
  };
}
