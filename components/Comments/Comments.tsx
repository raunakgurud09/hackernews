"use client";

import React, { useEffect, useState } from "react";
import { CommentSkeleton } from "../Comments/SingleComment";
import { Comment } from "./Comment";
import { TComment, TPostTypesEnum } from "@/types/comment";
import { ToggleShowComments } from "./ToggleShowComments";
import { fetchComments } from "@/services/comment";

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
  const [commentsVisible, setCommentsVisible] =
    useState<boolean>(defaultVisible);

  const loadInitialComments = async () => {
    if (loadedComments.length > 0 || loading) return;
    setLoading(true);
    try {
      const initialComments = await fetchComments(kids.slice(0, visibleCount));
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
      const nextBatch = kids.slice(
        loadedComments.length,
        loadedComments.length + visibleCount
      );
      const nextComments = await fetchComments(nextBatch);
      setLoadedComments((prev) => [...prev, ...nextComments]);
    } catch (error) {
      console.error("Failed to load more comments:", error);
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
      <ToggleShowComments
        descendants={descendants}
        kids={kids}
        toggleCommentsVisibility={toggleCommentsVisibility}
        commentsVisible={commentsVisible}
      />

      {commentsVisible && (
        <div className="w-full">
          {loadedComments.length > 0
            ? loadedComments.map((comment: TComment) => (
                <Comment key={comment.id} {...comment} type={type} />
              ))
            : !loading &&
              kids.length > 0 && (
                <p className="italic text-xxs">Loading initial comments...</p>
              )}

          {loading && <CommentsLoading visibleCount={visibleCount} />}

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

const CommentsLoading = ({ visibleCount }: { visibleCount: number }) => {
  return (
    <>
      {[...Array(visibleCount)].map((_, i) => (
        <CommentSkeleton key={i} />
      ))}
    </>
  );
};
