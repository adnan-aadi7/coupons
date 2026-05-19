"use client";

import { motion } from 'framer-motion';
import { Clock, Users } from 'lucide-react';

interface StoreDealCardProps {
  coupon: any;
  idx: number;
  onOpenDeal: (coupon: any) => void;
}

export default function StoreDealCard({ coupon, idx, onOpenDeal }: StoreDealCardProps) {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex flex-row bg-white border border-slate-100 rounded-2xl sm:rounded-[32px] overflow-hidden group hover:shadow-xl hover:shadow-slate-100/50 transition-all duration-500 p-3 sm:p-0 gap-3 sm:gap-0 relative"
    >
      {/* Left Image Area - Slightly Larger on Mobile */}
      <div className="w-24 h-24 sm:w-[220px] sm:h-[160px] shrink-0 bg-slate-50/50 flex items-center justify-center p-3 sm:p-6 rounded-2xl sm:rounded-none border border-slate-100 sm:border-0 sm:border-r relative overflow-hidden self-center sm:self-auto">
        <img 
          src={coupon.brandLogo || `https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=600&q=80`} 
          alt={coupon.title}
          className="max-w-full max-h-full object-contain transition-transform duration-1000 group-hover:scale-105"
        />
        <div className="absolute top-1 left-1 sm:top-3 sm:left-3 scale-75 sm:scale-100 origin-top-left">
          <span className="px-2 py-0.5 bg-[#FF9800] text-white text-[8px] font-black uppercase tracking-widest rounded-md shadow-md">
            {idx % 2 === 0 ? 'Limited' : 'Top'}
          </span>
        </div>
      </div>

      {/* Content Area - Highly Compact on Mobile */}
      <div className="flex-1 p-0 sm:p-6 flex flex-col justify-between relative min-w-0 pr-16 sm:pr-0">
        <div className="space-y-0.5 sm:space-y-2 pr-0 sm:pr-24">
          <h3 className="text-xs sm:text-xl font-black text-[#1A1C1C] leading-tight tracking-tight group-hover:text-[#FF9800] transition-colors uppercase line-clamp-1 sm:line-clamp-2">
            {coupon.title}
          </h3>
          <p className="text-slate-500 font-medium text-[10px] sm:text-[13px] leading-relaxed max-w-[420px] line-clamp-1 sm:line-clamp-2">
            {coupon.description 
              ? (coupon.description.length > 120 ? coupon.description.slice(0, 120) + '...' : coupon.description)
              : "Save on all footwear, apparel and gear for the new season with this exclusive offer."}
          </p>
        </div>

        {/* Dynamic statistics row */}
        <div className="flex items-center gap-2 sm:gap-4 mt-1.5 sm:mt-4">
          <div className="flex items-center gap-0.5 sm:gap-1 text-slate-400 text-[8px] sm:text-[10px] font-black uppercase tracking-wider">
            <Clock className="w-2.5 h-2.5 sm:w-3.5 sm:h-3.5" /> Exp. {coupon.expiryDate ? new Date(coupon.expiryDate).toLocaleDateString(undefined, {month: 'numeric', day: 'numeric'}) : 'Soon'}
          </div>
          <div className="flex items-center gap-0.5 sm:gap-1 text-slate-400 text-[8px] sm:text-[10px] font-black uppercase tracking-wider">
            <Users className="w-2.5 h-2.5 sm:w-3.5 sm:h-3.5" /> {coupon.usageCountToday || Math.floor(Math.random() * 80) + 12} used
          </div>
        </div>

        {/* Right Info Section - Dynamic positioning */}
        <div className="absolute top-3 right-3 sm:top-6 sm:right-6 text-right space-y-0 sm:space-y-0.5 pointer-events-none">
          <div className="text-sm sm:text-[26px] font-black text-[#FF9800] leading-none">
            {coupon.discountType === 'percentage' ? `${coupon.discountValue}%` : 
             coupon.discountType === 'fixed' ? `$${coupon.discountValue}` : 'DEAL'}
          </div>
          <div className="text-[7px] sm:text-[9px] font-black text-[#FF9800] uppercase tracking-widest opacity-60 hidden sm:block">
            {coupon.code ? 'CODE' : 'DEAL'}
          </div>
        </div>

        {/* Button - Compact positioning */}
        <div className="absolute bottom-3 right-3 sm:bottom-6 sm:right-6">
          <button 
            onClick={() => onOpenDeal(coupon)}
            className="px-2.5 py-1.5 sm:px-6 sm:py-3 bg-[#1A1C1C] text-white rounded-lg sm:rounded-[16px] font-black text-[9px] sm:text-[12px] hover:bg-[#FF9800] transition-all shadow-md active:scale-95 flex items-center justify-center"
          >
            {coupon.code ? 'Code' : 'Get'}
          </button>
        </div>
      </div>
    </motion.div>
  );
}
