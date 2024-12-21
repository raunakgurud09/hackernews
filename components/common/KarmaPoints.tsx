"use client";

import { useAuth } from "@/context/AuthProvider";
import { Button } from "../ui/button";

export const KarmaPoints = ({ points = 0 }) => {
  const { user } = useAuth();
  console.log(user);
  return (
    <Button variant="outline" size="icon" className="w-fit min-w-9 p-1">
      {points || user?.karma}
    </Button>
  );
};
