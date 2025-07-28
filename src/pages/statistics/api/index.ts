import { ScatterplotModel } from "@components/charts/scatterplot";
import { MuscleGroup } from "@constants/muscles";
import { ExerciseData } from "@pages/journal/hooks/useGetExercisesByMuscleGroup/types";
import { apiConf } from "@utils/fetch";

export const apiStatistics = {
  getScatterplot: ({
    dateStart,
    dateEnd,
    muscleGroup,
  }: {
    dateStart: string;
    dateEnd: string;
    muscleGroup: MuscleGroup;
  }) => {
    return apiConf.get<ScatterplotModel[]>("/charts/scatterplot", {
      params: { dateStart, dateEnd, muscleGroup },
    });
  },

  getExercises: () => {
    return apiConf.get<ExerciseData[]>("/exercise/all");
  },
};
