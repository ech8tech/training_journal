import { useMemo } from "react";

import { MuscleGroup } from "@constants/muscles";
import { api } from "@src/api";
import { useQuery } from "@tanstack/react-query";

export function useGetPieChart({
  dateStart,
  dateEnd,
  muscleGroup,
}: {
  dateStart: string;
  dateEnd: string;
  muscleGroup: MuscleGroup;
}) {
  const { data, isFetching, error, refetch } = useQuery({
    queryKey: ["GET_PIE_CHART"],
    queryFn: () =>
      api.apiStatistics.getPieChart({ dateStart, dateEnd, muscleGroup }),
    enabled: false,
  });

  return {
    data: useMemo(() => data?.data, [data]),
    error,
    isLoading: isFetching,
    getPieChart: refetch,
  };
}
