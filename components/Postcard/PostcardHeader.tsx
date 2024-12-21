import React from "react";
import { ProfileView } from "../common/ProfileView";
import { Separator } from "../common/Separator";
import TimeDisplay from "../common/TimeDisplay";
import Link from "next/link";

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
            <p className="font-medium text-sm">{by}</p>
            <Separator />
            <TimeDisplay time={time} className="text-xs" />
          </div>
          <div className="flex gap-2 items-center">
            <p className="text-xxs text-muted-foreground">#{type}</p>
            <Link
              href={`/comment?id=${id}`}
              className="hover:underline text-xxs text-muted-foreground text-xss cursor-pointer animate-in transition-all"
            >
              #{id}
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
