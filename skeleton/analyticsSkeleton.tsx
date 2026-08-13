export default function AnalyticsSkeleton() {
  return (
    <div className="max-w-6xl mx-auto space-y-6 sm:space-y-8 animate-pulse">
      {/* Page Header Skeleton */}
      <div className="space-y-1.5">
        <div className="h-7 sm:h-8 w-64 sm:w-80 bg-slate-200 dark:bg-slate-800 rounded-lg"></div>
        <div className="h-4 w-72 sm:w-96 bg-slate-200 dark:bg-slate-800 rounded-md"></div>
      </div>

      {/* 4 KPI Summary Cards Skeleton */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {[1, 2, 3, 4].map((item) => (
          <div
            key={item}
            className="bg-white dark:bg-slate-900 p-5 rounded-2xl border border-slate-200/80 dark:border-slate-800 shadow-xs flex items-center justify-between"
          >
            <div className="space-y-2">
              <div className="h-3 w-24 bg-slate-200 dark:bg-slate-800 rounded"></div>
              <div className="h-7 w-16 bg-slate-200 dark:bg-slate-800 rounded-md"></div>
            </div>
            {/* Icon Box Skeleton */}
            <div className="w-11 h-11 sm:w-12 sm:h-12 bg-slate-200 dark:bg-slate-800 rounded-xl shrink-0"></div>
          </div>
        ))}
      </div>

      {/* 2 Charts Grid Skeleton */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Chart 1 Skeleton */}
        <div className="bg-white dark:bg-slate-900 p-5 sm:p-6 rounded-2xl border border-slate-200/80 dark:border-slate-800 shadow-xs space-y-6">
          <div className="space-y-1.5">
            <div className="h-4 w-44 bg-slate-200 dark:bg-slate-800 rounded"></div>
            <div className="h-3 w-56 bg-slate-200 dark:bg-slate-800 rounded"></div>
          </div>
          {/* Donut Chart Skeleton Visual */}
          <div className="h-64 w-full flex items-center justify-center">
            <div className="w-44 h-44 rounded-full border-[18px] border-slate-200 dark:border-slate-800"></div>
          </div>
        </div>

        {/* Chart 2 Skeleton */}
        <div className="bg-white dark:bg-slate-900 p-5 sm:p-6 rounded-2xl border border-slate-200/80 dark:border-slate-800 shadow-xs space-y-6">
          <div className="space-y-1.5">
            <div className="h-4 w-36 bg-slate-200 dark:bg-slate-800 rounded"></div>
            <div className="h-3 w-48 bg-slate-200 dark:bg-slate-800 rounded"></div>
          </div>
          {/* Bar Chart Skeleton Visual */}
          <div className="h-64 w-full flex items-end justify-between px-6 pb-2 gap-3">
            <div className="w-full bg-slate-200 dark:bg-slate-800 rounded-t-md h-24"></div>
            <div className="w-full bg-slate-200 dark:bg-slate-800 rounded-t-md h-40"></div>
            <div className="w-full bg-slate-200 dark:bg-slate-800 rounded-t-md h-32"></div>
            <div className="w-full bg-slate-200 dark:bg-slate-800 rounded-t-md h-48"></div>
            <div className="w-full bg-slate-200 dark:bg-slate-800 rounded-t-md h-28"></div>
          </div>
        </div>
      </div>
    </div>
  );
}