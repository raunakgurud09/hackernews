"use client";

import React, { useState, useEffect } from "react";
import { usePathname, useSearchParams } from "next/navigation";

type ProgressBarProps = {
  color?: string;
};

const ProgressBar = ({ color = "#FF6600" }: ProgressBarProps) => {
  const [progressValue, setProgressValue] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    setIsLoading(true);
    setProgressValue(0);

    const interval = setInterval(() => {
      setProgressValue((prev) => {
        if (prev >= 100) {
          setIsLoading(false);
          clearInterval(interval);
          return 100;
        }
        return prev + 10;
      });
    }, 100);

    return () => {
      clearInterval(interval);
    };
  }, [pathname, searchParams]);

  if (!isLoading) return null;

  return (
    <div className="fixed top-0 left-0 right-0 z-50">
      <div className="relative w-full h-[1px]">
        <div
          className="absolute top-0 left-0 h-full rounded"
          style={{
            width: `${progressValue}%`,
            backgroundColor: color,
            transition: "width 0.3s ease-in-out",
          }}
        />
      </div>
    </div>
  );
};

export default ProgressBar;
