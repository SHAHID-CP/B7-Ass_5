import React from 'react';

export default function HomeSkeleton() {
  return (
    <div className="min-h-screen space-y-12 pb-12 bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 transition-colors duration-200 animate-pulse">
      
      {/* 1. Hero Section Skeleton */}
      <div className="w-full h-[70vh] min-h-[550px] relative bg-slate-800 dark:bg-slate-900 flex flex-col justify-center items-center px-4 sm:px-8 md:px-16">
        <div className="max-w-5xl w-full mx-auto flex flex-col items-center space-y-5 sm:space-y-6 text-center">
          
          {/* Hero Title Skeleton */}
          <div className="h-10 sm:h-14 md:h-16 bg-slate-700 dark:bg-slate-800 rounded-xl w-3/4 max-w-2xl"></div>
          
          {/* Sub-description Skeleton */}
          <div className="space-y-2 w-full max-w-xl flex flex-col items-center">
            <div className="h-4 sm:h-5 bg-slate-700 dark:bg-slate-800 rounded w-full"></div>
            <div className="h-4 sm:h-5 bg-slate-700 dark:bg-slate-800 rounded w-4/6"></div>
          </div>

          {/* Extra Info Cards Skeleton (4 Grid Cards) */}
          <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-2.5 sm:gap-3.5 w-full max-w-3xl pt-2">
            {[...Array(4)].map((_, index) => (
              <div
                key={index}
                className="h-11 bg-slate-700/60 dark:bg-slate-800/60 backdrop-blur-md rounded-xl border border-slate-700/40"
              ></div>
            ))}
          </div>

          {/* Call to Action Button Skeleton */}
          <div className="pt-2">
            <div className="h-12 w-44 bg-slate-700 dark:bg-slate-800 rounded-xl"></div>
          </div>

        </div>
      </div>

      {/* 2. Category Section Skeleton */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        
        {/* Category Header Skeleton */}
        <div className="text-center space-y-3 max-w-2xl mx-auto mb-10 sm:mb-12 flex flex-col items-center">
          {/* Badge */}
          <div className="h-6 w-28 bg-slate-200 dark:bg-slate-800 rounded-full"></div>
          {/* Title */}
          <div className="h-8 sm:h-10 w-64 bg-slate-200 dark:bg-slate-800 rounded-lg"></div>
          {/* Subtitle */}
          <div className="h-4 w-80 bg-slate-200 dark:bg-slate-800 rounded"></div>
        </div>

        {/* Category Grid Skeleton (5 Columns) */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
          {[...Array(5)].map((_, index) => (
            <div
              key={index}
              className="p-4 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl shadow-xs space-y-3 flex flex-col items-center justify-center h-28"
            >
              {/* Icon Placeholder */}
              <div className="w-7 h-7 bg-slate-200 dark:bg-slate-800 rounded-md"></div>
              {/* Category Name Placeholder */}
              <div className="h-4 w-20 bg-slate-200 dark:bg-slate-800 rounded"></div>
            </div>
          ))}
        </div>

      </section>

    </div>
  );
}