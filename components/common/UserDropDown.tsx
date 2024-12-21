"use client";
import React, { useMemo } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useAuth } from "@/context/AuthProvider";
import { Avatar } from "./Avatar";
import { CalendarDays, LogOut } from "lucide-react";
import { createHNUserPageUrl } from "@/utils/string";
import Link from "next/link";
import { Progress } from "../ui/progress";
import { getJoinedAt } from "@/lib/dayjs";
import { getUserLevel } from "@/utils/karma";

export const UserDropDown = () => {
  const { user, logout } = useAuth();
  const level = useMemo(() => getUserLevel(user?.karma || 1), []);
  if (!user) return null;
  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <Avatar by={user?.id} size={36} />
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-[200px]" align="end">
        <DropdownMenuLabel>
          <div className="font-normal">
            <div className=" flex flex-col gap-1 items-start justify-between mb-4">
              <span className="text-xxs">{level} LVL</span>
              <Progress value={level} style={{ background: "#888" }} />
            </div>
            <div>
              <Link target="_blank" href={createHNUserPageUrl(user.id)}>
                <p className="text-lg font-medium mt-2 mb-2 hover:underline cursor-pointer">
                  {user.id}
                </p>
              </Link>
              <div className="flex gap-1 items-center mb-1">
                <CalendarDays size={12} />
                <p className="text-xxs">Joined {getJoinedAt(user.created)}</p>
              </div>
            </div>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={() => logout()} className="cursor-pointer">
          <LogOut />
          <span> Logout</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
