import { Skeleton } from "../ui/skeleton";

export const CommentSkeleton = () => {
  return (
    <div className="p-2 flex gap-2 w-full">
      <Skeleton className="h-7 w-7 rounded-full bg-muted" />
      <div className="w-full">
        <div className="font-medium flex gap-2 mb-2">
          <Skeleton className="w-20 h-3 text-sm font-medium" />
          <Skeleton className="w-8 h-3 text-sm font-medium" />
        </div>
        <div className="flex flex-col gap-1">
          <Skeleton className="w-[20%] h-3 text-sm font-medium" />
          <Skeleton className="w-[80%] h-3 text-sm font-medium" />
          <Skeleton className="w-full h-3 text-sm font-medium" />
          <Skeleton className="w-full h-3 text-sm font-medium" />
          <Skeleton className="w-[30%] h-3 text-sm font-medium" />
        </div>
        <Skeleton className="w-[40%] h-2 mt-2" />
      </div>
    </div>
  );
};
