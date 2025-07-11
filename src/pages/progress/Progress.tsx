import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";

import { LineChart } from "@components/charts/lineChart";
import { LineChartData } from "@components/charts/lineChart/types";
import { Filter } from "@components/filter";
import { PageLayout } from "@components/pageLayout";
import { Spacing } from "@components/spacing";
import { dayjs } from "@configs/dayjs";
import { MuscleGroup, MuscleType } from "@constants/muscles";
import { Period } from "@pages/statistics/types";

import { ProgressData, ProgressFormProps } from "./types";
import { generateRandomSessions, getDateConfig } from "./utils";

export default function Progress() {
  const { exerciseId } = useParams();
  const [data, setData] = useState<ProgressData>();
  const navigate = useNavigate();

  const { register, watch, resetField, setValue } = useForm<ProgressFormProps>({
    defaultValues: {
      period: "week",
    },
  });

  const { period, calendar } = watch();

  const mock = {
    id: "1",
    exerciseName: "Поднятие штанги стоя",
    muscleType: MuscleType.BICEPS,
    muscleGroupType: MuscleGroup.HANDS,
    sessions: generateRandomSessions("2025-04-15", 250),
  };

  const lineChartData =
    data?.sessions.reduce((acc: LineChartData[], curr) => {
      return [
        ...acc,
        {
          date: curr.date,
          commonRate: curr.sets.reduce(
            (sum, curr) => sum + curr.weight * curr.reps,
            0,
          ),
        },
      ];
    }, []) || [];

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
    const filtered = [...mock.sessions].filter(({ date }) => {
      return (
        dayjs(date).isSameOrAfter(startDate) &&
        dayjs(date).isSameOrBefore(endDate)
      );
    });

    setData({ ...mock, sessions: filtered });
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
  }, [period, calendar?.dateStart, calendar?.dateEnd]);

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
        data={lineChartData}
        muscleGroupType={mock.muscleGroupType}
        exerciseName={mock.exerciseName}
      />
    </PageLayout>
  );
}
