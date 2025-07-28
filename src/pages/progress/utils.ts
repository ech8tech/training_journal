import {
  END_DAY_OF_MONTH,
  END_DAY_OF_WEEK,
  END_DAY_OF_YEAR,
  START_DAY_OF_MONTH,
  START_DAY_OF_WEEK,
  START_DAY_OF_YEAR,
} from "@constants/dayjs";
import { Period } from "@pages/statistics";

/**
 * Возвращает случайное целое между min и max включительно
 */
// function randInt(min: number, max: number): number {
//   return Math.floor(Math.random() * (max - min + 1)) + min;
// }

// export function generateRandomSessions(
//   dateStart: string,
//   daysCount: number,
//   minSets = 3,
//   maxSets = 5,
// ) {
//   const sessions: ProgressData["sessions"] = [];
//
//   for (let i = 0; i < daysCount; i++) {
//     const date = dayjs(dateStart).add(i, "day").format(DATE_FORMAT);
//
//     const setsCount = randInt(minSets, maxSets);
//     const sets = Array.from({ length: setsCount }, (_, idx) => ({
//       order: idx + 1,
//       // вес от 10 до 60 кг (с одним десятичным)
//       weight: parseFloat((Math.random() * 20 + 10).toFixed(1)),
//       // повторения от 5 до 15
//       reps: randInt(10, 15),
//     }));
//
//     sessions.push({ date, sets });
//   }
//
//   return sessions;
// }

export function getDateConfig(period: Period) {
  const config = {
    week: { dateStart: START_DAY_OF_WEEK, dateEnd: END_DAY_OF_WEEK },
    month: { dateStart: START_DAY_OF_MONTH, dateEnd: END_DAY_OF_MONTH },
    year: { dateStart: START_DAY_OF_YEAR, dateEnd: END_DAY_OF_YEAR },
  };

  return config[period];
}
