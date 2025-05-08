import dayjs from "dayjs";
import isoWeek from "dayjs/plugin/isoWeek";

dayjs.extend(isoWeek);

type Day = { date: string; weekday: string; isCurrent: boolean };

export function getWeekDays(): Day[] {
  const today = dayjs();
  const weekStart = today.startOf("isoWeek");

  const getDate = (i: number) => weekStart.add(i, "day").format("DD");
  const getWeekday = (i: number) => weekStart.add(i, "day").format("dd");

  return Array.from({ length: 7 }, (_, i) => ({
    date: getDate(i),
    weekday: getWeekday(i),
    isCurrent: getDate(i) === today.format("DD"),
  }));
}
