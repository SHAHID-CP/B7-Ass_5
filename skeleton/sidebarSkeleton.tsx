export default function SidebarSkeleton() {
  return (
    <aside className="fixed lg:static top-12 lg:top-16 left-0 z-40 h-screen not-lg:h-11/12 w-64 bg-white dark:bg-slate-900 flex flex-col justify-between border-r border-slate-200 dark:border-slate-800 shrink-0 animate-pulse">
      <div>
        {/* Header Section Skeleton */}
        <div className="p-4 sm:p-5 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            {/* Logo Icon Box */}
            <div className="w-8 h-8 bg-slate-200 dark:bg-slate-800 rounded-xl shrink-0" />
            {/* Logo Text */}
            <div className="h-5 w-24 bg-slate-200 dark:bg-slate-800 rounded-md not-lg:hidden" />
          </div>
          {/* Mobile Close Button Placeholder */}
          <div className="w-5 h-5 bg-slate-200 dark:bg-slate-800 rounded lg:hidden" />
        </div>

        {/* Navigation Items Skeleton */}
        <div className="p-3.5 space-y-2">
          {[...Array(5)].map((_, index) => (
            <div
              key={index}
              className="flex items-center gap-3 px-3.5 py-2.5 rounded-xl"
            >
              {/* Nav Icon */}
              <div className="w-4 h-4 bg-slate-200 dark:bg-slate-800 rounded shrink-0" />
              {/* Nav Text */}
              <div
                className={`h-4 bg-slate-200 dark:bg-slate-800 rounded-md ${
                  index % 2 === 0 ? 'w-28' : 'w-20'
                }`}
              />
            </div>
          ))}
        </div>
      </div>

      {/* Footer User Profile & Logout Skeleton */}
      <div className="p-4 border-t border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/50">
        <div className="flex items-center justify-between gap-3">
          <div className="flex items-center gap-3 truncate flex-1">
            {/* User Avatar */}
            <div className="w-8 h-8 rounded-full bg-slate-200 dark:bg-slate-800 shrink-0" />
            
            {/* Name and Role Badge */}
            <div className="space-y-1.5 flex-1">
              <div className="h-3.5 w-20 bg-slate-200 dark:bg-slate-800 rounded" />
              <div className="h-3 w-12 bg-slate-200 dark:bg-slate-800 rounded-md" />
            </div>
          </div>

          {/* Logout Button */}
          <div className="w-8 h-8 bg-slate-200 dark:bg-slate-800 rounded-xl shrink-0" />
        </div>
      </div>
    </aside>
  );
}