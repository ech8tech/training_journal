import dayjs from "dayjs";

import {
  END_DAY_OF_MONTH,
  END_DAY_OF_WEEK,
  END_DAY_OF_YEAR,
  START_DAY_OF_MONTH,
  START_DAY_OF_WEEK,
  START_DAY_OF_YEAR,
} from "@constants/dayjs";
import { DATE_FORMAT } from "@constants/format";
import { ProgressData } from "@pages/progress/types";
import { Period } from "@pages/statistics/types";

/**
 * Возвращает случайное целое между min и max включительно
 */
function randInt(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

/**
 * Генерирует массив сессий:
 * @param startDate — строка вида "YYYY-MM-DD"
 * @param daysCount — сколько дней (сессий) создать подряд
 * @param minSets — минимальное число подходов в сессии (по умолчанию 3)
 * @param maxSets — максимальное число подходов в сессии (по умолчанию 5)
 */
export function generateRandomSessions(
  startDate: string,
  daysCount: number,
  minSets = 3,
  maxSets = 5,
) {
  const sessions: ProgressData["sessions"] = [];

  for (let i = 0; i < daysCount; i++) {
    const date = dayjs(startDate).add(i, "day").format(DATE_FORMAT);

    const setsCount = randInt(minSets, maxSets);
    const sets = Array.from({ length: setsCount }, (_, idx) => ({
      order: idx + 1,
      // вес от 10 до 60 кг (с одним десятичным)
      weight: parseFloat((Math.random() * 20 + 10).toFixed(1)),
      // повторения от 5 до 15
      reps: randInt(10, 15),
    }));

    sessions.push({ date, sets });
  }

  return sessions;
}

export function getDateConfig(period: Period) {
  const config = {
    week: { startDate: START_DAY_OF_WEEK, endDate: END_DAY_OF_WEEK },
    month: { startDate: START_DAY_OF_MONTH, endDate: END_DAY_OF_MONTH },
    year: { startDate: START_DAY_OF_YEAR, endDate: END_DAY_OF_YEAR },
  };

  return config[period];
}
