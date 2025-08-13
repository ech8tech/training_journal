import { useEffect } from "react";
import { useForm } from "react-hook-form";

import { PieChart } from "@components/charts/pieChart/PieChart";
import { Filter } from "@components/filter";
import { PageLayout } from "@components/pageLayout";
import { Schedule } from "@components/schedule";
import { Select } from "@components/select";
import { Spacing } from "@components/spacing";
import { Spinner } from "@components/spinner/Spinner";
import { Title } from "@components/title";
import { dayjs } from "@configs/dayjs";
import { MuscleGroup } from "@constants/muscles";
import { SPACE_CONTAINER } from "@constants/spacing";

import { MainInfo } from "./components/MainInfo";
import { useGetExercises, useGetPieChart } from "./hooks";
import { Period, StatisticsFormProps } from "./types";
import { getDateConfig, getMuscleOptions } from "./utils";

export default function Statistics() {
  const { register, control, watch, setValue } = useForm<StatisticsFormProps>({
    defaultValues: {
      period: "month",
      calendar: getDateConfig("month"),
      muscleGroup: MuscleGroup.SHOULDERS,
    },
  });

  const { muscleGroup, period, calendar } = watch();

  const { data: exercises, isLoading: isLoadingExercises } = useGetExercises();
  // const { data: scatterplotData, getScatterplot } = useGetScatterplot({
  //   ...calendar,
  //   muscleGroup,
  // });

  const { data: pieChartData, getPieChart } = useGetPieChart({
    ...calendar,
    muscleGroup,
  });

  const handleSetPeriod = (period: Period) => {
    setValue("period", period);
    setValue("calendar", getDateConfig(period));
  };

  const handleResetCalendar = () => {
    setValue("period", "month");
    setValue("calendar", getDateConfig("month"));
  };

  useEffect(() => {
    // getScatterplot();
    getPieChart();
  }, [muscleGroup, calendar?.dateStart, calendar?.dateEnd]);

  if (isLoadingExercises) {
    return (
      <PageLayout>
        <Spinner isFullPage />
      </PageLayout>
    );
  }

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
            name={register("muscleGroup").name}
            control={control}
            options={getMuscleOptions(exercises)}
            onChange={(option) =>
              setValue("muscleGroup", option?.id as MuscleGroup)
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
        <PieChart data={pieChartData} />
        {/*<Scatterplot data={scatterplotData} />*/}
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
        <Schedule
          calendarStart={calendar?.dateStart}
          calendarEnd={calendar?.dateEnd}
          period={period}
        />
      </Spacing>
    </PageLayout>
  );
}
