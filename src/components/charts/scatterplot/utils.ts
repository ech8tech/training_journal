import { ScatterplotModel } from "@components/charts/scatterplot/types";
import { dayjs } from "@configs/dayjs";
import { DAYS_IN_MONTH } from "@constants/dayjs";
import { DATE_FORMAT } from "@constants/format";
import { MuscleGroupColor } from "@constants/muscles";

function getCircleSize(dataLength: number) {
  if (dataLength > DAYS_IN_MONTH) {
    return 5;
  }

  if (dataLength > 7) {
    return 10;
  }

  return 15;
}

function getCommonRate(sets: ScatterplotModel["sets"]) {
  return sets.reduce((sum, { weight, reps }) => sum + weight * reps, 0);
}

function getDatesUniq(dates: Date[]) {
  return new Set([...dates].map((d) => dayjs(d).format(DATE_FORMAT)));
}

export function getConfig(data: ScatterplotModel[]) {
  const width = 928;
  const height = 840;
  const marginTop = 25;
  const marginRight = 5;
  const marginLeft = 40;

  const LEGEND_ROW_HEIGHT = 40;
  const AXIS_X_TEXT_HEIGHT = 80;
  const LEGEND_OFFSET_TOP = 20;
  const LEGEND_CIRCLE_SIZE = 10;

  const prepareData = data.map((d) => ({
    ...d,
    commonRate: getCommonRate(d.sets),
    color: MuscleGroupColor[d.muscleGroup],
  }));

  const parsed = prepareData.map((d) => {
    const date = dayjs(d.date, DATE_FORMAT).toDate();
    return {
      ...d,
      date,
      logRate: d.commonRate === 0 ? 0 : Math.log10(d.commonRate),
    };
  });

  const muscleGroupTypes = [
    ...new Set(
      parsed.map((d) => d.muscleGroup).sort((a, b) => a.localeCompare(b)),
    ),
  ];
  const logRates = parsed.map((d) => d.logRate);
  const dates = parsed.map((d) => d.date);
  const datesUniq = getDatesUniq(dates);

  const marginBottom =
    muscleGroupTypes.length * LEGEND_ROW_HEIGHT + AXIS_X_TEXT_HEIGHT;

  const CIRCLE_SIZE = getCircleSize(datesUniq.size);

  return {
    width,
    height,
    marginTop,
    marginRight,
    marginLeft,
    marginBottom,
    muscleGroupTypes,
    dates,
    logRates,
    parsed,
    LEGEND_ROW_HEIGHT,
    CIRCLE_SIZE,
    AXIS_X_TEXT_HEIGHT,
    LEGEND_OFFSET_TOP,
    LEGEND_CIRCLE_SIZE,
  };
}
