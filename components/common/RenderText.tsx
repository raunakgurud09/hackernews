"use client";

import React from "react";
import DOMPurify from "dompurify";

type RenderTextProps = {
  text: string;
  className?: string;
};

export const RenderText = ({ text, className }: RenderTextProps) => {
  // Sanitize the input to prevent XSS attacks
  const sanitizedText = DOMPurify.sanitize(text);

  return (
    <div
      className={className}
      dangerouslySetInnerHTML={{ __html: sanitizedText }}
    />
  );
};
