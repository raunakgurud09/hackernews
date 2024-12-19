"use client";

import React, { useState } from "react";
import DOMPurify from "dompurify";

type RenderTextProps = {
  text: string;
  className?: string;
  limit?: number;
};

export const RenderText = ({
  text,
  className = "",
  limit = 300,
}: RenderTextProps) => {
  const [isExpanded, setIsExpanded] = useState(false);

  // Sanitize the input to prevent XSS attacks
  const sanitizedText = DOMPurify.sanitize(text);

  const displayedText = isExpanded
    ? sanitizedText
    : DOMPurify.sanitize(text.slice(0, limit) || "");

  const toggleShowMore = () => setIsExpanded((prev) => !prev);

  return (
    <div className={className}>
      <div
        className="break-all overflow-hidden whitespace-normal"
        dangerouslySetInnerHTML={{ __html: displayedText }}
      />
      {text.length > limit && (
        <button
          className="text-blue-500 text-xxs mt-1 underline"
          onClick={toggleShowMore}
        >
          {isExpanded ? "Show Less" : "Show More"}
        </button>
      )}
    </div>
  );
};
