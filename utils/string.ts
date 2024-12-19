export const getAvatarIdFromUserName = (by: string | undefined): number => {
  if (!by) return 0;

  const hash = Array.from(by).reduce(
    (acc, char) => acc + char.charCodeAt(0),
    0
  );

  const avatarId = (hash % 100) + 1;

  return avatarId;
};
