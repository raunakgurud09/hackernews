"use client";

import { useAuth } from "@/context/AuthProvider";
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
          <div className="w-fit min-w-9 h-9 flex items-center justify-center p-1 border rounded-md hover:bg-accent text-sm">
            {points || user?.karma}
          </div>
        </TooltipTrigger>
        <TooltipContent>
          <p className="text-white">Karma</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};
