import { Option } from "@components/select";
import {
  END_DAY_OF_MONTH,
  END_DAY_OF_WEEK,
  END_DAY_OF_YEAR,
  START_DAY_OF_MONTH,
  START_DAY_OF_WEEK,
  START_DAY_OF_YEAR,
} from "@constants/dayjs";
import { MuscleGroupName } from "@constants/muscles";

import { ExerciseData } from "./hooks";
import { Period } from "./types";

export function getDateConfig(period: Period) {
  const config = {
    week: { dateStart: START_DAY_OF_WEEK, dateEnd: END_DAY_OF_WEEK },
    month: { dateStart: START_DAY_OF_MONTH, dateEnd: END_DAY_OF_MONTH },
    year: { dateStart: START_DAY_OF_YEAR, dateEnd: END_DAY_OF_YEAR },
  };

  return config[period];
}

export function getMuscleOptions(exercises: ExerciseData[] = []): Option[] {
  const muscleGroups = [...new Set(exercises.map((d) => d.muscleGroup))];
  return muscleGroups.map((muscleGroup) => ({
    id: muscleGroup,
    name: MuscleGroupName[muscleGroup],
  }));
}
