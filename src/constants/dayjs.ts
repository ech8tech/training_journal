import { dayjs } from "@configs/dayjs";
import { DATE_FORMAT } from "@constants/format";

export const DAYS_IN_MONTH = dayjs().daysInMonth();
export const DAYS_IN_YEAR = dayjs().isLeapYear() ? 366 : 365;

export const START_DAY_OF_WEEK = dayjs().startOf("isoWeek").format(DATE_FORMAT);
export const END_DAY_OF_WEEK = dayjs().endOf("isoWeek").format(DATE_FORMAT);

export const START_DAY_OF_MONTH = dayjs().startOf("month").format(DATE_FORMAT);
export const END_DAY_OF_MONTH = dayjs().endOf("month").format(DATE_FORMAT);

export const START_DAY_OF_YEAR = dayjs().startOf("year").format(DATE_FORMAT);
export const END_DAY_OF_YEAR = dayjs().endOf("year").format(DATE_FORMAT);
