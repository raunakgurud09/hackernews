import { HN_USER_INFO_PAGE } from "./constants";

export const getAvatarIdFromUserName = (by: string | undefined): number => {
  if (!by) return 0;

  const hash = Array.from(by).reduce(
    (acc, char) => acc + char.charCodeAt(0),
    0
  );

  const avatarId = (hash % 100) + 1;

  return avatarId;
};

export const CapitalizeFirstLetter = (str: string | undefined) => {
  if (!str) return "Anonymous";
  return str.charAt(0).toUpperCase() + str.slice(1);
};

export const createHNUserPageUrl = (username: string | undefined) => {
  if (!username) return "";
  return `${HN_USER_INFO_PAGE}${username}`;
};
