import { AVATAR_URL } from "@/utils/constants";
import { getAvatarIdFromUserName } from "@/utils/string";
import Image from "next/image";
import React from "react";

type AvatarProps = {
  by: string | undefined;
  size?: number;
};

export const Avatar = ({ by, size = 36 }: AvatarProps) => {
  return (
    <Image
      className="rounded-full cursor-pointer bg-muted"
      src={`${AVATAR_URL}/${getAvatarIdFromUserName(by)}`}
      style={{ width: size, height: size }}
      width={size}
      height={size}
      alt={by || "unknown"}
    />
  );
};
