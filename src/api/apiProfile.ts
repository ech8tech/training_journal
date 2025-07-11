import { ProfileDto } from "@pages/profile/types";
import { ProfileModel } from "@typings/profile";
import { apiConf } from "@utils/fetch";

export const apiProfile = {
  getProfile: () => {
    return apiConf.get<ProfileModel>("/profile");
  },
  createProfile: (profileDto: ProfileDto) => {
    return apiConf.post(`/profile/create`, profileDto);
  },
};
