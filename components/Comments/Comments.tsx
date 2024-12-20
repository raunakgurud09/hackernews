"use client";

import React, { useEffect, useState } from "react";
import TimeDisplay from "../common/TimeDisplay";
import { CommentSkeleton } from "../Comments/SingleComment";
import { ProfileView } from "../common/ProfileView";
import clsx from "clsx";
import { CapitalizeFirstLetter } from "@/utils/string";
import { Separator } from "../common/Separator";
import { RenderText } from "../common/RenderText";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

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
  defaultVisible = false,
}: {
  descendants?: number;
  kids?: number[];
  type?: TPostTypesEnum;
  defaultVisible: boolean;
}) => {
  const [loadedComments, setLoadedComments] = useState<TComment[]>([]);
  const [loading, setLoading] = useState(false);
  const [visibleCount] = useState(3);
  const [commentsVisible, setCommentsVisible] = useState(defaultVisible);

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

  useEffect(() => {
    if (commentsVisible) {
      loadInitialComments();
    }
  }, []);

  return (
    <div className="ml-9 mt-1">
      <div className="flex gap-2">
        {(descendants > 0 || kids.length > 0) && (
          <span
            onClick={toggleCommentsVisibility}
            className={clsx("ml-2 text-xxs cursor-pointer hover:underline", {
              "text-disabled": descendants <= 0,
            })}
          >
            {commentsVisible ? "Hide Comments" : "Show Comments"}
          </span>
        )}
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
                      <Link
                        href={`/comment?id=${comment.id}`}
                        className="text-xxs mt-2 cursor-pointer flex items-center gap-[2px] hover:gap-[6px] transition-all hover:underline"
                      >
                        <span>View all {comment.kids.length} comments</span>
                        <ArrowRight width={10} height={10} />
                      </Link>
                    )}
                  </div>
                </div>
              ))
            : !loading &&
              kids.length > 0 && (
                <p className="italic text-xxs">Loading initial comments...</p>
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
