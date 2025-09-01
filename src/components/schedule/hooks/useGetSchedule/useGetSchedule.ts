import { useMemo } from "react";

import { api } from "@src/api";
import { useQuery } from "@tanstack/react-query";

export function useGetSchedule(startDate?: string, endDate?: string) {
  const { data, isFetching, error, refetch } = useQuery({
    queryKey: ["GET_SCHEDULE"],
    queryFn: () => api.apiSession.getSchedule(startDate, endDate),
  });

  return {
    data: useMemo(() => data?.data || {}, [data]),
    error,
    isLoading: isFetching,
    getStatistics: refetch,
  };
}
