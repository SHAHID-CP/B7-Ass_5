export default function AddPropertySkeleton() {
  return (
    <div className="max-w-2xl mx-auto px-3.5 sm:px-0 py-4 sm:py-6 animate-pulse">
      <div className="bg-white dark:bg-gray-900 p-4 sm:p-6 rounded-2xl border border-gray-200/80 dark:border-gray-800 shadow-xs space-y-5 sm:space-y-6">
        
        {/* Header Skeleton */}
        <div className="flex items-center justify-between border-b border-gray-100 dark:border-gray-800 pb-4">
          <div className="flex items-center gap-2">
            {/* Icon Skeleton */}
            <div className="w-9 h-9 sm:w-10 sm:h-10 bg-gray-200 dark:bg-gray-800 rounded-xl shrink-0"></div>
            {/* Title & Subtitle Skeleton */}
            <div className="space-y-1.5">
              <div className="h-5 w-40 sm:w-48 bg-gray-200 dark:bg-gray-800 rounded-md"></div>
              <div className="h-3 w-56 sm:w-64 bg-gray-200 dark:bg-gray-800 rounded-md"></div>
            </div>
          </div>
          {/* Back Button Skeleton */}
          <div className="h-8 w-16 bg-gray-200 dark:bg-gray-800 rounded-xl shrink-0"></div>
        </div>

        {/* Form Body Skeleton */}
        <div className="space-y-4">
          
          {/* Title Input Skeleton */}
          <div className="space-y-1.5">
            <div className="h-3 w-24 bg-gray-200 dark:bg-gray-800 rounded"></div>
            <div className="h-10 w-full bg-gray-200 dark:bg-gray-800 rounded-xl"></div>
          </div>

          {/* Category Dropdown Skeleton */}
          <div className="space-y-1.5">
            <div className="h-3 w-20 bg-gray-200 dark:bg-gray-800 rounded"></div>
            <div className="h-10 w-full bg-gray-200 dark:bg-gray-800 rounded-xl"></div>
          </div>

          {/* Location & Price Grid Skeleton */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
            <div className="space-y-1.5">
              <div className="h-3 w-20 bg-gray-200 dark:bg-gray-800 rounded"></div>
              <div className="h-10 w-full bg-gray-200 dark:bg-gray-800 rounded-xl"></div>
            </div>
            <div className="space-y-1.5">
              <div className="h-3 w-28 bg-gray-200 dark:bg-gray-800 rounded"></div>
              <div className="h-10 w-full bg-gray-200 dark:bg-gray-800 rounded-xl"></div>
            </div>
          </div>

          {/* Property Image Input Skeleton */}
          <div className="space-y-1.5">
            <div className="h-3 w-28 bg-gray-200 dark:bg-gray-800 rounded"></div>
            <div className="h-10 w-full bg-gray-200 dark:bg-gray-800 rounded-xl"></div>
          </div>

          {/* Description Textarea Skeleton */}
          <div className="space-y-1.5">
            <div className="h-3 w-24 bg-gray-200 dark:bg-gray-800 rounded"></div>
            <div className="h-28 w-full bg-gray-200 dark:bg-gray-800 rounded-xl"></div>
          </div>

          {/* Submit Button Skeleton */}
          <div className="pt-2">
            <div className="h-10 sm:h-11 w-full bg-gray-200 dark:bg-gray-800 rounded-xl"></div>
          </div>

        </div>
      </div>
    </div>
  );
}