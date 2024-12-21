"use client";
import React from "react";
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
import { Button } from "../ui/button";
import dayjs from "dayjs";
import Link from "next/link";

export const UserDropDown = () => {
  const { user, logout } = useAuth();
  if (!user) return null;
  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <Avatar by={user?.id} size={36} />
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-[200px]" align="end">
        <DropdownMenuLabel>
          <div className="font-normal">
            <div className=" flex gap-2 items-start justify-between">
              <Button variant="outline" size="icon" className="text-xs">
                {user.karma}
              </Button>
            </div>
            <div>
              <Link target="_blank" href={createHNUserPageUrl(user.id)}>
                <p className="text-lg font-medium mt-2 mb-2 hover:underline cursor-pointer">
                  {user.id}
                </p>
              </Link>
              <div className="flex gap-1 items-center mb-1">
                <CalendarDays size={12} />
                <p className="text-xs">
                  Joined {dayjs.unix(user.created).format("MMMM YYYY")}
                </p>
              </div>
            </div>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={() => logout()} className="cursor-pointer">
          <LogOut />
          <span> SignOut</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
