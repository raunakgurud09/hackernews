import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";

dayjs.extend(relativeTime);

export const getRelativeTime = (
  unixTime: number,
  withoutSuffix: boolean = true
): string => {
  return dayjs.unix(unixTime).fromNow(withoutSuffix);
};

export const getJoinedAt = (unixTime: number): string => {
  return dayjs.unix(unixTime).format("MMMM YYYY");
};
