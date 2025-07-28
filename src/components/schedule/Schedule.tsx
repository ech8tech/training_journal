import cn from "classnames";
import dayjs from "dayjs";
import { useEffect } from "react";

import { Spacing } from "@components/spacing";
import { Spinner } from "@components/spinner/Spinner";
import { Text } from "@components/text";
import { Title } from "@components/title";
import { DAYS_IN_YEAR } from "@constants/dayjs";
import { DATE_FORMAT } from "@constants/format";

import { useGetSchedule } from "./hooks";
import * as styles from "./Schedule.scss";
import { ScheduleProps } from "./types";

export function Schedule({
  calendarStart,
  calendarEnd,
  period,
}: ScheduleProps) {
  const { data, isLoading, error, getStatistics } = useGetSchedule(
    calendarStart,
    calendarEnd,
    period,
  );

  useEffect(() => {
    if (calendarStart || calendarEnd || period) {
      getStatistics();
    }
  }, [calendarStart, calendarEnd, period]);

  if (!data?.dates?.length) return null;

  if (isLoading) {
    return <Spinner />;
  }

  if (error) {
    return <Title size="h5">Ошибка загрузки статистики</Title>;
  }

  const dates = data.dates;

  // if (dates?.length <= 1) return null;

  const dateStart = dayjs(calendarStart);
  const daysInMonth = dateStart.daysInMonth();
  const startOfMonth = dateStart.startOf("month");

  const diff =
    dates?.length <= 1
      ? 0
      : dayjs(dates[dates.length - 1]).diff(dayjs(dates[0]), "day");

  const length = diff > daysInMonth ? DAYS_IN_YEAR : daysInMonth;
  // const length = getLengthStatistics(diff);

  const days = Array.from({ length }, (_, i) => ({
    day: startOfMonth.add(i, "day").format("D"),
    date: startOfMonth.add(i, "day").format(DATE_FORMAT),
    isPassed: dates.includes(startOfMonth.add(i, "day").format(DATE_FORMAT)),
    isCurrent:
      dayjs().format(DATE_FORMAT) ===
      startOfMonth.add(i, "day").format(DATE_FORMAT),
    isFuture: dayjs().isBefore(startOfMonth.add(i, "day"), "day"),
  }));

  if (days.length > daysInMonth) {
    return (
      <>
        <Spacing space={16} className={styles.heatmap}>
          {days.map((day, idx) => (
            <div
              key={idx}
              className={cn(styles.day, {
                [styles.day__passed]: day.isPassed,
                [styles.day__current]: day.isCurrent,
                [styles.day__future]: day.isFuture,
                [styles.day__half]: day.isPassed && day.isCurrent,
              })}
            >
              <Text size="sm">{day.day}</Text>
            </div>
          ))}
        </Spacing>
        {/*<Legend />*/}
      </>
    );
  }

  return (
    <>
      <Spacing space={16} className={styles.calendar}>
        {days.map((day) => (
          <div
            key={day.date}
            className={cn(styles.day, {
              [styles.day__passed]: day.isPassed,
              [styles.day__current]: day.isCurrent,
              [styles.day__future]: day.isFuture,
              [styles.day__half]: day.isPassed && day.isCurrent,
            })}
          >
            {day.day}
          </div>
        ))}
      </Spacing>
      {/*<Legend />*/}
    </>
  );
}
