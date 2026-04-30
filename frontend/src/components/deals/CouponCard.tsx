"use client";

import { motion, AnimatePresence } from 'framer-motion';
import { ShieldCheck, Info, Clock, ExternalLink, Zap, Bookmark } from 'lucide-react';
import { useState } from 'react';
import { useGetMeQuery, useSaveCouponMutation } from '@/redux/api/authApi';

interface CouponCardProps {
  coupon: any;
  idx: number;
  onOpenDeal: (coupon: any) => void;
}

export default function CouponCard({ coupon, idx, onOpenDeal }: CouponCardProps) {
  const [showTerms, setShowTerms] = useState(false);
  const { data: userData } = useGetMeQuery({});
  const [toggleSave, { isLoading: isSaving }] = useSaveCouponMutation();

  const user = userData?.data;
  const isSaved = user?.savedCoupons?.some((c: any) => (c._id || c) === coupon._id);

  const handleToggleSave = async (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!user) {
      // Potentially show a toast or redirect to login
      return;
    }
    try {
      await toggleSave(coupon._id).unwrap();
    } catch (err) {}
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
    window.open(`http://localhost:5000/api/track/${coupon._id}`, '_blank');
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
      className="group bg-white border border-slate-100 hover:border-primary/20 hover:shadow-[0_20px_50px_rgba(0,0,0,0.06)] transition-all duration-500 rounded-[32px] overflow-hidden relative"
    >
      {/* Bookmark Button */}
      <button 
        onClick={handleToggleSave}
        disabled={isSaving}
        className={`absolute top-4 right-4 z-20 w-10 h-10 rounded-full flex items-center justify-center transition-all ${
          isSaved ? 'text-primary bg-primary/10' : 'text-slate-300 hover:text-primary hover:bg-primary/5 bg-slate-50'
        }`}
      >
        <Bookmark className={`w-5 h-5 ${isSaved ? 'fill-current' : ''}`} />
      </button>

      <div className="flex flex-col md:flex-row items-stretch">
        
        {/* Column 1: The "Visual Value" */}
        <div className="md:w-48 bg-slate-50/50 flex flex-col items-center justify-center p-6 border-b md:border-b-0 md:border-r border-slate-100 gap-2 shrink-0">
          <div className="relative">
            {coupon.brandLogo ? (
              <img src={coupon.brandLogo} alt={coupon.brand} className="w-16 h-16 object-contain" />
            ) : (
              <div className="w-16 h-16 bg-slate-100 rounded-2xl flex items-center justify-center">
                <Tag className="w-8 h-8 text-slate-300" />
              </div>
            )}
            {coupon.successRate >= 95 && (
              <div className="absolute -top-2 -right-2 bg-emerald-500 text-white text-[8px] font-black px-1.5 py-0.5 rounded-full shadow-lg">
                {coupon.successRate}%
              </div>
            )}
          </div>
          <div className="text-center mt-2">
            <span className="block text-[24px] font-black leading-none text-slate-900">
              {coupon.discountType === 'percentage' ? `${coupon.discountValue}%` : 
               coupon.discountType === 'fixed' ? `$${coupon.discountValue}` : 'DEAL'}
            </span>
            <span className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mt-1">
              {coupon.discountType === 'deal' ? 'OFFER' : 'SAVINGS'}
            </span>
          </div>
        </div>

        {/* Column 2: Content & Details */}
        <div className="flex-1 p-6 flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="text-[10px] font-black text-primary uppercase tracking-[0.2em]">{coupon.store}</span>
              <div className="flex items-center gap-1 bg-emerald-50 text-emerald-600 px-2.5 py-1 rounded-full text-[9px] font-black uppercase tracking-tighter">
                <ShieldCheck className="w-3 h-3" />
                {verifiedLabel}
              </div>
              {coupon.usageCountToday > 0 && (
                <div className="text-[9px] font-bold text-slate-400">
                  {coupon.usageCountToday.toLocaleString()} uses today
                </div>
              )}
            </div>
            <h4 className="text-xl font-black text-slate-900 leading-tight mb-2 group-hover:text-primary transition-colors line-clamp-2">
              {coupon.title}
              {coupon.isPrintable && <span className="ml-2 text-[10px] bg-slate-100 text-slate-500 px-2 py-0.5 rounded uppercase tracking-widest">Printable</span>}
            </h4>
            <p className="text-slate-500 text-sm line-clamp-2 font-medium">
              {coupon.description}
            </p>
          </div>

          <div className="mt-4 flex items-center gap-4 text-[10px] font-black uppercase tracking-widest text-slate-400">
            <div className="flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5" />
              {isExpiringSoon ? (
                <span className="text-orange-500">Expiring Soon</span>
              ) : (
                <span>Active Offer</span>
              )}
            </div>
            <button 
              onClick={() => setShowTerms(!showTerms)}
              className="flex items-center gap-1.5 hover:text-slate-900 transition-colors"
            >
              <Info className="w-3.5 h-3.5" />
              Terms
            </button>
          </div>

          <AnimatePresence>
            {showTerms && (
              <motion.p 
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                className="mt-3 text-[11px] font-bold text-slate-400 leading-relaxed overflow-hidden"
              >
                {coupon.terms || "Offer subject to brand availability. See retailer site for official terms and conditions."}
              </motion.p>
            )}
          </AnimatePresence>
        </div>

        {/* Column 3: The Call to Action */}
        <div className="md:w-64 p-6 flex flex-col items-center justify-center border-t md:border-t-0 md:border-l border-slate-100 gap-3 shrink-0">
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={handleDealClick}
            className={`w-full py-4 px-6 rounded-2xl font-black text-[11px] uppercase tracking-widest transition-all shadow-lg ${
              coupon.code ? 'bg-primary text-white hover:bg-emerald-600 shadow-primary/20' : 
              coupon.isPrintable ? 'bg-slate-900 text-white hover:bg-black' : 'bg-slate-100 text-slate-600 hover:bg-slate-200 shadow-none'
            }`}
          >
            <span className="flex items-center justify-center gap-2">
              {coupon.isPrintable ? 'Print Coupon' : coupon.code ? 'Show Code' : 'Get Deal'}
              {coupon.isPrintable ? <ExternalLink className="w-3.5 h-3.5" /> : <Zap className="w-3.5 h-3.5 fill-current" />}
            </span>
          </motion.button>
          
          <span className="text-[9px] font-black text-slate-300 uppercase tracking-widest text-center">
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
