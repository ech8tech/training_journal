import { UserModel } from "@typings/user";
import { apiConf } from "@utils/fetch";

export const apiUser = {
  getUser: () => {
    return apiConf.get<UserModel>("/user");
  },
};
