import cn from "classnames";
import dayjs from "dayjs";
import { useEffect, useState } from "react";

import { Popup } from "@components/popup";
import { Spacing } from "@components/spacing";
import { Spinner } from "@components/spinner/Spinner";
import { Text } from "@components/text";
import { Title } from "@components/title";
import { DATE_FORMAT } from "@constants/format";
import { MuscleGroupColor, MuscleGroupName } from "@constants/muscles";

import { useGetSchedule } from "./hooks";
import * as styles from "./Schedule.scss";
import { ScheduleProps } from "./types";

export function Schedule({ calendarStart, calendarEnd }: ScheduleProps) {
  const { data, isLoading, error, getStatistics } = useGetSchedule(
    calendarStart,
    calendarEnd,
  );

  const [openId, setOpen] = useState<string | null>(null);

  useEffect(() => {
    if (calendarStart || calendarEnd) {
      getStatistics();
    }
  }, [calendarStart, calendarEnd]);

  if (isLoading) {
    return <Spinner />;
  }

  if (error) {
    return <Title size="h5">Ошибка загрузки статистики</Title>;
  }

  const dates = Object.keys(data);

  const dateStart = dayjs(calendarStart);
  const dateEnd = dayjs(calendarEnd);
  const daysInMonth = dateStart.daysInMonth();

  const startOfMonth = dateStart.startOf("month");
  const endOfMonth = dateEnd.endOf("month");

  const monthStart = dateStart.startOf("month").format("MMMM");
  const monthEnd = dateEnd.startOf("month").format("MMMM");

  const title =
    monthStart === monthEnd ? monthStart : `${monthStart} - ${monthEnd}`;

  const diffDays = endOfMonth.diff(startOfMonth, "day") + 1;

  const length = diffDays > daysInMonth ? diffDays : daysInMonth;

  const days = Array.from({ length }, (_, i) => ({
    data: data[startOfMonth.add(i, "day").format(DATE_FORMAT)],
    day: startOfMonth.add(i, "day").format("D"),
    date: startOfMonth.add(i, "day").format(DATE_FORMAT),
    isPassed: dates.includes(startOfMonth.add(i, "day").format(DATE_FORMAT)),
    isCurrent:
      dayjs().format(DATE_FORMAT) ===
      startOfMonth.add(i, "day").format(DATE_FORMAT),
    isFuture: dayjs().isBefore(startOfMonth.add(i, "day"), "day"),
  }));

  const TitleComponent = (
    <Spacing space={16}>
      <Title size="h3">График занятий за {title}</Title>
    </Spacing>
  );

  if (days.length > daysInMonth) {
    return (
      <>
        {TitleComponent}
        <div className={styles.heatmap}>
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
        </div>
      </>
    );
  }

  return (
    <>
      {TitleComponent}
      <div className={styles.calendar}>
        {days.map((day) => {
          const hasDate = !!day.data?.length;

          return (
            <Popup
              key={day.date}
              id={day.date}
              isOpen={day.date === openId}
              onOpen={setOpen}
              content={
                <div>
                  <Text className={styles.popupLabel}>Выполнено:</Text>
                  {day.data?.map((item) => {
                    const [muscleGroup, count] = item;
                    return (
                      <Text
                        className={styles.muscleGroup}
                        size="sm"
                        key={muscleGroup}
                      >
                        <div
                          className={styles.badge}
                          style={{
                            backgroundColor: MuscleGroupColor[muscleGroup],
                          }}
                        />
                        {MuscleGroupName[muscleGroup]} - ({count})
                      </Text>
                    );
                  })}
                </div>
              }
            >
              <div
                onClick={hasDate ? () => setOpen(day.date) : undefined}
                className={cn(styles.day, {
                  [styles.day__passed]: day.isPassed,
                  [styles.day__current]: day.isCurrent,
                  [styles.day__future]: day.isFuture,
                  [styles.day__half]: day.isPassed && day.isCurrent,
                })}
              >
                {day.day}
                <div className={styles.badges}>
                  {day.data?.map((item) => {
                    const [muscleGroup] = item;
                    return (
                      <div
                        key={muscleGroup}
                        className={styles.badge}
                        style={{
                          backgroundColor: MuscleGroupColor[muscleGroup],
                        }}
                      />
                    );
                  })}
                </div>
              </div>
            </Popup>
          );
        })}
      </div>
      {/*<Legend />*/}
    </>
  );
}
