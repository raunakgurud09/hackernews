import Link from "next/link";
import React from "react";

export const PostTopBanner = ({ type }: { type?: string | undefined }) => {
  if (type !== "job") return null;
  return (
    <div className="w-full py-4">
      <div
        className="w-full bg-secondary-surface-orange text-primary p-3 text-sm text-center"
        style={{ backgroundColor: "#fff7ed" }}
      >
        These are jobs at YC startups.
        <br />
        See more at
        <Link
          href="https://www.ycombinator.com/jobs"
          target="_blank"
          className="hover:underline decoration-primary ml-1"
        >
          ycombinator.com/jobs
        </Link>
      </div>
    </div>
  );
};
