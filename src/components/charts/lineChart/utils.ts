import { DAYS_IN_MONTH } from "@constants/dayjs";

export function getCircleSize(dataLength: number) {
  if (dataLength > DAYS_IN_MONTH) {
    return 5;
  }

  if (dataLength > 7) {
    return 10;
  }

  return 15;
}
