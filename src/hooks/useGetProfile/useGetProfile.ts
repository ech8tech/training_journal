import { useMemo } from "react";

import { api } from "@src/api";
import { useQuery } from "@tanstack/react-query";

export function useGetProfile() {
  const { data, isFetching, error } = useQuery({
    queryKey: ["GET_USER_PROFILE"],
    queryFn: () => api.apiProfile.getProfile(),
  });

  return {
    data: useMemo(() => data?.data, [data]),
    error,
    isLoading: isFetching,
  };
}
