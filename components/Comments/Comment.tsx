import { MessageCircle } from "lucide-react";

type CommentProps = {
  descendants?: number;
};

export const Comment = ({ descendants }: CommentProps) => {
  return (
    <div className="w-fit flex items-center justify-center gap-1  cursor-pointer hover:bg-muted hover:text-primary rounded-md px-2 py-1">
      <MessageCircle size={17} />
      <p className="text-xs">{descendants}</p>
    </div>
  );
};
