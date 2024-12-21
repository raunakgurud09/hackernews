"use client";

import { useAuth } from "@/context/AuthProvider";
import { Button } from "../ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

export const KarmaPoints = ({ points = 0 }) => {
  const { user } = useAuth();
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger>
          <Button variant="outline" size="icon" className="w-fit min-w-9 p-1">
            {points || user?.karma}
          </Button>
        </TooltipTrigger>
        <TooltipContent>
          <p className="text-white">Karma</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};
