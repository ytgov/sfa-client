import moment from "moment";

export default function momentDateFormat(date: Date | undefined, format: string): string {
  if (date) return moment.utc(date).format(format);
  return "";
}
