import { useMemo } from "react";

import { MuscleGroup } from "@constants/muscles";
import { api } from "@src/api";
import { useQuery } from "@tanstack/react-query";

export function useGetScatterplot({
  muscleGroup,
  dateStart,
  dateEnd,
}: {
  muscleGroup: MuscleGroup;
  dateStart: string;
  dateEnd: string;
}) {
  const { data, isFetching, error, refetch } = useQuery({
    queryKey: ["GET_SCATTERPLOT"],
    queryFn: () =>
      api.apiStatistics.getScatterplot({ dateStart, dateEnd, muscleGroup }),
    enabled: false,
  });

  return {
    data: useMemo(() => data?.data, [data]),
    error,
    isLoading: isFetching,
    getScatterplot: refetch,
  };
}
