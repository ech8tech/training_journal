import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

import { LineChart } from "@components/charts/lineChart";
import { ErrorPage } from "@components/errorPage";
import { Filter } from "@components/filter";
import { PageLayout } from "@components/pageLayout";
import { Spacing } from "@components/spacing";
import { Period } from "@pages/statistics";

import { useGetLineChart } from "./hooks";
import { ProgressFormProps } from "./types";
import { getDateConfig } from "./utils";

export default function Progress() {
  const navigate = useNavigate();

  const { register, watch, resetField, setValue } = useForm<ProgressFormProps>({
    defaultValues: {
      period: "month",
      calendar: getDateConfig("month"),
    },
  });

  const { period, calendar } = watch();

  const {
    data: exerciseGraphData,
    error: exerciseGraphDataError,
    getLineChartData,
  } = useGetLineChart({ ...calendar });

  const handleSetPeriod = (period: Period) => {
    setValue("period", period);
    setValue("calendar", getDateConfig(period));
  };

  const handleBack = () => {
    navigate(-1);
  };

  useEffect(() => {
    getLineChartData();
  }, [calendar?.dateStart, calendar?.dateEnd]);

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
            value: calendar.dateStart,
            onChange: (e) => {
              setValue("period", undefined);
              setValue("calendar.dateStart", e.target.value);
            },
          }}
          configDateEnd={{
            ...register("calendar.dateEnd"),
            value: calendar.dateEnd,
            onChange: (e) => {
              resetField("period");
              setValue("calendar.dateEnd", e.target.value);
            },
          }}
          onClickChips={(id) => handleSetPeriod(id as Period)}
          activeChipsId={period}
        />
      </Spacing>
      <LineChart
        data={exerciseGraphData?.lineChartData}
        muscleGroup={exerciseGraphData?.muscleGroup}
        exerciseName={exerciseGraphData?.exerciseName}
      />
    </PageLayout>
  );
}
