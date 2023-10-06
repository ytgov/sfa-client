import { isUndefined } from "lodash";
import moment from "moment";

export function weeksBetween(start, end) {
  if (isUndefined(start) || isUndefined(end)) return 0;

  return Math.ceil(
    moment
      .utc(end)
      .endOf("week")
      .diff(moment.utc(start).startOf("week"), "week", true)
  );
}

export function monthsBetween(start, end) {
  if (isUndefined(start) || isUndefined(end)) return 0;

  return Math.ceil(
    moment
      .utc(end)
      .endOf("month")
      .diff(moment.utc(start).startOf("month"), "month", true)
  );
}
