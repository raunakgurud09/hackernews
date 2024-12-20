import React from "react";

type PostCardProps = {
  id?: string;
  url: string;
  title?: string;
  text?: string;
  by?: string;
  time: number;
  score?: number;
  type?: "story" | "comment" | "job" | "poll" | "pollopt";
  descendants?: number;
  kids?: number[];
  defaultVisible?: boolean;
};

import { RenderText } from "../common/RenderText";
import { PostcardHeader } from "./PostcardHeader";
import { PostCardH2 } from "./PostcardH2";
import { UpvoteSection } from "./UpvoteSection";
import { CommentSection } from "../Comments/CommentSection";

export const PostCard = ({
  by,
  id,
  url,
  title,
  text,
  time,
  score = 0,
  descendants = 0,
  kids,
  type,
  defaultVisible = false,
}: PostCardProps) => {
  return (
    <div className="flex w-full justify-between items-start border-b p-3 md:p-6">
      <div className="flex flex-col gap-2 w-full sm:w-[90%]">
        <PostcardHeader by={by} id={id} type={type} time={time} />
        <article className="ml-11">
          <PostCardH2 title={title} url={url} />
          <RenderText
            className="mt-2 text-sm break-all overflow-hidden whitespace-normal text-muted-foreground"
            text={text}
            limit={500}
          />
        </article>

        {/* Since job type doesn't have any comments related */}
        {type !== "job" && (
          <CommentSection
            descendants={descendants}
            score={score}
            kids={kids}
            defaultVisible={defaultVisible}
          />
        )}
      </div>

      {/* Upvote section */}
      {type !== "job" && <UpvoteSection score={score} view="desktop" />}
    </div>
  );
};
