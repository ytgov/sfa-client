import { isUndefined } from "lodash";
import moment from "moment";

export function weeksBetween(start: Date | string | undefined, end: Date | string | undefined): number {
  if (isUndefined(start) || isUndefined(end)) return 0;

  return Math.ceil(moment.utc(end).endOf("week").diff(moment.utc(start).startOf("week"), "week", true));
}

export function monthsBetween(start: Date | string | undefined, end: Date | string | undefined): number {
  if (isUndefined(start) || isUndefined(end)) return 0;

  return Math.ceil(moment.utc(end).endOf("month").diff(moment.utc(start).startOf("month"), "month", true));
}
