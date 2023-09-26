import moment from "moment";

export default function momentDateFormat(date: Date | undefined, format: string, isUTC = true): string {
  if (date && isUTC) return moment.utc(date).format(format);
  if (date) return moment(date).format(format);
  return "";
}
