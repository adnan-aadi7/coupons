"use client";

import { motion, AnimatePresence } from 'framer-motion';
import { MessageSquare, Star, X, Check, Search } from 'lucide-react';
import { useState, useEffect } from 'react';
import api from '@/redux/api';

interface Review {
  _id: string;
  storeName: string;
  rating: number;
  content: string;
  createdAt: string;
}

export default function MyReviews() {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [stores, setStores] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isWriteModalOpen, setIsWriteModalOpen] = useState(false);
  
  // Form State
  const [selectedStore, setSelectedStore] = useState('');
  const [storeSearch, setStoreSearch] = useState('');
  const [rating, setRating] = useState(5);
  const [hoveredRating, setHoveredRating] = useState<number | null>(null);
  const [content, setContent] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccessToast, setShowSuccessToast] = useState(false);

  // Fetch reviews on mount
  useEffect(() => {
    fetchReviews();
    fetchStores();
  }, []);

  const fetchReviews = async () => {
    try {
      setIsLoading(true);
      const res = await api.get('/reviews/me');
      if (res.data.success) {
        setReviews(res.data.data);
      }
    } catch (err) {
      console.error('Failed to fetch reviews:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const fetchStores = async () => {
    try {
      const res = await api.get('/stores');
      if (res.data.success) {
        setStores(res.data.data);
      }
    } catch (err) {
      console.error('Failed to fetch stores:', err);
    }
  };

  const handleSubmitReview = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedStore || !content) {
      alert('Please fill out all fields!');
      return;
    }

    try {
      setIsSubmitting(true);
      const res = await api.post('/reviews', {
        storeName: selectedStore,
        rating,
        content
      });

      if (res.data.success) {
        setReviews(prev => [res.data.data, ...prev]);
        setIsWriteModalOpen(false);
        // Reset Form
        setSelectedStore('');
        setStoreSearch('');
        setRating(5);
        setContent('');
        // Show Toast
        setShowSuccessToast(true);
        setTimeout(() => setShowSuccessToast(false), 4000);
      }
    } catch (err: any) {
      alert(err.response?.data?.message || 'Failed to submit review');
    } finally {
      setIsSubmitting(false);
    }
  };

  const filteredStores = stores.filter(store => 
    store.name.toLowerCase().includes(storeSearch.toLowerCase())
  );

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="w-full space-y-8 relative"
    >
      {/* Toast Success Alert */}
      <AnimatePresence>
        {showSuccessToast && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed top-24 right-8 bg-emerald-500 text-white px-6 py-4 rounded-2xl shadow-xl z-[999] flex items-center gap-3 border border-emerald-400"
          >
            <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center">
              <Check className="w-4 h-4 text-white" />
            </div>
            <div>
              <span className="font-bold text-sm block">Review Published!</span>
              <span className="text-[11px] opacity-90">Thank you for helping the SmartSaver community!</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <h2 className="text-[32px] font-medium tracking-tight text-[#111827] font-serif" style={{ fontFamily: 'Georgia, serif' }}>
          My Reviews
        </h2>
        {reviews.length > 0 && (
          <button 
            onClick={() => setIsWriteModalOpen(true)}
            className="bg-[#242b47] hover:bg-[#1a1f33] text-white px-8 py-2.5 rounded-[24px] text-[14px] font-bold transition-all shadow-sm cursor-pointer"
          >
            Write a Review
          </button>
        )}
      </div>

      {isLoading ? (
        <div className="py-20 flex justify-center items-center">
          <div className="w-10 h-10 border-4 border-slate-200 border-t-[#FF9800] rounded-full animate-spin" />
        </div>
      ) : reviews.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-20 bg-white rounded-[24px] border border-dashed border-slate-200 shadow-sm">
          <div className="w-16 h-16 bg-[#f4f5f7] rounded-full flex items-center justify-center mb-4">
            <MessageSquare className="w-6 h-6 text-slate-400" />
          </div>
          <h3 className="text-lg font-bold text-[#111827] mb-1">No reviews yet</h3>
          <p className="text-slate-500 text-sm max-w-sm text-center mb-6">
            You haven't reviewed any stores or deals yet. Leave reviews to help the community and earn extra rewards.
          </p>
          <button 
            onClick={() => setIsWriteModalOpen(true)}
            className="bg-[#242b47] hover:bg-[#1a1f33] text-white px-8 py-2.5 rounded-[24px] text-[14px] font-bold transition-all shadow-sm cursor-pointer"
          >
            Write a Review
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {reviews.map((rev) => (
            <motion.div
              key={rev._id}
              initial={{ scale: 0.98, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="bg-white rounded-3xl p-6 border border-slate-100 shadow-sm flex flex-col justify-between space-y-4 hover:shadow-md transition-shadow"
            >
              <div>
                <div className="flex items-center justify-between">
                  <h4 className="font-extrabold text-slate-800 text-[15px]">{rev.storeName}</h4>
                  <div className="flex items-center gap-0.5">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`w-3.5 h-3.5 ${
                          i < rev.rating ? 'fill-amber-400 text-amber-400' : 'text-slate-200'
                        }`}
                      />
                    ))}
                  </div>
                </div>
                <p className="text-slate-600 text-sm mt-3 leading-relaxed">
                  "{rev.content}"
                </p>
              </div>
              <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block">
                Posted {new Date(rev.createdAt).toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' })}
              </span>
            </motion.div>
          ))}
        </div>
      )}

      {/* Write a Review Modal */}
      <AnimatePresence>
        {isWriteModalOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-slate-900/60 backdrop-blur-md flex items-center justify-center z-[9999] px-4"
          >
            <motion.div
              initial={{ scale: 0.95, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 20 }}
              className="bg-white rounded-[32px] max-w-[500px] w-full p-8 shadow-2xl border border-slate-100 relative overflow-hidden"
            >
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-xl font-extrabold text-slate-800">Write a Store Review</h3>
                <button 
                  onClick={() => setIsWriteModalOpen(false)}
                  className="p-2 hover:bg-slate-50 rounded-full text-slate-400 transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <form onSubmit={handleSubmitReview} className="space-y-6">
                {/* Store Selector */}
                <div className="space-y-2 relative">
                  <label className="text-sm font-bold text-slate-700">Select Store</label>
                  {selectedStore ? (
                    <div className="flex items-center justify-between bg-slate-50 border border-slate-200 rounded-xl px-4 py-3">
                      <span className="font-bold text-slate-800">{selectedStore}</span>
                      <button 
                        type="button" 
                        onClick={() => setSelectedStore('')}
                        className="text-xs text-slate-400 hover:text-red-500 font-bold"
                      >
                        Change
                      </button>
                    </div>
                  ) : (
                    <div>
                      <div className="relative">
                        <Search className="w-4 h-4 text-slate-400 absolute left-4 top-3.5" />
                        <input
                          type="text"
                          placeholder="Search verified stores..."
                          value={storeSearch}
                          onChange={(e) => setStoreSearch(e.target.value)}
                          className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-11 pr-4 py-3 text-sm focus:outline-none focus:border-blue-500 focus:bg-white transition-colors"
                        />
                      </div>
                      {storeSearch && (
                        <div className="absolute left-0 right-0 mt-1 bg-white border border-slate-100 rounded-xl shadow-lg max-h-40 overflow-y-auto z-50 p-2 space-y-1">
                          {filteredStores.map(store => (
                            <button
                              key={store._id}
                              type="button"
                              onClick={() => {
                                setSelectedStore(store.name);
                                setStoreSearch('');
                              }}
                              className="w-full text-left px-4 py-2 hover:bg-slate-50 rounded-lg text-xs font-bold text-slate-700 transition-colors"
                            >
                              {store.name}
                            </button>
                          ))}
                          {filteredStores.length === 0 && (
                            <div className="text-center py-4 text-xs text-slate-400 font-medium">
                              No matching stores found.
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                  )}
                </div>

                {/* Rating Input */}
                <div className="space-y-2">
                  <label className="text-sm font-bold text-slate-700 block">Rating</label>
                  <div className="flex items-center gap-1.5">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        key={star}
                        type="button"
                        onClick={() => setRating(star)}
                        onMouseEnter={() => setHoveredRating(star)}
                        onMouseLeave={() => setHoveredRating(null)}
                        className="transition-transform active:scale-90"
                      >
                        <Star
                          className={`w-8 h-8 transition-colors ${
                            star <= (hoveredRating !== null ? hoveredRating : rating)
                              ? 'fill-amber-400 text-amber-400'
                              : 'text-slate-200'
                          }`}
                        />
                      </button>
                    ))}
                  </div>
                </div>

                {/* Content Textarea */}
                <div className="space-y-2">
                  <label className="text-sm font-bold text-slate-700 block">Your Review</label>
                  <textarea
                    placeholder="Tell the community about your shopping experience, cashback tracking speed, or coupon discount..."
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    rows={4}
                    maxLength={500}
                    required
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-blue-500 focus:bg-white transition-colors resize-none"
                  />
                  <div className="text-right text-[10px] text-slate-400 font-bold">
                    {content.length}/500 chars
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting || !selectedStore || !content}
                  className="w-full bg-[#1A1C1C] hover:bg-[#FF9800] text-white font-bold text-[15px] py-4 rounded-2xl transition-all shadow-lg active:scale-[0.98] disabled:bg-slate-100 disabled:text-slate-400 disabled:shadow-none disabled:pointer-events-none"
                >
                  {isSubmitting ? 'Publishing...' : 'Publish Review'}
                </button>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="bg-gradient-to-r from-amber-50 to-orange-50 rounded-[24px] p-8 border border-amber-100 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-sm text-amber-500">
            <Star className="w-6 h-6 fill-amber-500" />
          </div>
          <div>
            <h4 className="font-bold text-amber-900">Become a Top Reviewer</h4>
            <p className="text-amber-700/80 text-sm mt-1">Earn 50 bonus points for every approved review you post.</p>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
