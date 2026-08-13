export default function TenantHistorySkeleton() {
  return (
    <div className="space-y-4 animate-pulse">
      {/* User Info Header Skeleton */}
      <div className="flex items-center gap-3.5 bg-emerald-50/50 dark:bg-emerald-950/20 p-3.5 rounded-xl border border-emerald-100/50 dark:border-emerald-800/30">
        {/* Avatar Skeleton */}
        <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-gray-200 dark:bg-gray-800 shrink-0"></div>

        {/* User Details Skeleton */}
        <div className="space-y-2 flex-1 min-w-0">
          <div className="h-4 w-32 sm:w-40 bg-gray-200 dark:bg-gray-800 rounded-md"></div>
          <div className="h-3 w-44 sm:w-52 bg-gray-200 dark:bg-gray-800 rounded-md"></div>
          <div className="h-3 w-28 sm:w-36 bg-gray-200 dark:bg-gray-800 rounded-md"></div>
        </div>
      </div>

      {/* Recent Requests Section Skeleton */}
      <div>
        {/* Section Title Skeleton */}
        <div className="h-3 w-36 bg-gray-200 dark:bg-gray-800 rounded mb-2.5"></div>

        {/* 3 Request Items Skeleton */}
        <div className="space-y-2">
          {[1, 2, 3].map((item) => (
            <div
              key={item}
              className="flex items-center justify-between p-3 border border-gray-100 dark:border-gray-800 rounded-xl bg-gray-50/60 dark:bg-gray-800/40 gap-2"
            >
              <div className="space-y-1.5 flex-1 min-w-0">
                <div className="h-3.5 w-3/4 bg-gray-200 dark:bg-gray-800 rounded-md"></div>
                <div className="h-3 w-1/2 bg-gray-200 dark:bg-gray-800 rounded-md"></div>
              </div>
              {/* Badge Skeleton */}
              <div className="h-5 w-16 bg-gray-200 dark:bg-gray-800 rounded-md shrink-0"></div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}