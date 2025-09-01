import { PieChartModel } from "@components/charts/pieChart";
import { MuscleGroup } from "@constants/muscles";
import { ExerciseData } from "@pages/journal/hooks/useGetExercisesByMuscleGroup/types";
import { apiConf } from "@utils/fetch";

export const apiStatistics = {
  getPieChart: ({
    muscleGroup,
    dateStart,
    dateEnd,
  }: {
    muscleGroup: MuscleGroup;
    dateStart: string;
    dateEnd: string;
  }) => {
    return apiConf.get<PieChartModel[]>(`/charts/pie_chart`, {
      params: { muscleGroup, dateStart, dateEnd },
    });
  },

  getExercises: () => {
    return apiConf.get<ExerciseData[]>("/exercise/all");
  },

  getMuscleGroups: () => {
    return apiConf.get<MuscleGroup[]>("/exercise/muscle_groups");
  },
};
