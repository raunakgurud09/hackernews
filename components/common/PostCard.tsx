"use client";

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
};

import { Comments } from "./Comments";
import { RenderText } from "./RenderText";
import { PostcardHeader } from "../Postcard/PostcardHeader";
import { PostCardH2 } from "../Postcard/PostcardH2";
import { UpvoteSection } from "../Postcard/UpvoteSection";
import { Comment } from "../Comments/Comment";

export const PostCard = ({
  by,
  id,
  url,
  title,
  text,
  time,
  score = 0,
  descendants,
  kids,
  type,
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
          <div className="flex flex-col gap-1 mt-2">
            <div className="flex ml-9">
              <Comment descendants={descendants} />
              <UpvoteSection score={score} view="mobile" />
            </div>

            {/* Comments section */}
            <Comments descendants={descendants} kids={kids} />
          </div>
        )}
      </div>

      {/* Upvote section */}
      {type !== "job" && <UpvoteSection score={score} view="desktop" />}
    </div>
  );
};
