import { cn } from "@/lib/utils";
import clsx from "clsx";
import { ChevronsUp } from "lucide-react";
import React from "react";

type ToggleShowCommentsProps = {
  descendants: number;
  kids: number[];
  toggleCommentsVisibility: () => void;
  commentsVisible: boolean;
};

export const ToggleShowComments = ({
  descendants,
  kids,
  toggleCommentsVisibility,
  commentsVisible,
}: ToggleShowCommentsProps) => {
  return (
    <div className="flex gap-2">
      {(descendants > 0 || kids.length > 0) && (
        <div
          onClick={toggleCommentsVisibility}
          className={clsx(
            "ml-2 text-xxs cursor-pointer hover:underline flex items-center gap-[2px] transition-all",
            {
              "text-disabled": descendants <= 0,
            }
          )}
        >
          <span className="">
            {commentsVisible ? "Hide Comments" : "Show Comments"}
          </span>
          <ChevronsUp
            width={12}
            height={12}
            className={cn("transition-all", {
              "rotate-0": commentsVisible,
              "rotate-180": !commentsVisible,
            })}
          />
        </div>
      )}
    </div>
  );
};
