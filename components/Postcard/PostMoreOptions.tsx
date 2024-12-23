"use client";

import React from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  EllipsisVertical,
  EyeOff,
  FlagTriangleRight,
  PencilLine,
  Trash2,
} from "lucide-react";
import { useAuth } from "@/context/AuthProvider";
import { toast } from "@/hooks/use-toast";

export const PostMoreOptions = ({ by }: { by: string | undefined }) => {
  const { user } = useAuth();
  // if (!user) return;
  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger>
          <EllipsisVertical size={24} className="border rounded-md p-1" />
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuLabel className="hidden">My Account</DropdownMenuLabel>
          {/* <DropdownMenuSeparator /> */}
          {user && user.id === by && (
            <DropdownMenuItem className="cursor-pointer">
              <PencilLine size={24} />
              <span className="text-sm">Edit</span>
            </DropdownMenuItem>
          )}
          <DropdownMenuItem className="cursor-pointer text-xs">
            <EyeOff size={24} />
            <span className="text-sm">Hide</span>
          </DropdownMenuItem>
          <DropdownMenuItem
            className="cursor-pointer text-xs"
            onClick={() => {
              console.log("title");
              toast({
                title: `Reported post by ${by}`,
                description: "Post was reported successfully",
              });
            }}
          >
            <FlagTriangleRight size={24} />
            <span className="text-sm">Report</span>
          </DropdownMenuItem>
          {user && user.id === by && (
            <DropdownMenuItem className="cursor-pointer text-xs">
              <Trash2 size={24} />
              <span className="text-sm">Delete</span>
            </DropdownMenuItem>
          )}
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
};
