"use client";

import React, { useState } from "react";
import { RenderText } from "./RenderText";
import TimeDisplay from "./TimeDisplay";
import { CommentSkeleton } from "../Comments/SingleComment";
import { ProfileView } from "./ProfileView";
import clsx from "clsx";
import { CapitalizeFirstLetter } from "@/utils/string";
import { Separator } from "./Separator";

export type TPostTypesEnum = "story" | "comment" | "job" | "poll" | "pollopt";

type TComment = {
  id?: number;
  by?: string;
  text?: string;
  parent?: number;
  time?: number;
  type?: TPostTypesEnum;
  kids?: number[];
};

export const Comments = ({
  descendants = 0,
  kids = [],
  type,
}: {
  descendants?: number;
  kids?: number[];
  type?: TPostTypesEnum;
}) => {
  const [loadedComments, setLoadedComments] = useState<TComment[]>([]);
  const [loading, setLoading] = useState(false);
  const [visibleCount] = useState(3);
  const [commentsVisible, setCommentsVisible] = useState(false);

  const loadInitialComments = async () => {
    if (loadedComments.length > 0 || loading) return;
    setLoading(true);

    try {
      const initialComments = await Promise.all(
        kids.slice(0, visibleCount).map(async (id) => {
          const res = await fetch(
            `https://hacker-news.firebaseio.com/v0/item/${id}.json`
          );
          return res.json();
        })
      );

      setLoadedComments(initialComments);
    } catch (error) {
      console.error("Failed to load comments:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleLoadMoreComments = async () => {
    if (loading || loadedComments.length >= kids.length) return;
    setLoading(true);

    try {
      const nextComments = await Promise.all(
        kids
          .slice(loadedComments.length, loadedComments.length + visibleCount)
          .map(async (id) => {
            const res = await fetch(
              `https://hacker-news.firebaseio.com/v0/item/${id}.json`
            );
            return res.json();
          })
      );

      setLoadedComments((prev) => [...prev, ...nextComments]);
    } catch (error) {
      console.error("Failed to load comments:", error);
    } finally {
      setLoading(false);
    }
  };

  const toggleCommentsVisibility = () => {
    if (!commentsVisible) loadInitialComments();
    setCommentsVisible((prev) => !prev);
  };

  return (
    <div className="ml-9 mt-1">
      <div className="flex gap-2">
        <span
          onClick={toggleCommentsVisibility}
          className={clsx("ml-2 text-xxs cursor-pointer hover:underline", {
            "text-disabled": descendants <= 0,
          })}
        >
          {commentsVisible ? "Hide Comments" : "Show Comments"}
        </span>
      </div>

      {commentsVisible && (
        <div className="w-full">
          {loadedComments.length > 0
            ? loadedComments.map((comment: TComment) => (
                <div key={comment.id} className="p-2 flex gap-2 w-full">
                  <ProfileView by={comment.by} size={28} />
                  {type}
                  <div className="w-full">
                    <div className="flex items-center font-medium gap-1 mb-1">
                      <p className="text-sm font-medium">
                        {CapitalizeFirstLetter(comment.by)}
                      </p>
                      <Separator />
                      <TimeDisplay
                        className="text-xxs font-normal"
                        time={comment.time}
                      />
                    </div>

                    <RenderText
                      className="text-xs break-all overflow-hidden whitespace-normal text-muted-foreground"
                      text={comment.text ?? "No content"}
                    />

                    {comment.kids && comment.kids.length > 0 && (
                      <p className="text-xxs underline mt-2 cursor-pointer">
                        comments . {comment.kids.length}
                      </p>
                    )}
                  </div>
                </div>
              ))
            : !loading &&
              kids.length > 0 && (
                <p className="italic">Loading initial comments...</p>
              )}

          {loading && <CommentsLoading />}

          {/* load more button */}
          {!loading && loadedComments.length < kids.length && (
            <button onClick={handleLoadMoreComments} className="text-xxs ml-10">
              Load More Comments
            </button>
          )}
        </div>
      )}
    </div>
  );
};

const CommentsLoading = () => {
  return (
    <>
      {[...Array(3)].map((_, i) => (
        <CommentSkeleton key={i} />
      ))}
    </>
  );
};
