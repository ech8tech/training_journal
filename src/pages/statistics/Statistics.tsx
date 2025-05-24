import { useEffect, useMemo, useState } from "react";
import { useForm } from "react-hook-form";

import { ChartScatterplot } from "@components/charts/scatterplot";
import { Filter } from "@components/filter";
import { PageLayout } from "@components/pageLayout";
import { Schedule } from "@components/schedule";
import { Select } from "@components/select";
import { Spacing } from "@components/spacing";
import { Title } from "@components/title";
import { dayjs } from "@configs/dayjs";
import { MuscleGroupType } from "@constants/muscles";
import { SPACE_CONTAINER } from "@constants/spacing";

import { MainInfo } from "./components/MainInfo";
import { Period, StatisticsFormProps } from "./types";
import { Datum, getDateConfig, getMuscleOptions, mockData } from "./utils";

export default function Statistics() {
  const response = useMemo(() => {
    return mockData("2025-04-19", 60);
  }, []);

  const { register, control, watch, resetField, setValue } =
    useForm<StatisticsFormProps>({
      defaultValues: {
        period: "week",
      },
    });

  const { muscleGroupType, period, calendar } = watch();

  const [data, setData] = useState<Datum[]>([]);

  const calendarData = () => {
    let monthStart = dayjs().startOf("month");
    let monthEnd = dayjs().endOf("month");

    if (calendar?.dateStart) {
      monthStart = dayjs(calendar.dateStart).startOf("month");
      monthEnd = dayjs(calendar.dateStart).endOf("month");
    }

    const monthDates = response.filter(
      (d) =>
        dayjs(d.date).isSameOrAfter(monthStart) &&
        dayjs(d.date).isSameOrBefore(monthEnd),
    );
    return [...new Set(monthDates.map((d) => d.date))];
  };

  const handleSetPeriod = (period: Period) => {
    setValue("period", period);
    resetField("calendar");
  };

  const handleResetCalendar = () => {
    setValue("period", "week");
    resetField("calendar");
  };

  const filterData = (
    startDate: string,
    endDate: string,
    groupType?: MuscleGroupType,
  ) => {
    const filtered = [...response].filter(({ date, muscleGroupType }) => {
      const dateChecked =
        dayjs(date).isSameOrAfter(startDate) &&
        dayjs(date).isSameOrBefore(endDate);

      if (groupType) {
        return dateChecked && groupType === muscleGroupType;
      }

      return dateChecked;
    });

    setData(filtered);
  };

  useEffect(() => {
    if (calendar?.dateStart && calendar?.dateEnd) {
      filterData(calendar.dateStart, calendar.dateEnd, muscleGroupType);
      setValue("period", undefined);
      return;
    }

    if (period) {
      // если календарь не активирован, включаем по умолчанию период
      const { startDate, endDate } = getDateConfig(period);
      filterData(startDate, endDate, muscleGroupType);
    }
  }, [muscleGroupType, period, calendar?.dateStart, calendar?.dateEnd]);

  return (
    <PageLayout title="Статистика">
      <Spacing space={SPACE_CONTAINER}>
        <MainInfo />
      </Spacing>
      <Spacing space={SPACE_CONTAINER}>
        <Spacing space={16}>
          <Title size="h3">Общий прогресс</Title>
        </Spacing>
        <Spacing space={16}>
          <Select
            name={register("muscleGroupType").name}
            control={control}
            options={getMuscleOptions(response)}
            onChange={(option) =>
              setValue("muscleGroupType", option?.id as MuscleGroupType)
            }
            label="Группа мышц"
            placeholder="Выберите"
          />
        </Spacing>
        <Spacing space={16}>
          <Filter
            configDateStart={{
              ...register("calendar.dateStart"),
              value: calendar?.dateStart || "",
            }}
            configDateEnd={{
              ...register("calendar.dateEnd"),
              value: calendar?.dateEnd || "",
            }}
            onClickChips={(id) => handleSetPeriod(id as Period)}
            onResetCalendar={handleResetCalendar}
            activeChipsId={period}
          />
        </Spacing>
        <ChartScatterplot data={data} hideDays={period === "year"} />
      </Spacing>
      <Spacing space={SPACE_CONTAINER}>
        <Spacing space={16}>
          <Title size="h3">
            График занятий за{" "}
            {calendar?.dateStart
              ? `${dayjs(calendar.dateStart).format("MMMM")}`
              : `${dayjs().format("MMMM")}`}
          </Title>
        </Spacing>
        <Schedule startDate={calendar?.dateStart} dates={calendarData()} />
      </Spacing>
    </PageLayout>
  );
}
