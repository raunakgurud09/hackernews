"use client";

import React, { useState } from "react";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
// import { sleep } from "@/lib/utils";
import { Avatar } from "./Avatar";
import { Button } from "../ui/button";
import { CalendarDays } from "lucide-react";
import { createHNUserPageUrl } from "@/utils/string";
import Link from "next/link";
import { RenderText } from "./RenderText";
import { Skeleton } from "../ui/skeleton";
import { getJoinedAt } from "@/lib/dayjs";

type ProfileViewProps = {
  by: string | undefined;
  size?: number;
};

type UserData = {
  about?: string;
  created: number;
  id: string; // username
  karma: number;
};

export const ProfileView = ({ by, size = 36 }: ProfileViewProps) => {
  const [userData, setUserData] = useState<UserData | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<boolean>(false);

  const fetchUserData = async () => {
    if (userData || loading) return;
    setLoading(true);
    setError(false);

    try {
      const res = await fetch(
        `https://hacker-news.firebaseio.com/v0/user/${by}.json?print=pretty`
      );
      if (!res.ok) {
        throw new Error("Failed to fetch user data");
      }
      const data = await res.json();
      setUserData(data);
    } catch (err) {
      console.error("Error fetching user data:", err);
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  return (
    <HoverCard>
      <HoverCardTrigger onMouseEnter={fetchUserData}>
        <Avatar by={by} size={size} />
      </HoverCardTrigger>
      <HoverCardContent className="w-96">
        {loading ? (
          <ProfilePreviewSkeleton />
        ) : error ? (
          <div>Error loading user data</div>
        ) : userData ? (
          <div className="">
            <div className=" flex gap-2 items-start justify-between">
              <Avatar by={userData?.id} size={60} karma={userData.karma} />
              <Button
                variant="outline"
                size="icon"
                className="text-xs w-fit p-1 min-w-9"
              >
                {userData.karma}
              </Button>
            </div>
            <div>
              <Link target="_blank" href={createHNUserPageUrl(userData.id)}>
                <p className="text-lg font-medium mt-2 mb-2 hover:underline cursor-pointer">
                  {userData.id}
                </p>
              </Link>
              <div className="flex gap-1 items-center mb-1">
                <CalendarDays size={12} />
                <p className="text-xs">
                  Joined {getJoinedAt(userData.created)}
                </p>
              </div>
              <RenderText
                text={userData?.about}
                className="text-xxs"
                limit={200}
              />
            </div>
          </div>
        ) : (
          <div>Hover to load user data</div>
        )}
      </HoverCardContent>
    </HoverCard>
  );
};

const ProfilePreviewSkeleton = () => {
  return (
    <div className="">
      <div className=" flex gap-2 items-start justify-between">
        <Skeleton className="w-16 h-16 rounded-full" />
        <Skeleton className="w-9 h-9" />
      </div>
      <div>
        <Skeleton className="w-[40%] h-4 text-lg font-medium mt-2 mb-2 " />
        <Skeleton className="w-[60%] h-3 mb-2" />
        <div className="flex flex-col gap-1">
          <Skeleton className="w-[20%] h-2 text-sm font-medium" />
          <Skeleton className="w-[80%] h-2 text-sm font-medium" />
          <Skeleton className="w-full h-2 text-sm font-medium" />
          <Skeleton className="w-full h-2 text-sm font-medium" />
          <Skeleton className="w-[30%] h-2 text-sm font-medium" />
        </div>
      </div>
    </div>
  );
};
