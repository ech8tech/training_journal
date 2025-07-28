import { apiAuth } from "@pages/authenticate/api";
import { apiJournal } from "@pages/journal/api";
import { apiProgress } from "@pages/progress/api";
import { apiStatistics } from "@pages/statistics/api";

import { apiProfile } from "./apiProfile";
import { apiSession } from "./apiSession";
import { apiUser } from "./apiUser";

export const api = {
  apiUser,
  apiProfile,
  apiSession,
  apiJournal,
  apiAuth,
  apiProgress,
  apiStatistics,
};
