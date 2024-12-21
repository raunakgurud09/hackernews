import { MessageCircle } from "lucide-react";

type CommentProps = {
  descendants?: number;
  kids?: number[];
};

export const CommentBtn = ({ descendants, kids }: CommentProps) => {
  return (
    <div className="w-fit flex items-center justify-center gap-1  cursor-pointer hover:bg-muted hover:text-primary rounded-md px-2 py-1">
      <MessageCircle size={17} className="rounded-md" />
      <p className="text-xs">{descendants || kids?.length || 0}</p>
    </div>
  );
};
