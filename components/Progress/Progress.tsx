"use client";

import React, { useState, useEffect } from "react";

type ProgressBarProps = {
  color?: string;
};

const ProgressBar = ({ color = "#FF6600" }: ProgressBarProps) => {
  const [progressValue, setProgressValue] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgressValue((prev) => (prev >= 100 ? 0 : prev + 10));
    }, 600);

    return () => {
      clearInterval(interval);
    };
  }, []);

  return (
    <div className="relative w-full h-[1px]  rounded">
      <div
        className="absolute top-0 left-0 h-full rounded"
        style={{
          width: `${progressValue}%`,
          backgroundColor: color,
          transition: "width 0.3s ease-in-out",
        }}
      ></div>
    </div>
  );
};

export default ProgressBar;
