import React from 'react';

export default function PropertyDetailsSkeleton() {
  return (
    <div className="max-w-5xl mx-auto p-4 sm:p-6 space-y-6 sm:space-y-8 animate-pulse">
      
      {/* 1. Title & Header Skeleton */}
      <div className="space-y-2">
        {/* Category Badge */}
        <div className="h-6 w-24 bg-slate-200 dark:bg-slate-800 rounded-full"></div>
        {/* Main Title */}
        <div className="h-7 sm:h-9 md:h-10 w-3/4 max-w-xl bg-slate-200 dark:bg-slate-800 rounded-xl"></div>
        {/* Location */}
        <div className="h-4 w-40 bg-slate-200 dark:bg-slate-800 rounded-md"></div>
      </div>

      {/* 2. Hero Image Skeleton */}
      <div className="h-52 sm:h-64 md:h-80 bg-slate-200 dark:bg-slate-800 rounded-2xl w-full border border-slate-200/80 dark:border-slate-800"></div>

      {/* 3. Main Grid Layout */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
        
        {/* Left Side: About & Reviews */}
        <div className="md:col-span-2 space-y-4 sm:space-y-6">
          
          {/* About Box */}
          <div className="bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 rounded-2xl p-4 sm:p-6 space-y-3">
            <div className="h-5 w-36 bg-slate-200 dark:bg-slate-800 rounded-md"></div>
            <div className="space-y-2 pt-1">
              <div className="h-3.5 bg-slate-200 dark:bg-slate-800 rounded w-full"></div>
              <div className="h-3.5 bg-slate-200 dark:bg-slate-800 rounded w-11/12"></div>
              <div className="h-3.5 bg-slate-200 dark:bg-slate-800 rounded w-4/5"></div>
            </div>
          </div>

          {/* Reviews Box Skeleton */}
          <div className="bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 rounded-2xl p-4 sm:p-6 space-y-4">
            <div className="h-5 w-44 bg-slate-200 dark:bg-slate-800 rounded-md"></div>
            
            {/* Review Cards (2 items) */}
            <div className="space-y-3">
              {[...Array(2)].map((_, i) => (
                <div 
                  key={i} 
                  className="p-3.5 bg-slate-50 dark:bg-slate-800/50 rounded-xl space-y-2 border border-slate-100 dark:border-slate-800"
                >
                  <div className="flex justify-between items-center">
                    <div className="h-4 w-28 bg-slate-200 dark:bg-slate-800 rounded"></div>
                    <div className="h-4 w-12 bg-slate-200 dark:bg-slate-800 rounded"></div>
                  </div>
                  <div className="h-3 bg-slate-200 dark:bg-slate-800 rounded w-3/4"></div>
                </div>
              ))}
            </div>
          </div>

        </div>

        {/* Right Side: CTA & Landlord Box */}
        <div className="space-y-4 sm:space-y-6">
          
          {/* Price & CTA Box */}
          <div className="bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 rounded-2xl p-4 sm:p-6 space-y-5">
            {/* Price */}
            <div className="flex justify-center items-center gap-2 pb-4 border-b border-slate-100 dark:border-slate-800">
              <div className="h-8 w-28 bg-slate-200 dark:bg-slate-800 rounded-lg"></div>
            </div>

            {/* Availability */}
            <div className="flex justify-between items-center">
              <div className="h-4 w-20 bg-slate-200 dark:bg-slate-800 rounded"></div>
              <div className="h-4 w-20 bg-slate-200 dark:bg-slate-800 rounded"></div>
            </div>

            {/* CTA Button */}
            <div className="h-11 w-full bg-slate-200 dark:bg-slate-800 rounded-xl"></div>
          </div>

          {/* Landlord Info Box */}
          <div className="bg-slate-50 dark:bg-slate-900/60 border border-slate-200/80 dark:border-slate-800 rounded-2xl p-3.5 sm:p-4 flex items-center gap-3">
            <div className="w-9 h-9 bg-slate-200 dark:bg-slate-800 rounded-full shrink-0"></div>
            <div className="space-y-1.5 flex-1">
              <div className="h-3 w-24 bg-slate-200 dark:bg-slate-800 rounded"></div>
              <div className="h-4 w-32 bg-slate-200 dark:bg-slate-800 rounded"></div>
            </div>
          </div>

        </div>

      </div>

    </div>
  );
}