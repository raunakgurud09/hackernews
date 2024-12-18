import { getRelativeTime } from "@/lib/dayjs";
import React from "react";

type TimeDisplayProps = {
  time: number; // Unix timestamp in seconds
};

const TimeDisplay: React.FC<TimeDisplayProps> = ({ time }) => {
  return (
    <p className="text-sm text-muted-foreground">{getRelativeTime(time)} Ago</p>
  );
};

export default TimeDisplay;
