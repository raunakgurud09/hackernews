"use client";

import React, { useState, useRef, ChangeEvent } from "react";
import { Comment } from "../Comments/Comment";
import { Comments } from "../Comments/Comments";
import { UpvoteSection } from "../Postcard/UpvoteSection";

interface CommentSectionProps {
  descendants: number;
  score: number;
  kids?: number[];
}

export const CommentSection = ({
  descendants,
  score,
  kids,
}: CommentSectionProps) => {
  const [showTextarea, setShowTextarea] = useState(false);
  const [comment, setComment] = useState("");
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const handleTextareaInput = (e: ChangeEvent<HTMLTextAreaElement>) => {
    const textarea = e.target;
    setComment(textarea.value);

    textarea.style.height = "auto";
    textarea.style.height = `${textarea.scrollHeight}px`;
  };

  return (
    <div className="flex flex-col gap-1 mt-2">
      <div className="flex ml-9">
        <div
          onClick={() => setShowTextarea((prev) => !prev)}
          className="cursor-pointer"
        >
          <Comment descendants={descendants} />
        </div>
        <UpvoteSection score={score} view="mobile" />
      </div>

      {/* Auto-expanding comment textarea */}
      {showTextarea && (
        <div className="ml-9 mt-2 mb-4">
          <textarea
            ref={textareaRef}
            value={comment}
            onChange={handleTextareaInput}
            className="w-full min-h-[40px] max-h-[300px] p-3 rounded-md border border-input bg-background text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 resize-none overflow-hidden"
            placeholder="Write your comment here..."
            rows={1}
            autoFocus
          />
          <div className="flex gap-2 mt-2">
            <button
              className="px-4 py-2 text-sm font-medium bg-primary text-primary-foreground hover:bg-primary/90 rounded-md"
              onClick={() => {
                // Handle comment submission here
                console.log("Comment submitted:", comment);
                setComment("");
                setShowTextarea(false);
              }}
            >
              Submit
            </button>
            <button
              className="px-4 py-2 text-sm font-medium bg-secondary text-secondary-foreground hover:bg-secondary/80 rounded-md"
              onClick={() => {
                setComment("");
                setShowTextarea(false);
              }}
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      {/* Comments section */}
      {descendants > 0 && <Comments descendants={descendants} kids={kids} />}
    </div>
  );
};
