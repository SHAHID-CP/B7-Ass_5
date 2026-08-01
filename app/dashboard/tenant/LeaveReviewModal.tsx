'use client';

import { useState } from 'react';
import { submitPropertyReview } from './_action/tenantActions';
import { Star, X, Loader2, CheckCircle2 } from 'lucide-react';

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
    } else {
      setError(res.error || 'Failed to submit review');
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
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-2xl max-w-md w-full p-6 space-y-5 relative shadow-2xl animate-in fade-in zoom-in-95 duration-200">
        
        <button
          onClick={handleClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 p-1.5 rounded-full hover:bg-gray-100 transition"
        >
          <X className="w-5 h-5" />
        </button>

        {isSuccess ? (
          <div className="text-center py-6 space-y-4">
            <CheckCircle2 className="w-16 h-16 text-green-500 mx-auto animate-bounce" />
            <h3 className="text-xl font-bold text-gray-900">Review Submitted!</h3>
            <p className="text-sm text-gray-600">
              Thank you for sharing your experience for <span className="font-semibold">{property.title}</span>.
            </p>
            <button
              onClick={handleClose}
              className="w-full py-2.5 bg-gray-900 hover:bg-black text-white rounded-xl text-sm font-semibold transition"
            >
              Close Window
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <h3 className="text-xl font-bold text-gray-900">Leave a Review</h3>
              <p className="text-xs text-gray-500 mt-1">
                Property: <span className="font-semibold text-gray-700">{property.title}</span>
              </p>
            </div>

            {/* Interactive Rating Stars */}
            <div className="space-y-1">
              <label className="text-xs font-semibold text-gray-600">Rating</label>
              <div className="flex gap-2">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    type="button"
                    key={star}
                    onClick={() => setRating(star)}
                    onMouseEnter={() => setHover(star)}
                    onMouseLeave={() => setHover(0)}
                    className="p-1 focus:outline-none"
                  >
                    <Star
                      className={`w-7 h-7 transition-colors ${
                        star <= (hover || rating)
                          ? 'text-yellow-400 fill-yellow-400'
                          : 'text-gray-300'
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
                rows={4}
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                placeholder="Share your experience staying in this apartment..."
                className="w-full text-sm border rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-800"
              />
            </div>

            {error && (
              <p className="text-xs text-red-600 bg-red-50 p-2.5 rounded-lg border border-red-200">
                {error}
              </p>
            )}

            <div className="flex gap-3 pt-2">
              <button
                type="button"
                onClick={handleClose}
                disabled={loading}
                className="flex-1 py-2.5 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-xl text-sm font-semibold transition"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={loading}
                className="flex-1 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-sm font-semibold transition flex items-center justify-center gap-2 shadow-lg shadow-blue-500/20 disabled:opacity-50"
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