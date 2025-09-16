import { ScheduleModel } from "@components/schedule";
import { apiConf } from "@utils/fetch";

export const apiSession = {
  getSchedule: (dateStart?: string, dateEnd?: string) => {
    return apiConf.get<ScheduleModel>(`/charts/schedule`, {
      params: { dateStart, dateEnd },
    });
  },
};
