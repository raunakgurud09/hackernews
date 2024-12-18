"use client";

import React from "react";
import { Button } from "./ui/button";
import { redirect } from "next/navigation";

const CompButton = () => {
  return (
    <Button style={{ width: "100px" }} onClick={() => redirect(`/new?page=1`)}>
      New
    </Button>
  );
};

export default CompButton;
