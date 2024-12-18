"use client";

import { MessageCircle, Triangle } from "lucide-react";
import Link from "next/link";
import { Link as LinkIcon } from "lucide-react";
import React, { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { TooltipContent, TooltipProvider, TooltipTrigger } from "../ui/tooltip";
import { Tooltip } from "@radix-ui/react-tooltip";
import dayjs from "dayjs";

type PostCardProps = {
  id?: string;
  url: string;
  title?: string;
  text?: string;
  by?: string;
  time: number;
  score?: number;
};

import relativeTime from "dayjs/plugin/relativeTime";
import TimeDisplay from "./TimeDisplay";

dayjs.extend(relativeTime);

export const PostCard = ({
  by,
  id,
  url,
  title,
  text,
  time,
  score = 0,
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

  const [upVoteClicked, setUpVoteClicked] = useState(false);

  const handleUploadClick = () => {
    setUpVoteClicked((prev) => !prev);
  };
  return (
    <div className="flex w-full justify-between items-center border-b py-4 ">
      <div className="flex flex-col gap-2 ">
        <div className="flex gap-8">
          <div className="flex gap-2 font-lg items-center ">
            <div className="bg-foreground w-9 h-9 rounded-full"></div>
            <div>
              <p className="font-medium">
                {by ? by.charAt(0).toUpperCase() + by.slice(1) : "Unknown"}
              </p>
              <p className="hover:underline text-muted-foreground text-xs cursor-pointer animate-in transition-all">
                #{id}
              </p>
            </div>
          </div>
          <TimeDisplay time={time} />
        </div>
        <h3
          className="text-2xl animate-in transition-all flex items-center gap-2"
          onMouseEnter={() => {
            setShowLink(true);
          }}
          onMouseLeave={() => {
            setShowLink(false);
          }}
        >
          <Link target="_blank" href={url ?? ""}>
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
                        {linkClicked ? <p>Copied link</p> : <p> Copy link</p>}
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </motion.div>
              )}
            </AnimatePresence>
          </Link>
        </h3>
        {text ? (
          <p>{text?.slice(0, 100) + "..."}</p>
        ) : (
          <p className="text-secondary">No supporting text</p>
        )}
        <div className="flex gap-4">
          <div className="flex items-center justify-center gap-1 bg-secondary border-foreground rounded-md px-2 py-1">
            <MessageCircle size={17} />
            <p>Comments</p>
          </div>
        </div>
      </div>
      <div
        className="flex flex-col cursor-pointer items-center justify-center gap-1 bg-secondary border-foreground rounded-md px-4 py-1"
        onClick={handleUploadClick}
      >
        <Triangle
          fill={upVoteClicked ? "#ff6600" : "transparent"}
          stroke={upVoteClicked ? "#FF6600" : "#000"}
          className=""
          size={17}
        />
        <p className="text-sm">{upVoteClicked ? score + 1 : score}</p>
      </div>
    </div>
  );
};
