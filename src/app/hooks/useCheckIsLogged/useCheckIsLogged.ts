import { useMemo } from "react";

import { api } from "@src/api";
import { useQuery } from "@tanstack/react-query";

import { CheckIsLoggedModel } from "./types";

export function useCheckIsLogged() {
  const { data, isFetching } = useQuery<CheckIsLoggedModel>({
    queryKey: ["CHECK_IS_LOGGED"],
    queryFn: () => api.apiAuth.checkIsLogged(),
    retry: false,
  });

  return {
    data: useMemo(() => data?.data, [data]),
    isLogged: useMemo(() => !!data?.data, [data]),
    isLoading: isFetching,
  };
}
