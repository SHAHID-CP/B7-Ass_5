export default function LandlordAnalyticsSkeleton() {
  return (
    <div className="max-w-7xl mx-auto px-3.5 sm:px-6 py-5 sm:py-8 space-y-6 sm:space-y-8 animate-pulse">
      {/* Header Skeleton */}
      <div className="space-y-2">
        <div className="h-7 sm:h-8 w-72 bg-gray-200 dark:bg-gray-800 rounded-lg"></div>
        <div className="h-4 w-96 max-w-full bg-gray-200 dark:bg-gray-800 rounded-md"></div>
      </div>

      {/* KPI Cards Grid Skeleton */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
        {[1, 2, 3, 4].map((item) => (
          <div
            key={item}
            className="bg-white dark:bg-gray-900 p-5 rounded-2xl border border-gray-200/80 dark:border-gray-800 flex items-center justify-between"
          >
            <div className="space-y-2">
              <div className="h-3 w-24 bg-gray-200 dark:bg-gray-800 rounded-md"></div>
              <div className="h-7 w-16 bg-gray-200 dark:bg-gray-800 rounded-lg"></div>
            </div>
            <div className="w-11 h-11 bg-gray-200 dark:bg-gray-800 rounded-xl shrink-0"></div>
          </div>
        ))}
      </div>

      {/* Recharts Charts Grid Skeleton (2 Pie Charts) */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {[1, 2].map((chart) => (
          <div
            key={chart}
            className="bg-white dark:bg-gray-900 p-5 sm:p-6 rounded-2xl border border-gray-200/80 dark:border-gray-800 space-y-4"
          >
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 bg-gray-200 dark:bg-gray-800 rounded-full"></div>
                <div className="h-5 w-44 bg-gray-200 dark:bg-gray-800 rounded-md"></div>
              </div>
              <div className="h-3 w-56 bg-gray-200 dark:bg-gray-800 rounded-md"></div>
            </div>

            {/* Pie Chart Donut Placeholder */}
            <div className="h-64 w-full flex flex-col items-center justify-center gap-4">
              <div className="w-36 h-36 rounded-full border-[18px] border-gray-200 dark:border-gray-800 shrink-0"></div>
              {/* Legend Skeleton */}
              <div className="flex gap-4">
                <div className="h-3 w-16 bg-gray-200 dark:bg-gray-800 rounded-full"></div>
                <div className="h-3 w-16 bg-gray-200 dark:bg-gray-800 rounded-full"></div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Bar Chart Skeleton */}
      <div className="bg-white dark:bg-gray-900 p-5 sm:p-6 rounded-2xl border border-gray-200/80 dark:border-gray-800 space-y-4">
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-gray-200 dark:bg-gray-800 rounded-sm"></div>
            <div className="h-5 w-52 bg-gray-200 dark:bg-gray-800 rounded-md"></div>
          </div>
          <div className="h-3 w-64 bg-gray-200 dark:bg-gray-800 rounded-md"></div>
        </div>

        {/* Bar Chart Visual Placeholder */}
        <div className="h-72 w-full pt-6 flex items-end justify-between gap-2 sm:gap-6 px-4 border-b border-gray-100 dark:border-gray-800">
          <div className="w-full h-[40%] bg-gray-200 dark:bg-gray-800 rounded-t-md"></div>
          <div className="w-full h-[75%] bg-gray-200 dark:bg-gray-800 rounded-t-md"></div>
          <div className="w-full h-[55%] bg-gray-200 dark:bg-gray-800 rounded-t-md"></div>
          <div className="w-full h-[90%] bg-gray-200 dark:bg-gray-800 rounded-t-md"></div>
          <div className="w-full h-[35%] bg-gray-200 dark:bg-gray-800 rounded-t-md"></div>
          <div className="w-full h-[65%] bg-gray-200 dark:bg-gray-800 rounded-t-md"></div>
        </div>
      </div>
    </div>
  );
}