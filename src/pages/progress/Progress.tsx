import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

import { LineChart } from "@components/charts/lineChart";
import { LineChartData } from "@components/charts/lineChart/types";
import { ErrorPage } from "@components/errorPage";
import { Filter } from "@components/filter";
import { PageLayout } from "@components/pageLayout";
import { Spacing } from "@components/spacing";
import { dayjs } from "@configs/dayjs";
import { Period } from "@pages/statistics/types";

import { useGetExerciseGraphData } from "./hooks";
import { ProgressFormProps } from "./types";
import { getDateConfig } from "./utils";

export default function Progress() {
  const [data, setData] = useState<LineChartData[]>([]);
  const navigate = useNavigate();

  const { data: exerciseGraphData, error: exerciseGraphDataError } =
    useGetExerciseGraphData();

  const { register, watch, resetField, setValue } = useForm<ProgressFormProps>({
    defaultValues: {
      period: "week",
    },
  });

  const { period, calendar } = watch();

  const handleSetPeriod = (period: Period) => {
    setValue("period", period);
    resetField("calendar");
  };

  const handleResetCalendar = () => {
    setValue("period", "week");
    resetField("calendar");
  };

  const handleBack = () => {
    navigate(-1);
  };

  const filterData = (startDate: string, endDate: string) => {
    const filtered =
      exerciseGraphData?.graphData?.filter(({ date }) => {
        return (
          dayjs(date).isSameOrAfter(startDate) &&
          dayjs(date).isSameOrBefore(endDate)
        );
      }) || [];

    setData(filtered);
  };

  useEffect(() => {
    if (calendar?.dateStart && calendar?.dateEnd) {
      filterData(calendar.dateStart, calendar.dateEnd);
      setValue("period", undefined);
      return;
    }

    if (period) {
      // если календарь не активирован, включаем по умолчанию период
      const { startDate, endDate } = getDateConfig(period);
      filterData(startDate, endDate);
    }
  }, [
    period,
    calendar?.dateStart,
    calendar?.dateEnd,
    exerciseGraphData?.graphData,
  ]);

  if (!data || !exerciseGraphData) {
    return <PageLayout>Нет данных</PageLayout>;
  }

  if (exerciseGraphDataError) {
    return (
      <PageLayout>
        <ErrorPage error={exerciseGraphDataError} />
      </PageLayout>
    );
  }

  return (
    <PageLayout title="График прогресса" onBack={handleBack}>
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
      <LineChart
        data={data}
        muscleGroup={exerciseGraphData.muscleGroup}
        exerciseName={exerciseGraphData.exerciseName}
      />
    </PageLayout>
  );
}
