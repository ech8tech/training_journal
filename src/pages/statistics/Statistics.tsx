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
import { MuscleGroup } from "@constants/muscles";
import { SPACE_CONTAINER } from "@constants/spacing";

import { MainInfo } from "./components/MainInfo";
import { useGetMuscleGroups, useGetPieChart } from "./hooks";
import { Period, StatisticsFormProps } from "./types";
import { getDateConfig, getMuscleOptions } from "./utils";

export default function Statistics() {
  const { register, control, watch, setValue } = useForm<StatisticsFormProps>({
    defaultValues: {
      period: "month",
      calendar: getDateConfig("month"),
    },
  });

  const { muscleGroup, period, calendar } = watch();

  const { data: muscleGroups, isLoading: isLoadingMuscleGroups } =
    useGetMuscleGroups();

  const { data: pieChartData, getPieChart } = useGetPieChart({
    ...calendar,
    muscleGroup,
  });

  const handleSetPeriod = (period: Period) => {
    setValue("period", period);
    setValue("calendar", getDateConfig(period));
  };

  useEffect(() => {
    // getScatterplot();
    if (muscleGroup && calendar) {
      getPieChart();
    }
  }, [muscleGroup, calendar?.dateStart, calendar?.dateEnd]);

  useEffect(() => {
    if (muscleGroups?.length) {
      setValue("muscleGroup", muscleGroups[0]);
    }
  }, [muscleGroups]);

  if (isLoadingMuscleGroups) {
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
            options={getMuscleOptions(muscleGroups)}
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
            activeChipsId={period}
          />
        </Spacing>
        <PieChart data={pieChartData} />
        {/*<Scatterplot data={scatterplotData} />*/}
      </Spacing>
      <div>
        <Schedule
          calendarStart={calendar?.dateStart}
          calendarEnd={calendar?.dateEnd}
          period={period}
        />
      </div>
    </PageLayout>
  );
}
