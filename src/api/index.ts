import { apiAuth } from "@pages/authenticate/api";
import { apiJournal } from "@pages/journal/api";

import { apiProfile } from "./apiProfile";
import { apiUser } from "./apiUser";

export const api = {
  apiJournal,
  apiAuth,
  apiProfile,
  apiUser,
};
