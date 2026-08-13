import React from 'react';

export default function ProfileSkeleton() {
  return (
    <div className="max-w-4xl mx-auto space-y-6 animate-pulse">
      
      {/* 1. Header Skeleton */}
      <div className="flex items-center justify-between">
        <div className="space-y-1.5">
          <div className="h-7 w-36 bg-slate-200 dark:bg-slate-800 rounded-lg"></div>
          <div className="h-4 w-64 bg-slate-200 dark:bg-slate-800 rounded-md"></div>
        </div>
        {/* Edit Button Placeholder */}
        <div className="h-10 w-32 bg-slate-200 dark:bg-slate-800 rounded-xl"></div>
      </div>

      {/* 2. Main Profile Card Skeleton */}
      <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/80 dark:border-slate-800 overflow-hidden shadow-xs">
        
        {/* Cover Banner Skeleton */}
        <div className="h-32 sm:h-44 bg-slate-200 dark:bg-slate-800/80"></div>

        {/* Profile Info Area Skeleton */}
        <div className="px-4 sm:px-6 pb-6 relative">
          
          {/* Avatar Placeholder */}
          <div className="flex justify-center sm:justify-start -mt-12 sm:-mt-16 mb-4">
            <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-full border-4 border-white dark:border-slate-900 bg-slate-300 dark:bg-slate-700 shrink-0"></div>
          </div>

          {/* User Name & Status Row Skeleton */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 dark:border-slate-800 pb-4 mb-5">
            <div className="flex justify-center sm:justify-start">
              <div className="h-7 sm:h-8 w-44 bg-slate-200 dark:bg-slate-800 rounded-lg"></div>
            </div>

            {/* Badges Placeholder */}
            <div className="flex justify-center sm:justify-end gap-2">
              <div className="h-6 w-16 bg-slate-200 dark:bg-slate-800 rounded-full"></div>
              <div className="h-6 w-20 bg-slate-200 dark:bg-slate-800 rounded-full"></div>
            </div>
          </div>

          {/* 4 Details Grid Blocks Skeleton */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[...Array(4)].map((_, i) => (
              <div
                key={i}
                className="flex items-center gap-3 p-3.5 bg-slate-50 dark:bg-slate-800/40 rounded-xl border border-slate-100 dark:border-slate-800/60"
              >
                {/* Icon Placeholder */}
                <div className="w-10 h-10 bg-slate-200 dark:bg-slate-800 rounded-lg shrink-0"></div>
                
                {/* Text Content Placeholders */}
                <div className="space-y-1.5 flex-1 min-w-0">
                  <div className="h-3 w-20 bg-slate-200 dark:bg-slate-800 rounded"></div>
                  <div className="h-4 w-36 bg-slate-200 dark:bg-slate-800 rounded"></div>
                </div>
              </div>
            ))}
          </div>

        </div>
      </div>

    </div>
  );
}