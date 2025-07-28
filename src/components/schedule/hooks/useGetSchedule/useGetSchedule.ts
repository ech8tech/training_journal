import { useMemo } from "react";

import { END_DAY_OF_YEAR, START_DAY_OF_YEAR } from "@constants/dayjs";
import { Period } from "@pages/statistics";
import { api } from "@src/api";
import { useQuery } from "@tanstack/react-query";

export function useGetSchedule(
  startDate?: string,
  endDate?: string,
  period?: Period,
) {
  const _startDate = period === "year" ? START_DAY_OF_YEAR : startDate;
  const _endDate = period === "year" ? END_DAY_OF_YEAR : endDate;

  const { data, isFetching, error, refetch } = useQuery({
    queryKey: ["GET_SCHEDULE"],
    queryFn: () => api.apiSession.getSchedule(_startDate, _endDate),
  });

  return {
    data: useMemo(() => data?.data, [data]),
    error,
    isLoading: isFetching,
    getStatistics: refetch,
  };
}
