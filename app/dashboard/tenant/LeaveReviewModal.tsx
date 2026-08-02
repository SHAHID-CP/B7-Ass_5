'use client';

import { useState } from 'react';
import { submitPropertyReview } from './_action/tenantActions';
import { Star, X, Loader2, CheckCircle2 } from 'lucide-react';
import { toast } from 'sonner';

interface ReviewModalProps {
  isOpen: boolean;
  onClose: () => void;
  property: {
    id: string;
    title: string;
  } | null;
}

export default function LeaveReviewModal({ isOpen, onClose, property }: ReviewModalProps) {
  const [rating, setRating] = useState(5);
  const [hover, setHover] = useState(0);
  const [comment, setComment] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isSuccess, setIsSuccess] = useState(false);

  if (!isOpen || !property) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!comment.trim()) {
      setError('Please write a short review.');
      return;
    }

    setLoading(true);
    setError(null);

    const res = await submitPropertyReview({
      propertyId: property.id,
      rating,
      comment,
    });

    if (res.success) {
      setIsSuccess(true);
      toast.success("Review submit successfully")
    } else {
      setError(res.error || 'Failed to submit review');
      toast.error("Review submit failed")
    }
    setLoading(false);
  };

  const handleClose = () => {
    setIsSuccess(false);
    setError(null);
    setComment('');
    setRating(5);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-xs flex items-center justify-center p-3.5 sm:p-4 z-50">
      {/* Modal Container with Max-Height & Scroll for Small Mobile Screens */}
      <div className="bg-white rounded-2xl max-w-sm sm:max-w-md w-full p-4 sm:p-6 space-y-4 sm:space-y-5 relative shadow-2xl animate-in fade-in zoom-in-95 duration-200 max-h-[90vh] overflow-y-auto">
        
        {/* Close Button */}
        <button
          onClick={handleClose}
          className="absolute top-3.5 right-3.5 sm:top-4 sm:right-4 text-gray-400 hover:text-gray-600 p-1.5 rounded-full hover:bg-gray-100 transition active:scale-95"
          aria-label="Close modal"
        >
          <X className="w-4 h-4 sm:w-5 sm:h-5" />
        </button>

        {isSuccess ? (
          <div className="text-center py-4 sm:py-6 space-y-3 sm:space-y-4">
            <CheckCircle2 className="w-12 h-12 sm:w-16 sm:h-16 text-emerald-500 mx-auto animate-bounce" />
            <div className="space-y-1">
              <h3 className="text-lg sm:text-xl font-bold text-gray-900">Review Submitted!</h3>
              <p className="text-xs sm:text-sm text-gray-600 px-2">
                Thank you for sharing your experience for <span className="font-semibold text-gray-800">{property.title}</span>.
              </p>
            </div>
            <button
              onClick={handleClose}
              className="w-full py-2.5 bg-gray-900 hover:bg-black text-white rounded-xl text-xs sm:text-sm font-semibold transition active:scale-[0.98] shadow-xs"
            >
              Close Window
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-3.5 sm:space-y-4">
            <div>
              <h3 className="text-lg sm:text-xl font-bold text-gray-900 tracking-tight">Leave a Review</h3>
              <p className="text-[11px] sm:text-xs text-gray-500 mt-0.5 truncate">
                Property: <span className="font-semibold text-gray-700">{property.title}</span>
              </p>
            </div>

            {/* Interactive Rating Stars */}
            <div className="space-y-1">
              <label className="text-xs font-semibold text-gray-600">Rating</label>
              <div className="flex gap-1.5 sm:gap-2 items-center">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    type="button"
                    key={star}
                    onClick={() => setRating(star)}
                    onMouseEnter={() => setHover(star)}
                    onMouseLeave={() => setHover(0)}
                    className="p-1 focus:outline-hidden touch-manipulation active:scale-110 transition-transform"
                  >
                    <Star
                      className={`w-7 h-7 cursor-pointer sm:w-8 sm:h-8 transition-colors ${
                        star <= (hover || rating)
                          ? 'text-yellow-400 fill-yellow-400'
                          : 'text-gray-200 hover:text-gray-300'
                      }`}
                    />
                  </button>
                ))}
              </div>
            </div>

            {/* Comment Field */}
            <div className="space-y-1">
              <label className="text-xs font-semibold text-gray-600">Your Feedback</label>
              <textarea
                rows={3}
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                placeholder="Share your experience staying in this apartment..."
                className="w-full text-xs sm:text-sm border border-gray-200 rounded-xl p-2.5 sm:p-3 focus:outline-hidden focus:ring-2 focus:ring-blue-500 text-gray-800 placeholder:text-gray-400 resize-none"
              />
            </div>

            {error && (
              <p className="text-[11px] sm:text-xs text-rose-600 bg-rose-50 p-2 sm:p-2.5 rounded-lg border border-rose-200/60">
                {error}
              </p>
            )}

            <div className="flex gap-2.5 sm:gap-3 pt-1.5 sm:pt-2">
              <button
                type="button"
                onClick={handleClose}
                disabled={loading}
                className="flex-1 cursor-pointer py-2 sm:py-2.5 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-xl text-xs sm:text-sm font-semibold transition active:scale-[0.98]"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={loading}
                className="flex-1 cursor-pointer py-2 sm:py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs sm:text-sm font-semibold transition flex items-center justify-center gap-2 shadow-xs active:scale-[0.98] disabled:opacity-50"
              >
                {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : 'Submit Review'}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}