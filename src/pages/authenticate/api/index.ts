import { UserDto } from "@pages/authenticate/common";
import { UserModel } from "@typings/user";
import { apiConf } from "@utils/fetch";

export const apiAuth = {
  signIn: (userDto: UserDto) => {
    return apiConf.post<UserModel>("/auth/sign_in", userDto);
  },

  signUp: (userDto: UserDto) => {
    return apiConf.post<UserModel>("/auth/sign_up", userDto);
  },
};
