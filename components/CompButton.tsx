"use client";

import React from "react";
import { Button } from "./ui/button";
import Link from "next/link";

const CompButton = () => {
  return (
    <Button
      style={{ width: "100px" }}
      // onClick={handleClick}
    >
      <Link href={`/new?page=1`}>New</Link>
    </Button>
  );
};

export default CompButton;
