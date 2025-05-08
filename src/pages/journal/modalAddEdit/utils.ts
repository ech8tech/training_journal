import { Option } from "@components/select";
import { MuscleGroupType, Muscles, MuscleType } from "@pages/journal/consts";

export function getMuscleOptions(muscleGroupType: MuscleGroupType): Option[] {
  const options = [];

  const muscleTypes = Object.keys(Muscles) as MuscleType[];

  for (const muscleType of muscleTypes) {
    const { group, name, icon } = Muscles[muscleType];

    if (group === muscleGroupType) {
      options.push({ id: muscleType, name, icon });
    }
  }

  return options;
}
