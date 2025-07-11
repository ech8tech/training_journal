import { ApiError } from "@typings/api";

import { Page404 } from "./page404/Page404";
import { Page503 } from "./page503/Page503";

export function ErrorPage({ error }: { error: ApiError }) {
  switch (error.statusCode) {
    case 404: {
      return <Page404 />;
    }

    default: {
      return <Page503 />;
    }
  }
}
