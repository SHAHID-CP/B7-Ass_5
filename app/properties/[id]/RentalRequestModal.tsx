'use client';

import { useState } from 'react';
import { createRentalRequests } from '../_action/publicPropertyActions';
import { Loader2, Send, X, CheckCircle2, Building2, MapPin } from 'lucide-react';

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
    } else {
      setError(res.error || 'Failed to send request');
    }

    setLoading(false);
  };

  const handleClose = () => {
    setIsSuccess(false);
    setError(null);
    onClose();
  };

  return (
    /* Background Overlay - Padding p-3 বা p-4 নিশ্চিত করে যে মোডাল স্ক্রিনের বর্ডারে লেগে যাবে না */
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center p-3 sm:p-4 z-50">
      {/* 
        Modal Container Changes:
        1. p-4 sm:p-6 (মোবাইলে কম প্যাডিং)
        2. max-h-[90vh] overflow-y-auto (ছোট স্ক্রিনে স্ক্রল করার সুবিধা)
      */}
      <div className="bg-white rounded-2xl max-w-md w-full p-4 sm:p-6 space-y-4 sm:space-y-5 relative shadow-2xl animate-in fade-in zoom-in-95 duration-200 max-h-[90vh] overflow-y-auto">
        
        {/* Close Button */}
        <button
          onClick={handleClose}
          className="absolute top-3 right-3 sm:top-4 sm:right-4 text-gray-400 hover:text-gray-600 p-1.5 rounded-full hover:bg-gray-100 transition"
          aria-label="Close"
        >
          <X className="w-5 h-5" />
        </button>

        {isSuccess ? (
          /* Success Message View */
          <div className="text-center py-4 sm:py-6 space-y-3 sm:space-y-4">
            <CheckCircle2 className="w-12 h-12 sm:w-16 sm:h-16 text-green-500 mx-auto animate-bounce" />
            <h3 className="text-lg sm:text-xl font-bold text-gray-900">Request Sent Successfully!</h3>
            <p className="text-xs sm:text-sm text-gray-600">
              Your application for <span className="font-semibold text-gray-800">{property.title}</span> has been submitted. The landlord will review it soon.
            </p>
            <button
              onClick={handleClose}
              className="w-full py-2.5 bg-gray-900 hover:bg-black text-white rounded-xl text-xs sm:text-sm font-semibold transition mt-2"
            >
              Close Window
            </button>
          </div>
        ) : (
          /* Form Request Confirmation View */
          <div className="space-y-3 sm:space-y-4 pt-1">
            <h2 className="text-lg sm:text-xl font-bold text-gray-900 flex items-center gap-2 pr-6">
              <Send className="w-4 h-4 sm:w-5 sm:h-5 text-blue-600 shrink-0" /> Confirm Rental Request
            </h2>

            <p className="text-xs text-gray-500">
              Are you sure you want to apply for renting this property?
            </p>

            {/* Property Brief Summary Card */}
            <div className="bg-blue-50/60 border border-blue-100 rounded-xl p-3 sm:p-4 space-y-2">
              <div className="flex items-start gap-2.5 sm:gap-3">
                <Building2 className="w-4 h-4 sm:w-5 sm:h-5 text-blue-600 mt-0.5 shrink-0" />
                <div className="min-w-0 flex-1">
                  <h4 className="font-bold text-gray-900 text-xs sm:text-sm truncate">{property.title}</h4>
                  <p className="text-[11px] sm:text-xs text-gray-500 flex items-center gap-1 mt-0.5 truncate">
                    <MapPin className="w-3 h-3 text-gray-400 shrink-0" /> {property.location}
                  </p>
                </div>
              </div>
              <div className="border-t border-blue-100 pt-2 flex justify-between items-center text-xs">
                <span className="text-gray-500 font-medium">Monthly Rent:</span>
                <span className="font-extrabold text-blue-700 text-xs sm:text-sm">৳{property.price}</span>
              </div>
            </div>

            {error && (
              <div className="p-2.5 sm:p-3 bg-red-50 text-red-600 border border-red-200 rounded-xl text-xs font-medium">
                {error}
              </div>
            )}

            {/* Action Buttons - মোবাইলে Flex Row ও কাস্টম হাইট যুক্ত */}
            <div className="flex flex-col-reverse sm:flex-row gap-2 sm:gap-3 pt-2">
              <button
                type="button"
                onClick={handleClose}
                disabled={loading}
                className="w-full sm:flex-1 py-2.5 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-xl text-xs sm:text-sm font-semibold transition"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleSubmit}
                disabled={loading}
                className="w-full sm:flex-1 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs sm:text-sm font-semibold transition flex items-center justify-center gap-2 shadow-lg shadow-blue-500/20 disabled:opacity-50"
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