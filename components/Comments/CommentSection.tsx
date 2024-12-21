"use client";

import React, { useState, useRef, ChangeEvent } from "react";
import { CommentBtn } from "./CommentBtn";
import { Comments } from "../Comments/Comments";
import { UpvoteSection } from "../Postcard/UpvoteSection";
import { Button } from "../ui/button";
import { ArrowUp } from "lucide-react";
import { Avatar } from "../common/Avatar";

interface CommentSectionProps {
  descendants: number;
  score: number;
  kids?: number[];
  defaultVisible?: boolean;
}

export const CommentSection = ({
  descendants,
  score,
  kids,
  defaultVisible = false,
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
          <CommentBtn descendants={descendants} kids={kids} />
        </div>
        <UpvoteSection score={score} view="mobile" />
      </div>

      {/* Auto-expanding comment textarea */}
      {showTextarea && (
        <div className="ml-8 mt-3 relative">
          <div className="absolute top-1 left-4">
            <Avatar by={"me"} size={24} />
          </div>
          <textarea
            ref={textareaRef}
            value={comment}
            onChange={handleTextareaInput}
            className="w-full ml-3 min-h-[32px] max-h-[300px] py-2 pl-9 pr-8 overflow-y-scroll rounded-md border border-input bg-background text-xs ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-ring focus:ring-offset-1 resize-none overflow-hidden"
            placeholder="Write your comment..."
            rows={1}
            autoFocus
          />
          <div className="flex gap-2 absolute right-[-8px] bottom-3">
            <Button
              onClick={() => {
                setComment("");
                setShowTextarea(false);
              }}
              className="w-6 h-6 p-1"
            >
              <ArrowUp size={1} />
            </Button>
          </div>
        </div>
      )}

      {/* Comments section */}
      {
        <Comments
          descendants={descendants}
          kids={kids}
          defaultVisible={defaultVisible}
        />
      }
    </div>
  );
};
