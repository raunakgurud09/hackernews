"use client";

import React, { useState } from "react";
import { Button } from "./ui/button";
import { sleep } from "@/lib/utils";

const CompButton = () => {
  const [isLoading, setLoading] = useState(false);
  const handleClick = async () => {
    setLoading(true);
    console.log("call");
    await sleep(2000);
    setLoading(false);
  };

  return (
    <Button
      loading={isLoading}
      style={{ width: "100px" }}
      onClick={handleClick}
    >
      Click me
    </Button>
  );
};

export default CompButton;
