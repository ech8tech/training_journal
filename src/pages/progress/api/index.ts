import { apiConf } from "@utils/fetch";

export const apiProgress = {
  getLineChart: (exerciseId: string, dateStart: string, dateEnd: string) => {
    return apiConf.get(`/charts/line_chart/${exerciseId}`, {
      params: { dateStart, dateEnd },
    });
  },
};
