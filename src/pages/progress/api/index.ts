import { apiConf } from "@utils/fetch";

export const apiProgress = {
  getExerciseGraphData: (exerciseId: string) => {
    return apiConf.get(`/exercise/${exerciseId}`);
  },
};
