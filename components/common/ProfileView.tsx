"use client";

import React, { useState } from "react";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
// import { sleep } from "@/lib/utils";
import { Avatar } from "./Avatar";

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
      <HoverCardContent>
        {loading ? (
          <ProfilePreviewSkeleton />
        ) : error ? (
          <div>Error loading user data</div>
        ) : userData ? (
          <div>
            <Avatar by={userData?.id} size={size} />
            <div>
              <div>{userData.id}</div>
              Created: {new Date(userData.created * 1000).toLocaleDateString()}
            </div>
            <div>Karma: {userData.karma}</div>
          </div>
        ) : (
          <div>Hover to load user data</div>
        )}
      </HoverCardContent>
    </HoverCard>
  );
};

const ProfilePreviewSkeleton = () => {
  return <div className=""></div>;
};
