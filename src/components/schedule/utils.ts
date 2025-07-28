import { DAYS_IN_MONTH, DAYS_IN_YEAR } from "@constants/dayjs";

export function getLengthStatistics(diff: number) {
  if (diff <= 7) {
    return 7;
  }

  if (diff <= DAYS_IN_MONTH) {
    return DAYS_IN_MONTH;
  }

  if (diff > DAYS_IN_MONTH) {
    return DAYS_IN_YEAR;
  }

  return 0;
}
