export default function ManageRequestsSkeleton() {
  return (
    <div className="max-w-7xl mx-auto px-3.5 sm:px-6 py-5 sm:py-8 space-y-5 sm:space-y-6 animate-pulse">
      {/* Header Skeleton */}
      <div className="flex items-center gap-3 pb-4 border-b border-gray-100 dark:border-gray-800">
        <div className="w-9 h-9 sm:w-10 sm:h-10 bg-gray-200 dark:bg-gray-800 rounded-xl shrink-0"></div>
        <div className="space-y-2">
          <div className="h-6 w-52 sm:w-64 bg-gray-200 dark:bg-gray-800 rounded-lg"></div>
          <div className="h-3 w-64 sm:w-80 max-w-full bg-gray-200 dark:bg-gray-800 rounded-md"></div>
        </div>
      </div>

      {/* Main Content Area Skeleton Container */}
      <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-200/80 dark:border-gray-800 shadow-xs overflow-hidden">
        
        {/* Mobile View Skeleton: Cards (4 Items) */}
        <div className="block md:hidden divide-y divide-gray-100 dark:divide-gray-800">
          {[1, 2, 3, 4].map((item) => (
            <div key={item} className="p-4 space-y-3">
              <div className="flex items-start justify-between gap-2">
                <div className="space-y-1.5 flex-1">
                  <div className="h-4 w-3/4 bg-gray-200 dark:bg-gray-800 rounded-md"></div>
                  <div className="h-3 w-1/2 bg-gray-200 dark:bg-gray-800 rounded-md"></div>
                </div>
                <div className="h-5 w-16 bg-gray-200 dark:bg-gray-800 rounded-md shrink-0"></div>
              </div>

              <div className="flex items-center justify-between pt-1">
                <div className="h-4 w-16 bg-gray-200 dark:bg-gray-800 rounded-md"></div>
                <div className="h-3 w-28 bg-gray-200 dark:bg-gray-800 rounded-md"></div>
              </div>

              <div className="flex items-center justify-between pt-2.5 border-t border-gray-50 dark:border-gray-800 gap-2">
                <div className="h-7 w-20 bg-gray-200 dark:bg-gray-800 rounded-lg"></div>
                <div className="flex gap-1.5">
                  <div className="h-7 w-20 bg-gray-200 dark:bg-gray-800 rounded-lg"></div>
                  <div className="h-7 w-16 bg-gray-200 dark:bg-gray-800 rounded-lg"></div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Desktop View Skeleton: Table */}
        <div className="hidden md:block overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-gray-50/80 dark:bg-gray-800/50 border-b border-gray-100 dark:border-gray-800">
              <tr>
                <th className="py-3.5 px-4"><div className="h-3 w-24 bg-gray-200 dark:bg-gray-800 rounded"></div></th>
                <th className="py-3.5 px-4"><div className="h-3 w-20 bg-gray-200 dark:bg-gray-800 rounded"></div></th>
                <th className="py-3.5 px-4"><div className="h-3 w-12 bg-gray-200 dark:bg-gray-800 rounded"></div></th>
                <th className="py-3.5 px-4"><div className="h-3 w-20 bg-gray-200 dark:bg-gray-800 rounded"></div></th>
                <th className="py-3.5 px-4"><div className="h-3 w-24 bg-gray-200 dark:bg-gray-800 rounded"></div></th>
                <th className="py-3.5 px-4"><div className="h-3 w-16 bg-gray-200 dark:bg-gray-800 rounded"></div></th>
                <th className="py-3.5 px-4 text-center"><div className="h-3 w-20 bg-gray-200 dark:bg-gray-800 rounded mx-auto"></div></th>
                <th className="py-3.5 px-4 text-center"><div className="h-3 w-20 bg-gray-200 dark:bg-gray-800 rounded mx-auto"></div></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 dark:divide-gray-800">
              {[1, 2, 3, 4, 5].map((row) => (
                <tr key={row}>
                  <td className="py-4 px-4"><div className="h-4 w-36 bg-gray-200 dark:bg-gray-800 rounded-md"></div></td>
                  <td className="py-4 px-4"><div className="h-3 w-28 bg-gray-200 dark:bg-gray-800 rounded-md"></div></td>
                  <td className="py-4 px-4"><div className="h-4 w-16 bg-gray-200 dark:bg-gray-800 rounded-md"></div></td>
                  <td className="py-4 px-4"><div className="h-5 w-16 bg-gray-200 dark:bg-gray-800 rounded-full"></div></td>
                  <td className="py-4 px-4"><div className="h-3 w-28 bg-gray-200 dark:bg-gray-800 rounded-md"></div></td>
                  <td className="py-4 px-4"><div className="h-5 w-20 bg-gray-200 dark:bg-gray-800 rounded-full"></div></td>
                  <td className="py-4 px-4"><div className="h-7 w-20 bg-gray-200 dark:bg-gray-800 rounded-lg mx-auto"></div></td>
                  <td className="py-4 px-4">
                    <div className="flex justify-center items-center gap-1.5">
                      <div className="h-7 w-20 bg-gray-200 dark:bg-gray-800 rounded-lg"></div>
                      <div className="h-7 w-16 bg-gray-200 dark:bg-gray-800 rounded-lg"></div>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination Skeleton */}
        <div className="px-4 py-3 bg-gray-50/50 dark:bg-gray-800/50 border-t border-gray-100 dark:border-gray-800 flex items-center justify-between">
          <div className="h-3 w-40 bg-gray-200 dark:bg-gray-800 rounded-md"></div>
          <div className="flex items-center gap-1.5">
            <div className="w-7 h-7 bg-gray-200 dark:bg-gray-800 rounded-lg"></div>
            <div className="w-7 h-7 bg-gray-200 dark:bg-gray-800 rounded-lg"></div>
            <div className="w-7 h-7 bg-gray-200 dark:bg-gray-800 rounded-lg"></div>
          </div>
        </div>

      </div>
    </div>
  );
}