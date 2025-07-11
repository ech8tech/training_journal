import { useMemo } from "react";

import { api } from "@src/api";
import { useQuery } from "@tanstack/react-query";

import { UserApiData } from "./types";

export function useGetUser() {
  const { data, isFetching } = useQuery<UserApiData>({
    queryKey: ["GET_USER"],
    queryFn: () => api.apiUser.getUser(),
  });

  return {
    data: useMemo(() => data?.data, [data]),
    isLoading: isFetching,
  };
}
