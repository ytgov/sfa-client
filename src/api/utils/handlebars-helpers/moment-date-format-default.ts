import moment from "moment";

export default function momentDateFormatDefault(date: Date | undefined, format: string, defaultVal: string): string {
    if (date) return moment.utc(date).format(format);
    return defaultVal;
  }
  