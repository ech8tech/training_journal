import cn from "classnames";
import dayjs from "dayjs";

import * as styles from "./CalendarStatistics.scss";

export function CalendarStatistics() {
  const today = dayjs();
  const daysInMonth = today.daysInMonth();
  const startOfMonth = today.startOf("month");

  const days = Array.from({ length: daysInMonth }, (_, i) => ({
    date: startOfMonth.add(i, "day").format("D"),
    isCurrent: today.format("D") === startOfMonth.add(i, "day").format("D"),
    isFuture: dayjs().isBefore(startOfMonth.add(i, "day"), "day"),
  }));

  return (
    <div className={styles.calendar}>
      {days.map((day) => (
        <div
          key={day.date}
          className={cn(styles.day, {
            [styles.day__future]: day.isFuture,
          })}
        >
          {day.date}
        </div>
      ))}
    </div>
  );
}
