"use client";

import { useState } from "react";
import Link from "next/link";
import { Link as LinkIcon } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { TooltipContent, TooltipProvider, TooltipTrigger } from "../ui/tooltip";
import { Tooltip } from "@radix-ui/react-tooltip";

type PostCardH2Props = {
  title?: string | undefined;
  url?: string | undefined;
};

export const PostCardH2 = ({ title, url }: PostCardH2Props) => {
  const [showLink, setShowLink] = useState(false);
  const [linkClicked, setLinkClicked] = useState(false);
  const handleLinkClicked = () => {
    navigator.clipboard.writeText(url ?? "");
    setLinkClicked(true);

    setTimeout(() => {
      setLinkClicked(false);
    }, 2000);
  };

  if (!title) return null;

  return (
    <h2
      className="w-full text-base hover:text-primary animate-in transition-all flex items-center gap-2"
      onMouseEnter={() => {
        setShowLink(true);
      }}
      onMouseLeave={() => {
        setShowLink(false);
      }}
    >
      <Link target="_blank" href={url ?? ""}>
        {title}{" "}
        <div className="inline-flex text-muted-foreground">
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
                        size={12}
                        // color={linkClicked ? "#FF6600" : "#000"}
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
        </div>
      </Link>
    </h2>
  );
};
