import { Skeleton } from "@/components/ui/skeleton";

const TaskComponentSkeleton = () => {
  return (
    <div className="space-y-12">
      <div className="space-y-2">
        <Skeleton className="h-6 md:w-3/4" />
        <Skeleton className="h-6 w-1/2 md:hidden" />
      </div>
      <div className="flex justify-between">
        <Skeleton className="h-6 w-3/4 md:w-1/4" />
        <Skeleton className="h-6 w-6 rounded-full" />
      </div>

      <div className="space-y-3">
        <Skeleton className="h-6 w-20" />
        <Skeleton className="h-6 md:w-3/4" />
      </div>

      <div className="space-y-3">
        <div className="flex items-center space-x-3">
          <Skeleton className="h-6 w-6 rounded-full" />
          <Skeleton className="h-5 w-1/2" />
        </div>
        <div className="flex items-center space-x-2">
          <Skeleton className="h-6 w-6 rounded-full" />
          <Skeleton className="h-5 w-1/2" />
        </div>
        <div className="flex items-center space-x-2">
          <Skeleton className="h-6 w-6 rounded-full" />
          <Skeleton className="h-5 w-1/2" />
        </div>
      </div>
    </div>
  );
};

export default TaskComponentSkeleton;
