export default function MyPropertiesSkeleton() {
  return (
    <div className="max-w-6xl mx-auto px-3.5 sm:px-6 py-5 sm:py-8 space-y-5 sm:space-y-6 animate-pulse">
      
      {/* Top Header Skeleton */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-4 border-b border-gray-100 dark:border-gray-800 pb-4 sm:pb-5">
        <div className="space-y-2">
          <div className="h-7 w-48 bg-gray-200 dark:bg-gray-800 rounded-lg"></div>
          <div className="h-4 w-72 bg-gray-200 dark:bg-gray-800 rounded-md"></div>
        </div>
      </div>

      {/* Stats Grid Skeleton */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3.5 sm:gap-5">
        {[1, 2, 3].map((item) => (
          <div 
            key={item} 
            className="bg-white dark:bg-gray-900 border border-gray-200/80 dark:border-gray-800 rounded-2xl p-4 sm:p-5 space-y-4"
          >
            <div className="flex items-center justify-between">
              <div className="h-3 w-28 bg-gray-200 dark:bg-gray-800 rounded-md"></div>
              <div className="w-9 h-9 bg-gray-200 dark:bg-gray-800 rounded-xl"></div>
            </div>
            <div className="flex items-baseline justify-between pt-1">
              <div className="h-8 w-20 bg-gray-200 dark:bg-gray-800 rounded-lg"></div>
              <div className="h-4 w-12 bg-gray-200 dark:bg-gray-800 rounded-full"></div>
            </div>
          </div>
        ))}
      </div>

      {/* Section Header Skeleton */}
      <div className="flex items-center justify-between border-b border-gray-100 dark:border-gray-800 pb-4">
        <div className="flex items-center gap-2.5">
          <div className="w-10 h-10 bg-gray-200 dark:bg-gray-800 rounded-xl"></div>
          <div className="space-y-1.5">
            <div className="h-6 w-36 bg-gray-200 dark:bg-gray-800 rounded-md"></div>
            <div className="h-3.5 w-48 bg-gray-200 dark:bg-gray-800 rounded-md"></div>
          </div>
        </div>
        <div className="h-9 w-28 bg-gray-200 dark:bg-gray-800 rounded-xl"></div>
      </div>

      {/* Main Container / Table Skeleton */}
      <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-200/80 dark:border-gray-800 overflow-hidden shadow-xs">
        
        {/* Mobile View Skeleton */}
        <div className="block md:hidden divide-y divide-gray-100 dark:divide-gray-800">
          {[1, 2, 3].map((i) => (
            <div key={i} className="p-4 space-y-3">
              <div className="flex gap-3">
                <div className="w-16 h-16 bg-gray-200 dark:bg-gray-800 rounded-xl shrink-0"></div>
                <div className="flex-1 space-y-2">
                  <div className="h-4 w-3/4 bg-gray-200 dark:bg-gray-800 rounded-md"></div>
                  <div className="h-3 w-1/2 bg-gray-200 dark:bg-gray-800 rounded-md"></div>
                  <div className="flex items-center justify-between pt-1">
                    <div className="h-4 w-12 bg-gray-200 dark:bg-gray-800 rounded-md"></div>
                    <div className="h-4 w-16 bg-gray-200 dark:bg-gray-800 rounded-md"></div>
                  </div>
                </div>
              </div>
              <div className="flex items-center justify-between pt-2 border-t border-gray-50 dark:border-gray-800">
                <div className="h-5 w-20 bg-gray-200 dark:bg-gray-800 rounded-full"></div>
                <div className="flex gap-2">
                  <div className="w-7 h-7 bg-gray-200 dark:bg-gray-800 rounded-lg"></div>
                  <div className="w-7 h-7 bg-gray-200 dark:bg-gray-800 rounded-lg"></div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Desktop Table View Skeleton */}
        <div className="hidden md:block overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-gray-50/80 dark:bg-gray-800/60 border-b border-gray-100 dark:border-gray-800">
              <tr>
                <th className="p-3.5"><div className="h-3 w-20 bg-gray-200 dark:bg-gray-700 rounded"></div></th>
                <th className="p-3.5"><div className="h-3 w-16 bg-gray-200 dark:bg-gray-700 rounded"></div></th>
                <th className="p-3.5"><div className="h-3 w-12 bg-gray-200 dark:bg-gray-700 rounded"></div></th>
                <th className="p-3.5"><div className="h-3 w-20 bg-gray-200 dark:bg-gray-700 rounded"></div></th>
                <th className="p-3.5"><div className="h-3 w-16 bg-gray-200 dark:bg-gray-700 rounded"></div></th>
                <th className="p-3.5 text-right"><div className="h-3 w-12 bg-gray-200 dark:bg-gray-700 rounded ml-auto"></div></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 dark:divide-gray-800">
              {[1, 2, 3, 4, 5].map((row) => (
                <tr key={row}>
                  <td className="p-3.5">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-gray-200 dark:bg-gray-800 rounded-lg shrink-0"></div>
                      <div className="h-4 w-36 bg-gray-200 dark:bg-gray-800 rounded-md"></div>
                    </div>
                  </td>
                  <td className="p-3.5"><div className="h-3.5 w-28 bg-gray-200 dark:bg-gray-800 rounded-md"></div></td>
                  <td className="p-3.5"><div className="h-4 w-14 bg-gray-200 dark:bg-gray-800 rounded-md"></div></td>
                  <td className="p-3.5"><div className="h-5 w-20 bg-gray-200 dark:bg-gray-800 rounded-full"></div></td>
                  <td className="p-3.5"><div className="h-5 w-16 bg-gray-200 dark:bg-gray-800 rounded-full"></div></td>
                  <td className="p-3.5">
                    <div className="flex items-center justify-end gap-2">
                      <div className="w-7 h-7 bg-gray-200 dark:bg-gray-800 rounded-lg"></div>
                      <div className="w-7 h-7 bg-gray-200 dark:bg-gray-800 rounded-lg"></div>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination Skeleton */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 px-4 py-3 border-t border-gray-100 dark:border-gray-800 bg-gray-50/50 dark:bg-gray-800/30">
          <div className="h-3.5 w-44 bg-gray-200 dark:bg-gray-800 rounded-md"></div>
          <div className="flex items-center gap-1.5">
            <div className="w-8 h-8 bg-gray-200 dark:bg-gray-800 rounded-lg"></div>
            <div className="w-8 h-8 bg-gray-200 dark:bg-gray-800 rounded-lg"></div>
            <div className="w-8 h-8 bg-gray-200 dark:bg-gray-800 rounded-lg"></div>
          </div>
        </div>

      </div>
    </div>
  );
}