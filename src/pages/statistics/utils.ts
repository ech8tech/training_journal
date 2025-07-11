import dayjs from "dayjs";

import { LineChartData } from "@components/charts/scatterplot/types";
import { Option } from "@components/select";
import {
  END_DAY_OF_MONTH,
  END_DAY_OF_WEEK,
  END_DAY_OF_YEAR,
  START_DAY_OF_MONTH,
  START_DAY_OF_WEEK,
  START_DAY_OF_YEAR,
} from "@constants/dayjs";
import { MuscleGroup, MuscleGroupName } from "@constants/muscles";

import { Period } from "./types";

export type Datum = {
  date: string;
  muscleGroupType: MuscleGroup;
  exerciseName: string;
  sets: Array<{
    order: number;
    weight: number;
    reps: number;
  }>;
};

export function getDateConfig(period: Period) {
  const config = {
    week: { startDate: START_DAY_OF_WEEK, endDate: END_DAY_OF_WEEK },
    month: { startDate: START_DAY_OF_MONTH, endDate: END_DAY_OF_MONTH },
    year: { startDate: START_DAY_OF_YEAR, endDate: END_DAY_OF_YEAR },
  };

  return config[period];
}

export function getMuscleOptions(data: LineChartData[]): Option[] {
  const muscleGroupTypes = [...new Set(data.map((d) => d.muscleGroupType))];
  return muscleGroupTypes.map((muscleGroupType) => ({
    id: muscleGroupType,
    name: MuscleGroupName[muscleGroupType],
  }));
}

const mockExercise: Record<MuscleGroup, string[]> = {
  [MuscleGroup.BREAST]: [
    "Жим штангой",
    "Жим со штангой в наклоне",
    "Сведение гантелей лежа",
  ],
  [MuscleGroup.HANDS]: ["Гантель над головой", "Французский жим"],
  [MuscleGroup.LEGS]: [
    "Выпады на месте",
    "Приседания со штангой",
    "Сумо-приседания",
  ],
  [MuscleGroup.PRESS]: ["Скручивание на скамье"],
  [MuscleGroup.BACK]: [
    "Подтягивания широким хватом",
    "Подтягивания средним хватом",
    "Подтягивания узким хватом",
  ],
  [MuscleGroup.SHOULDERS]: [
    "Поднятие гантелей сидя",
    "Подъемы в сторону",
    "Тяга штанги к подбородку",
  ],

  // добавьте остальные группы по аналогии
};

function randInt(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

export function mockData(
  startDate: string, // формат "YYYY-MM-DD"
  daysCount: number,
): Datum[] {
  const result: Datum[] = [];
  const groups = Object.values(MuscleGroup);

  for (let dayOffset = 0; dayOffset < daysCount; dayOffset++) {
    const date = dayjs(startDate).add(dayOffset, "day").format("YYYY-MM-DD");

    // Для каждого дня можно рандомно выбрать, сколько упражнений делать (например 2–4)
    const exercisesToday = groups
      .sort(() => Math.random() - 0.5) // перемешали
      .slice(0, randInt(2, 4)); // взяли 2–4 группы

    exercisesToday.forEach((group) => {
      // из этой группы упражнений выбираем 1–2 случайных
      const names = mockExercise[group] || [];
      names
        .sort(() => Math.random() - 0.5)
        .slice(0, randInt(1, Math.min(2, names.length)))
        .forEach((exerciseName) => {
          // генерируем 3–5 подходов
          const setsCount = randInt(3, 5);
          const sets = Array.from({ length: setsCount }, (_, i) => ({
            order: i + 1,
            weight: parseFloat((randInt(10, 100) + Math.random()).toFixed(1)), // 10.0–60.9 кг
            reps: randInt(5, 15),
          }));

          result.push({
            date,
            muscleGroupType: group,
            exerciseName,
            sets,
          });
        });
    });
  }

  return result;
}
