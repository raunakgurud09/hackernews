import React from "react";
import { ProfileView } from "../common/ProfileView";
import { CapitalizeFirstLetter } from "@/utils/string";
import { Separator } from "../common/Separator";
import TimeDisplay from "../common/TimeDisplay";

type PostcardHeaderProps = {
  by?: string | undefined;
  id?: string | undefined;
  type?: string | undefined;
  time?: number | undefined;
};

export const PostcardHeader = ({ by, id, type, time }: PostcardHeaderProps) => {
  return (
    <div className="flex gap-8">
      <div className="flex gap-2 font-lg items-center ">
        <ProfileView by={by} />
        <div>
          <div className="flex gap-2 items-center justify-center">
            <p className="font-medium text-sm">{CapitalizeFirstLetter(by)}</p>
            <Separator />
            <TimeDisplay time={time} className="text-xs" />
          </div>
          <div className="flex gap-2 items-center">
            <p className="text-xxs text-muted-foreground">#{type}</p>
            <p className="hover:underline text-xxs text-muted-foreground text-xss cursor-pointer animate-in transition-all">
              #{id}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
