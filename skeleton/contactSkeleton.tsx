export default function ContactSkeleton() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 sm:py-12 space-y-10 animate-pulse">
      {/* Header Skeleton */}
      <div className="text-center space-y-3 max-w-2xl mx-auto flex flex-col items-center">
        {/* Badge Skeleton */}
        <div className="h-6 w-28 bg-slate-200 dark:bg-slate-800 rounded-full" />
        {/* Title Skeleton */}
        <div className="h-8 sm:h-10 w-3/4 sm:w-2/3 bg-slate-200 dark:bg-slate-800 rounded-xl" />
        {/* Subtitle Skeleton */}
        <div className="space-y-1.5 w-full flex flex-col items-center pt-1">
          <div className="h-3.5 w-full bg-slate-200 dark:bg-slate-800 rounded-md" />
          <div className="h-3.5 w-4/5 bg-slate-200 dark:bg-slate-800 rounded-md" />
        </div>
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Contact Info Cards Skeleton */}
        <div className="space-y-4">
          {[...Array(3)].map((_, index) => (
            <div
              key={index}
              className="bg-white dark:bg-slate-900 p-5 rounded-2xl border border-slate-200/80 dark:border-slate-800 shadow-xs flex items-start gap-4"
            >
              {/* Icon Box Skeleton */}
              <div className="w-11 h-11 bg-slate-200 dark:bg-slate-800 rounded-xl shrink-0" />
              {/* Text Skeleton */}
              <div className="space-y-2 flex-1">
                <div className="h-4 w-24 bg-slate-200 dark:bg-slate-800 rounded-md" />
                <div className="h-3 w-36 bg-slate-200 dark:bg-slate-800 rounded" />
                {index < 2 && (
                  <div className="h-3 w-28 bg-slate-200 dark:bg-slate-800 rounded" />
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Form Area Skeleton */}
        <div className="lg:col-span-2 bg-white dark:bg-slate-900 p-6 sm:p-8 rounded-2xl border border-slate-200/80 dark:border-slate-800 shadow-xs space-y-5">
          {/* Form Title Skeleton */}
          <div className="h-5 w-36 bg-slate-200 dark:bg-slate-800 rounded-md" />

          {/* Form Inputs Skeleton */}
          <div className="space-y-4">
            {/* Name & Email Fields Row */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <div className="h-3 w-16 bg-slate-200 dark:bg-slate-800 rounded" />
                <div className="h-10 w-full bg-slate-200 dark:bg-slate-800 rounded-xl" />
              </div>
              <div className="space-y-1.5">
                <div className="h-3 w-16 bg-slate-200 dark:bg-slate-800 rounded" />
                <div className="h-10 w-full bg-slate-200 dark:bg-slate-800 rounded-xl" />
              </div>
            </div>

            {/* Subject Field */}
            <div className="space-y-1.5">
              <div className="h-3 w-14 bg-slate-200 dark:bg-slate-800 rounded" />
              <div className="h-10 w-full bg-slate-200 dark:bg-slate-800 rounded-xl" />
            </div>

            {/* Message Field Textarea */}
            <div className="space-y-1.5">
              <div className="h-3 w-16 bg-slate-200 dark:bg-slate-800 rounded" />
              <div className="h-28 w-full bg-slate-200 dark:bg-slate-800 rounded-xl" />
            </div>

            {/* Submit Button Skeleton */}
            <div className="h-10 w-full sm:w-36 bg-slate-200 dark:bg-slate-800 rounded-xl pt-2" />
          </div>
        </div>
      </div>
    </div>
  );
}