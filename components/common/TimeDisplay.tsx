import { getRelativeTime } from "@/lib/dayjs";
import { cn } from "@/lib/utils";
import React from "react";

type TimeDisplayProps = {
  time: number | undefined; // Unix timestamp in seconds
  className?: string;
};

const TimeDisplay: React.FC<TimeDisplayProps> = ({ time, className = "" }) => {
  return (
    <>
      {time ? (
        <p className={cn("text-sm text-muted-foreground", className)}>
          {getRelativeTime(time)} ago
        </p>
      ) : null}
    </>
  );
};

export default TimeDisplay;
