export default function AboutSkeleton() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 sm:py-12 space-y-12 sm:space-y-16 animate-pulse">
      {/* Hero Section Skeleton */}
      <div className="text-center space-y-4 max-w-3xl mx-auto flex flex-col items-center">
        {/* Badge */}
        <div className="h-6 w-36 bg-slate-200 dark:bg-slate-800 rounded-full" />
        {/* Title */}
        <div className="h-8 sm:h-10 w-4/5 sm:w-3/4 bg-slate-200 dark:bg-slate-800 rounded-xl" />
        {/* Description */}
        <div className="space-y-2 w-full flex flex-col items-center pt-1">
          <div className="h-3.5 sm:h-4 w-full bg-slate-200 dark:bg-slate-800 rounded-md" />
          <div className="h-3.5 sm:h-4 w-5/6 bg-slate-200 dark:bg-slate-800 rounded-md" />
        </div>
      </div>

      {/* Metrics/Stats Section Skeleton */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
        {[...Array(4)].map((_, idx) => (
          <div
            key={idx}
            className="bg-white dark:bg-slate-900 p-5 sm:p-6 rounded-2xl border border-slate-200/80 dark:border-slate-800 shadow-xs flex flex-col items-center space-y-2"
          >
            {/* Stat Value */}
            <div className="h-7 sm:h-9 w-20 bg-slate-200 dark:bg-slate-800 rounded-lg" />
            {/* Stat Label */}
            <div className="h-3.5 sm:h-4 w-24 bg-slate-200 dark:bg-slate-800 rounded-md" />
          </div>
        ))}
      </div>

      {/* Features Grid Skeleton */}
      <div className="space-y-6 sm:space-y-8">
        {/* Section Header */}
        <div className="text-center space-y-2 flex flex-col items-center">
          <div className="h-6 sm:h-7 w-40 bg-slate-200 dark:bg-slate-800 rounded-lg" />
          <div className="h-3.5 w-64 bg-slate-200 dark:bg-slate-800 rounded-md" />
        </div>

        {/* Feature Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[...Array(3)].map((_, idx) => (
            <div
              key={idx}
              className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200/80 dark:border-slate-800 shadow-xs space-y-3"
            >
              {/* Icon Box */}
              <div className="w-12 h-12 bg-slate-200 dark:bg-slate-800 rounded-xl shrink-0" />
              {/* Title */}
              <div className="h-5 w-36 bg-slate-200 dark:bg-slate-800 rounded-md" />
              {/* Description */}
              <div className="space-y-2 pt-1">
                <div className="h-3.5 w-full bg-slate-200 dark:bg-slate-800 rounded" />
                <div className="h-3.5 w-4/5 bg-slate-200 dark:bg-slate-800 rounded" />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Call To Action Banner Skeleton */}
      <div className="bg-slate-200 dark:bg-slate-800/80 rounded-3xl p-6 sm:p-10 text-center space-y-4 flex flex-col items-center">
        <div className="h-6 sm:h-8 w-64 sm:w-80 bg-slate-300 dark:bg-slate-700 rounded-xl" />
        <div className="h-3.5 sm:h-4 w-full sm:w-96 bg-slate-300 dark:bg-slate-700 rounded-md" />
        <div className="h-10 w-40 bg-slate-300 dark:bg-slate-700 rounded-xl pt-2" />
      </div>
    </div>
  );
}