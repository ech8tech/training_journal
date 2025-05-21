import cn from "classnames";
import dayjs from "dayjs";

import { DATE_FORMAT } from "@constants/format";

import * as styles from "./Schedule.scss";
import { ScheduleProps } from "./types";

export function Schedule({ startDate, dates }: ScheduleProps) {
  const today = startDate ? dayjs(startDate) : dayjs();
  const daysInMonth = today.daysInMonth();
  const startOfMonth = today.startOf("month");

  const days = Array.from({ length: daysInMonth }, (_, i) => ({
    date: startOfMonth.add(i, "day").format("D"),
    isPassed: dates.includes(startOfMonth.add(i, "day").format(DATE_FORMAT)),
    isCurrent: today.format("D") === startOfMonth.add(i, "day").format("D"),
    isFuture: dayjs().isBefore(startOfMonth.add(i, "day"), "day"),
  }));

  return (
    <div className={styles.calendar}>
      {days.map((day) => (
        <div
          key={day.date}
          className={cn(styles.day, {
            [styles.day__passed]: day.isPassed,
            [styles.day__current]: day.isCurrent,
            [styles.day__future]: day.isFuture,
          })}
        >
          {day.date}
        </div>
      ))}
    </div>
  );
}
