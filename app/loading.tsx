import { Loader2 } from 'lucide-react';

export default function Loading() {
  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center space-y-3">
      <Loader2 className="w-10 h-10 text-emerald-600 dark:text-emerald-400 animate-spin" />
      <p className="text-sm font-medium text-gray-500 dark:text-gray-400 animate-pulse">
        Loading RentNest...
      </p>
    </div>
  );
}