import { Option } from "@components/select";
import { MuscleGroup, Muscles, MuscleType } from "@constants/muscles";

export function getMuscleOptions(muscleGroupType: MuscleGroup): Option[] {
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
