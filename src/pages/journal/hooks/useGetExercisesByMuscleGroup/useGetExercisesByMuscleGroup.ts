import { useMemo } from "react";

import { MuscleGroup } from "@constants/muscles";
import { apiJournal } from "@pages/journal/api";
import { useQuery } from "@tanstack/react-query";

import { ExercisesModel } from "./types";

export function useGetExercisesByMuscleGroup(
  muscleGroup: MuscleGroup,
  isEnable: boolean = true,
) {
  const { data, isFetching, error, refetch } = useQuery<ExercisesModel>({
    queryKey: ["GET_USER_EXERCISES_BY_MUSCLE_GROUP"],
    queryFn: () => apiJournal.getExercisesByMuscleGroup(muscleGroup),
    enabled: isEnable,
  });

  return {
    data: useMemo(
      () => data?.data?.sort((a, b) => a.name.localeCompare(b.name)),
      [data],
    ),
    error,
    isLoading: isFetching,
    getExercises: refetch,
  };
}
