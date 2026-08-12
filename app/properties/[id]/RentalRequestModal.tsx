'use client';

import { useState } from 'react';
import { createRentalRequests } from '../_action/publicPropertyActions';
import { Loader2, Send, X, CheckCircle2, Building2, MapPin } from 'lucide-react';
import { toast } from 'sonner';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  property: {
    id: string;
    title: string;
    location: string;
    price: number;
  };
}

export default function RentalRequestModal({ isOpen, onClose, property }: ModalProps) {
  const [loading, setLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleSubmit = async () => {
    setLoading(true);
    setError(null);

    const res = await createRentalRequests(property.id);

    if (res.success) {
      setIsSuccess(true);
      toast.success("Submitted your Rental Request successfully!");
    } else {
      setError(res.error || 'Failed to send request');
      toast.error("Failed to submit Rental Request");
    }

    setLoading(false);
  };

  const handleClose = () => {
    setIsSuccess(false);
    setError(null);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-slate-950/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4 z-50">
      <div className="bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 rounded-2xl max-w-md w-full p-4 sm:p-6 space-y-4 sm:space-y-5 relative shadow-2xl animate-in fade-in zoom-in-95 duration-200 max-h-[90vh] overflow-y-auto">
        
        {/* Close Button */}
        <button
          onClick={handleClose}
          className="absolute top-3 right-3 sm:top-4 sm:right-4 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 p-1.5 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 transition cursor-pointer"
          aria-label="Close"
        >
          <X className="w-5 h-5" />
        </button>

        {isSuccess ? (
          /* Success Message View */
          <div className="text-center py-4 sm:py-6 space-y-3 sm:space-y-4">
            <CheckCircle2 className="w-12 h-12 sm:w-16 sm:h-16 text-emerald-500 mx-auto animate-bounce" />
            <h3 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-slate-100">Request Sent Successfully!</h3>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400">
              Your application for <span className="font-semibold text-slate-800 dark:text-slate-200">{property.title}</span> has been submitted. The landlord will review it soon.
            </p>
            <button
              onClick={handleClose}
              className="w-full py-2.5 bg-slate-900 hover:bg-slate-800 dark:bg-slate-100 dark:hover:bg-white dark:text-slate-900 text-white rounded-xl text-xs sm:text-sm font-semibold transition mt-2 cursor-pointer"
            >
              Close Window
            </button>
          </div>
        ) : (
          /* Form Request Confirmation View */
          <div className="space-y-3 sm:space-y-4 pt-1">
            <h2 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-slate-100 flex items-center gap-2 pr-6">
              <Send className="w-4 h-4 sm:w-5 sm:h-5 text-emerald-600 dark:text-emerald-500 shrink-0" /> Confirm Rental Request
            </h2>

            <p className="text-xs text-slate-500 dark:text-slate-400">
              Are you sure you want to apply for renting this property?
            </p>

            {/* Property Brief Summary Card */}
            <div className="bg-emerald-50/50 dark:bg-emerald-950/30 border border-emerald-100 dark:border-emerald-900/50 rounded-xl p-3 sm:p-4 space-y-2">
              <div className="flex items-start gap-2.5 sm:gap-3">
                <Building2 className="w-4 h-4 sm:w-5 sm:h-5 text-emerald-600 dark:text-emerald-500 mt-0.5 shrink-0" />
                <div className="min-w-0 flex-1">
                  <h4 className="font-bold text-slate-900 dark:text-slate-100 text-xs sm:text-sm truncate">{property.title}</h4>
                  <p className="text-[11px] sm:text-xs text-slate-500 dark:text-slate-400 flex items-center gap-1 mt-0.5 truncate">
                    <MapPin className="w-3 h-3 text-slate-400 shrink-0" /> {property.location}
                  </p>
                </div>
              </div>
              <div className="border-t border-emerald-100/80 dark:border-emerald-900/40 pt-2 flex justify-between items-center text-xs">
                <span className="text-slate-500 dark:text-slate-400 font-medium">Monthly Rent:</span>
                <span className="font-extrabold text-emerald-600 dark:text-emerald-400 text-xs sm:text-sm">৳{property.price}</span>
              </div>
            </div>

            {error && (
              <div className="p-2.5 sm:p-3 bg-rose-50 dark:bg-rose-950/40 text-rose-600 dark:text-rose-400 border border-rose-200 dark:border-rose-900/50 rounded-xl text-xs font-medium">
                {error}
              </div>
            )}

            <div className="flex flex-col-reverse sm:flex-row gap-2 sm:gap-3 pt-2">
              <button
                type="button"
                onClick={handleClose}
                disabled={loading}
                className="cursor-pointer w-full sm:flex-1 py-2.5 bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 rounded-xl text-xs sm:text-sm font-semibold transition"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleSubmit}
                disabled={loading}
                className="cursor-pointer w-full sm:flex-1 py-2.5 bg-emerald-600 hover:bg-emerald-700 active:scale-95 text-white rounded-xl text-xs sm:text-sm font-semibold transition flex items-center justify-center gap-2 shadow-xs disabled:opacity-50"
              >
                {loading ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" /> Submitting...
                  </>
                ) : (
                  'Submit Request'
                )}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}