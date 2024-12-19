"use client";

import { Triangle } from "lucide-react";
import { useState } from "react";

type UpvoteSectionProps = {
  score?: number;
  view?: "desktop" | "mobile";
};

export const UpvoteSection = ({
  score = 0,
  view = "desktop",
}: UpvoteSectionProps) => {
  const [upVoteClicked, setUpVoteClicked] = useState(false);

  const handleUpvoteClick = () => {
    setUpVoteClicked((prev) => !prev);
  };

  const UpvoteContent = ({ className }: { className: string }) => (
    <div className={className} onClick={handleUpvoteClick}>
      <Triangle fill={upVoteClicked ? "#ff6600" : "transparent"} size={17} />
      <p className="text-xs">{upVoteClicked ? score + 1 : score}</p>
    </div>
  );

  return (
    <>
      {view === "desktop" ? (
        <UpvoteContent className="hidden sm:flex flex-col cursor-pointer items-center justify-center gap-1 hover:bg-secondary border-foreground rounded-md px-2 py-1" />
      ) : (
        <UpvoteContent className="flex sm:hidden w-fit cursor-pointer items-center justify-center gap-1 rounded-md px-2 py-1 text-blue" />
      )}
    </>
  );
};
