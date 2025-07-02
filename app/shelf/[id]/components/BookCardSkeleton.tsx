import { Skeleton } from "@/src/components/ui/skeleton";

export function BookCardSkeleton() {
  return (
    <div className="h-full flex flex-col justify-between py-3 gap-y-0 rounded-lg border bg-white shadow-sm">
      <div className="flex flex-col items-center gap-2 px-2">
        <Skeleton className="w-32 h-48 rounded mb-2" />
        <div className="w-full">
          <Skeleton className="h-5 w-3/4 mx-auto mb-1" />
          <Skeleton className="h-3 w-1/2 mx-auto" />
        </div>
      </div>
      <div className="flex flex-col items-center gap-1 px-2 mt-2">
        <Skeleton className="h-4 w-1/4 mb-1" />
        <Skeleton className="h-4 w-1/4 mb-1" />
        <Skeleton className="h-3 w-5/6" />
      </div>
    </div>
  );
}
