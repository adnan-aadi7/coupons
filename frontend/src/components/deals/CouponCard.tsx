"use client";

import { motion, AnimatePresence } from 'framer-motion';
import { ShieldCheck, Info, Clock, ExternalLink, Zap, Bookmark } from 'lucide-react';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '@/redux/store';
import { saveCoupon } from '@/redux/slices/authSlice';

interface CouponCardProps {
  coupon: any;
  idx: number;
  onOpenDeal: (coupon: any) => void;
}

export default function CouponCard({ coupon, idx, onOpenDeal }: CouponCardProps) {
  const [showTerms, setShowTerms] = useState(false);
  const dispatch = useDispatch<AppDispatch>();
  const { user, loading: isSaving } = useSelector((state: RootState) => state.auth);

  const isSaved = user?.savedCoupons?.some((c: any) => (c._id || c) === coupon._id);

  const handleToggleSave = async (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!user) {
      alert("Please login to save coupons!");
      return;
    }
    dispatch(saveCoupon(coupon._id));
  };

  const isExpiringSoon = coupon.expiryDate &&
    (new Date(coupon.expiryDate).getTime() - new Date().getTime()) < (48 * 60 * 60 * 1000);

  const handleDealClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (coupon.isPrintable) {
      window.open(coupon.printableUrl || '#', '_blank');
      return;
    }
    // 1. Open retailer in new tab
    const API_URL = process.env.NEXT_PUBLIC_API_URL || 'https://coupons-52jf.vercel.app/api';
    window.open(`${API_URL}/track/${coupon._id}`, '_blank');
    // 2. Open modal in current tab
    onOpenDeal(coupon);
  };

  const verifiedLabel = coupon.verifiedAt 
    ? `Verified ${Math.floor((Date.now() - new Date(coupon.verifiedAt).getTime()) / (1000 * 60 * 60))}h ago`
    : 'Verified Today';

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: idx * 0.05 }}
      className="group bg-white border border-slate-100 hover:border-primary/20 hover:shadow-[0_12px_40px_rgba(0,0,0,0.04)] transition-all duration-500 rounded-3xl overflow-hidden relative"
    >
      {/* Bookmark Button */}
      <button 
        onClick={handleToggleSave}
        disabled={isSaving}
        className={`absolute top-3.5 right-3.5 z-20 w-8.5 h-8.5 rounded-full flex items-center justify-center transition-all ${
          isSaved ? 'text-primary bg-primary/10' : 'text-slate-300 hover:text-primary hover:bg-primary/5 bg-slate-50'
        }`}
      >
        <Bookmark className={`w-4 h-4 ${isSaved ? 'fill-current' : ''}`} />
      </button>

      <div className="flex flex-col md:flex-row items-stretch">
        
        {/* Column 1: The "Visual Value" - Compacted */}
        <div className="md:w-36 bg-slate-50/50 flex flex-col items-center justify-center p-4 border-b md:border-b-0 md:border-r border-slate-100 gap-1.5 shrink-0">
          <div className="relative">
            {coupon.brandLogo ? (
              <img src={coupon.brandLogo} alt={coupon.brand} className="w-12 h-12 object-contain" />
            ) : (
              <div className="w-12 h-12 bg-slate-100 rounded-2xl flex items-center justify-center">
                <Tag className="w-6 h-6 text-slate-300" />
              </div>
            )}
            {coupon.successRate >= 95 && (
              <div className="absolute -top-1.5 -right-1.5 bg-emerald-500 text-white text-[7px] font-black px-1 py-0.2 rounded-full shadow-lg">
                {coupon.successRate}%
              </div>
            )}
          </div>
          <div className="text-center mt-1">
            <span className="block text-[20px] font-black leading-none text-slate-900">
              {coupon.discountType === 'percentage' ? `${coupon.discountValue}%` : 
               coupon.discountType === 'fixed' ? `$${coupon.discountValue}` : 'DEAL'}
            </span>
            <span className="block text-[8px] font-black text-slate-400 uppercase tracking-widest mt-0.5">
              {coupon.discountType === 'deal' ? 'OFFER' : 'SAVINGS'}
            </span>
          </div>
        </div>

        {/* Column 2: Content & Details - Compacted */}
        <div className="flex-1 p-4 flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-1.5 mb-1.5">
              <span className="text-[9px] font-black text-primary uppercase tracking-[0.2em]">{coupon.store}</span>
              <div className="flex items-center gap-1 bg-emerald-50 text-emerald-600 px-2 py-0.5 rounded-full text-[8px] font-black uppercase tracking-tighter">
                <ShieldCheck className="w-2.5 h-2.5" />
                {verifiedLabel}
              </div>
              {coupon.usageCountToday > 0 && (
                <div className="text-[8px] font-bold text-slate-400">
                  {coupon.usageCountToday.toLocaleString()} uses today
                </div>
              )}
            </div>
            <h4 className="text-[15px] font-black text-slate-900 leading-snug mb-1 group-hover:text-primary transition-colors line-clamp-1">
              {coupon.title}
              {coupon.isPrintable && <span className="ml-1.5 text-[8px] bg-slate-100 text-slate-500 px-1.5 py-0.2 rounded uppercase tracking-widest">Printable</span>}
            </h4>
            <p className="text-slate-500 text-[11px] line-clamp-2 font-medium leading-relaxed">
              {coupon.description 
                ? (coupon.description.length > 120 ? coupon.description.slice(0, 120) + '...' : coupon.description)
                : "Exclusive savings and activated deals. Shop now and save instantly at checkout."}
            </p>
          </div>

          <div className="mt-3 flex items-center gap-3 text-[9px] font-black uppercase tracking-widest text-slate-400">
            <div className="flex items-center gap-1">
              <Clock className="w-3 h-3" />
              {isExpiringSoon ? (
                <span className="text-orange-500">Expiring Soon</span>
              ) : (
                <span>Active Offer</span>
              )}
            </div>
            <button 
              onClick={() => setShowTerms(!showTerms)}
              className="flex items-center gap-1 hover:text-slate-900 transition-colors"
            >
              <Info className="w-3 h-3" />
              Terms
            </button>
          </div>

          <AnimatePresence>
            {showTerms && (
              <motion.p 
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                className="mt-2 text-[10px] font-bold text-slate-400 leading-relaxed overflow-hidden"
              >
                {coupon.terms || "Offer subject to brand availability. See retailer site for official terms and conditions."}
              </motion.p>
            )}
          </AnimatePresence>
        </div>

        {/* Column 3: The Call to Action - Compacted */}
        <div className="md:w-48 p-4 flex flex-col items-center justify-center border-t md:border-t-0 md:border-l border-slate-100 gap-2 shrink-0">
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={handleDealClick}
            className={`w-full py-2.5 px-4 rounded-xl font-black text-[10px] uppercase tracking-widest transition-all shadow-md ${
              coupon.code ? 'bg-primary text-white hover:bg-emerald-600 shadow-primary/20' : 
              coupon.isPrintable ? 'bg-slate-900 text-white hover:bg-black' : 'bg-slate-100 text-slate-600 hover:bg-slate-200 shadow-none'
            }`}
          >
            <span className="flex items-center justify-center gap-1.5">
              {coupon.isPrintable ? 'Print Coupon' : coupon.code ? 'Show Code' : 'Get Deal'}
              {coupon.isPrintable ? <ExternalLink className="w-3 h-3" /> : <Zap className="w-3 h-3 fill-current" />}
            </span>
          </motion.button>
          
          <span className="text-[8px] font-black text-slate-300 uppercase tracking-widest text-center">
            {coupon.popularity > 200 ? '🔥 Trending Now' : `Verified by SmartSaver`}
          </span>
        </div>

      </div>
    </motion.div>
  );
}

// Sub-component or Icon dependency check
function Tag(props: any) {
  return (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2H2v10l9.29 9.29c.94.94 2.48.94 3.42 0l6.58-6.58c.94-.94.94-2.48 0-3.42L12 2Z"></path><path d="M7 7h.01"></path></svg>
  );
}
