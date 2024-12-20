import { AVATAR_URL } from "@/utils/constants";
import { getAvatarIdFromUserName } from "@/utils/string";
import Image from "next/image";
import React from "react";
import { getLevelColor, getUserLevel } from "@/utils/karma";

type AvatarProps = {
  by: string | undefined;
  size?: number;
  karma?: number;
};

export const Avatar = ({ by, size = 36, karma = 0 }: AvatarProps) => {
  return (
    <div className="relative">
      <Image
        className="rounded-full cursor-pointer bg-muted"
        src={`${AVATAR_URL}/${getAvatarIdFromUserName(by)}`}
        style={{ width: size, height: size }}
        width={size}
        height={size}
        alt={by || "unknown"}
      />
      {karma ? (
        <div
          className="w-5 h-5 rounded-full absolute bottom-0 right-0 border-4 border-background"
          style={{ backgroundColor: getLevelColor(getUserLevel(karma)) }}
        ></div>
      ) : null}
    </div>
  );
};
