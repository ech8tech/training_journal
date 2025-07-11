import "@tanstack/react-query";

import { ApiError } from "@typings/api";

declare module "@tanstack/react-query" {
  interface Register {
    defaultError: ApiError;
  }
}
