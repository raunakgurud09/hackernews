"use client";

import { MessageCircle, Triangle } from "lucide-react";
import Link from "next/link";
import { Link as LinkIcon } from "lucide-react";
import React, { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { TooltipContent, TooltipProvider, TooltipTrigger } from "../ui/tooltip";
import { Tooltip } from "@radix-ui/react-tooltip";

type PostCardProps = {
  id?: string;
  url: string;
  title?: string;
  text?: string;
  by?: string;
  time: number;
  score?: number;
  descendants?: number;
  kids?: number[];
};

import TimeDisplay from "./TimeDisplay";
import { ProfileView } from "./ProfileView";
import { Comments } from "./Comments";
import { RenderText } from "./RenderText";

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
}: PostCardProps) => {
  const [showLink, setShowLink] = useState(false);
  const [linkClicked, setLinkClicked] = useState(false);
  const handleLinkClicked = () => {
    navigator.clipboard.writeText(url);
    setLinkClicked(true);

    setTimeout(() => {
      setLinkClicked(false);
    }, 2000);
  };

  return (
    <div className="flex w-full justify-between items-start border-b p-3 md:p-6">
      <div className="flex flex-col gap-2 w-full sm:w-[90%]">
        <div className="flex gap-8">
          <div className="flex gap-2 font-lg items-center ">
            <ProfileView by={by} />
            <div>
              <p className="font-medium text-sm">
                {by ? by.charAt(0).toUpperCase() + by.slice(1) : "Unknown"}
              </p>
              <p className="hover:underline text-muted-foreground text-xs cursor-pointer animate-in transition-all">
                #{id}
              </p>
            </div>
          </div>
          <TimeDisplay time={time} />
        </div>

        <article className="ml-10">
          <h2
            className="w-full text-base animate-in transition-all flex items-center gap-2"
            onMouseEnter={() => {
              setShowLink(true);
            }}
            onMouseLeave={() => {
              setShowLink(false);
            }}
          >
            <Link
              color={linkClicked ? "#FF6600" : "card-foreground"}
              target="_blank"
              href={url ?? ""}
            >
              {title}{" "}
              <AnimatePresence>
                {showLink && (
                  <motion.div
                    initial={{
                      x: "-10px",
                      opacity: 0,
                    }}
                    animate={{
                      x: "0px",
                      opacity: 1,
                    }}
                    exit={{
                      x: "-10px",
                      opacity: 0,
                    }}
                    className="inline-flex"
                  >
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger>
                          <LinkIcon
                            size={16}
                            color={linkClicked ? "#FF6600" : "#000"}
                            onClick={(e) => {
                              e.preventDefault();
                              handleLinkClicked();
                            }}
                            className="cursor-pointer"
                          />
                        </TooltipTrigger>
                        <TooltipContent hideWhenDetached>
                          {linkClicked ? <p>Copied!</p> : <p> Copy link</p>}
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  </motion.div>
                )}
              </AnimatePresence>
            </Link>
          </h2>
          {text ? (
            <RenderText
              className="mt-2 text-sm break-all overflow-hidden whitespace-normal"
              text={text}
              limit={500}
            />
          ) : null}
        </article>

        <div className="flex flex-col gap-1">
          <div className="flex ml-9">
            <Comment descendants={descendants} />
            <UpvoteSection score={score} view="mobile" />
          </div>

          {/* Comments section */}
          <Comments descendants={descendants} kids={kids} />
        </div>
      </div>

      {/* Upvote section */}
      <UpvoteSection score={score} view="desktop" />
    </div>
  );
};

type CommentProps = {
  descendants?: number;
};
const Comment = ({ descendants }: CommentProps) => {
  return (
    <div className="w-fit flex items-center justify-center gap-1  cursor-pointer hover:bg-muted hover:text-primary rounded-md px-2 py-1">
      <MessageCircle size={17} />
      <p className="text-xs">{descendants}</p>
    </div>
  );
};

type UpvoteSectionProps = {
  score?: number;
  view?: "desktop" | "mobile";
};

const UpvoteSection = ({ score = 0, view = "desktop" }: UpvoteSectionProps) => {
  const [upVoteClicked, setUpVoteClicked] = useState(false);

  const handleUpvoteClick = () => {
    setUpVoteClicked((prev) => !prev);
  };

  const UpvoteContent = ({ className }: { className: string }) => (
    <div className={className} onClick={handleUpvoteClick}>
      <Triangle
        fill={upVoteClicked ? "#ff6600" : "transparent"}
        stroke={upVoteClicked ? "#FF6600" : "#000"}
        className=""
        size={17}
      />
      <p className="text-xs">{upVoteClicked ? score + 1 : score}</p>
    </div>
  );

  return (
    <>
      {view === "desktop" ? (
        // {/* Desktop view */}
        <UpvoteContent className="hidden sm:flex flex-col cursor-pointer items-center justify-center gap-1 bg-secondary border-foreground rounded-md px-4 py-1" />
      ) : (
        // {/* Mobile view */}
        <UpvoteContent className="flex sm:hidden w-fit cursor-pointer items-center justify-center gap-1 rounded-md px-4 py-1" />
      )}
    </>
  );
};
