interface SkeletonProps {
  className?: string;
}

export function Skeleton({ className = '' }: SkeletonProps) {
  return <div className={`skeleton ${className}`} aria-hidden="true" />;
}

export function RepoCardSkeleton() {
  return (
    <div className="border border-gray-200 dark:border-gray-800 rounded-lg p-5 space-y-3 bg-white dark:bg-gray-900">
      <Skeleton className="h-5 w-3/4" />
      <Skeleton className="h-4 w-full" />
      <Skeleton className="h-4 w-2/3" />
      <div className="flex gap-4 pt-1">
        <Skeleton className="h-3 w-20" />
        <Skeleton className="h-3 w-12" />
        <Skeleton className="h-3 w-12" />
      </div>
    </div>
  );
}

export function HeroSkeleton() {
  return (
    <div className="flex flex-col items-center gap-4">
      <Skeleton className="w-20 h-20 rounded-full" />
      <Skeleton className="h-8 w-48" />
      <Skeleton className="h-4 w-64" />
      <Skeleton className="h-4 w-80" />
      <Skeleton className="h-4 w-72" />
    </div>
  );
}

export function StatCardSkeleton() {
  return (
    <div className="border border-gray-200 dark:border-gray-800 rounded-lg p-6 flex flex-col items-center gap-2 bg-white dark:bg-gray-900">
      <Skeleton className="h-8 w-16" />
      <Skeleton className="h-4 w-20" />
    </div>
  );
}
