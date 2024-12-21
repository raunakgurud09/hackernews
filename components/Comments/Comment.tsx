import { TComment } from "@/types/comment";
import React from "react";
import { ProfileView } from "../common/ProfileView";
import { CapitalizeFirstLetter } from "@/utils/string";
import { Separator } from "../common/Separator";
import TimeDisplay from "../common/TimeDisplay";
import { RenderText } from "../common/RenderText";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export const Comment = ({ id, by, time, text, kids }: TComment) => {
  return (
    <div className="p-2 flex gap-2 w-full">
      <div>
        <ProfileView by={by} size={28} />
      </div>
      <div className="w-full">
        <div className="flex items-center font-medium gap-1 mb-1">
          <p className="text-sm font-medium">{CapitalizeFirstLetter(by)}</p>
          <Separator />
          <TimeDisplay className="text-xxs font-normal" time={time} />
        </div>

        <RenderText
          className="text-xs break-all overflow-hidden whitespace-normal text-muted-foreground"
          text={text ?? "No content"}
        />

        {kids && kids.length > 0 && (
          <Link
            href={`/comment?id=${id}`}
            className="text-xxs mt-2 cursor-pointer flex items-center gap-[2px] hover:gap-[6px] transition-all hover:underline"
          >
            <span>View all {kids.length} comments</span>
            <ArrowRight width={10} height={10} />
          </Link>
        )}
      </div>
    </div>
  );
};
