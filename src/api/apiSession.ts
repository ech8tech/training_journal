import { apiConf } from "@utils/fetch";

export const apiSession = {
  getSchedule: (dateStart?: string, dateEnd?: string) => {
    return apiConf.get<{ dates: string[] }>(`/charts/schedule`, {
      params: { dateStart, dateEnd },
    });
  },
};
