"use client";

import React from "react";
import { UserDropDown } from "./UserDropDown";
import { KarmaPoints } from "./KarmaPoints";
import { useAuth } from "@/context/AuthProvider";
import { Button } from "../ui/button";
import Link from "next/link";

export const NavRight = () => {
  const { user } = useAuth();
  if (user) {
    return (
      <div className="flex gap-4 items-center">
        <KarmaPoints points={user?.karma || 1} />
        <UserDropDown />
      </div>
    );
  } else {
    return (
      <Link href={`/login`}>
        <Button>SignIn</Button>
      </Link>
    );
  }
};
