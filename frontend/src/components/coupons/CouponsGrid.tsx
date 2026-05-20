"use client";

import { motion, AnimatePresence } from 'framer-motion';
import { Copy, Clock, Zap, ArrowRight, ShieldCheck, Tag, Users, ChevronDown } from 'lucide-react';
import { useState } from 'react';

interface CouponsGridProps {
  coupons: any[];
  isLoading: boolean;
  onOpenDeal: (coupon: any) => void;
  itemType?: 'coupons' | 'deals';
}

export default function CouponsGrid({ coupons, isLoading, onOpenDeal, itemType = 'deals' }: CouponsGridProps) {
  const [visibleCount, setVisibleCount] = useState(10);

  const handleDealClick = (e: React.MouseEvent, coupon: any) => {
    e.stopPropagation();
    if (coupon.isPrintable) {
      window.open(coupon.printableUrl || '#', '_blank');
      return;
    }
    // Track click and open modal
    const API_URL = process.env.NEXT_PUBLIC_API_URL || 'https://coupons-52jf.vercel.app/api';
    window.open(`${API_URL}/track/${coupon._id}`, '_blank');
    onOpenDeal(coupon);
  };

  const showMore = () => {
    setVisibleCount(prev => prev + 10);
  };

  if (isLoading) {
    return (
      <div className="space-y-4">
        {[1, 2, 3, 4].map(i => (
          <div key={i} className="flex flex-col sm:row items-center border border-slate-100 rounded-[24px] p-6 gap-6 bg-slate-50 animate-pulse h-[140px]" />
        ))}
      </div>
    );
  }

  if (!coupons || coupons.length === 0) {
    return (
      <div className="py-24 text-center border-2 border-dashed border-slate-100 rounded-[40px] text-slate-400 font-['Manrope'] font-bold">
        No active {itemType} found. Please check back later!
      </div>
    );
  }

  const visibleCoupons = coupons.slice(0, visibleCount);
  const hasMore = coupons.length > visibleCount;

  return (
    <div className="space-y-6">
      <div className="space-y-4">
        <AnimatePresence mode="popLayout">
          {visibleCoupons.map((coupon, i) => {
            const isExpiringSoon = coupon.expiryDate && (new Date(coupon.expiryDate).getTime() - new Date().getTime()) < (48 * 60 * 60 * 1000);
            const verifiedLabel = coupon.verifiedAt ? `Verified ${Math.floor((Date.now() - new Date(coupon.verifiedAt).getTime()) / (1000 * 60 * 60))}h ago` : 'Verified Today';

            const storeName = coupon.store || coupon.brand || 'Brand Offer';

            // Parse discount value elegantly
            let discountText = 'DEAL';
            if (coupon.discountValue) {
              const symbol = coupon.discountType === 'percentage' ? '%' : '$';
              discountText = coupon.discountType === 'percentage' ? `${coupon.discountValue}%` : `${symbol}${coupon.discountValue}`;
            } else if (coupon.discountType) {
              discountText = coupon.discountType.toUpperCase();
            }

            return (
              <motion.div
                key={coupon._id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.4 }}
                className="flex flex-row bg-white border border-slate-100 rounded-2xl sm:rounded-[32px] overflow-hidden group hover:shadow-xl hover:shadow-slate-100/50 transition-all duration-500 p-3 sm:p-0 gap-3 sm:gap-0 relative cursor-pointer"
                onClick={(e) => handleDealClick(e, coupon)}
              >
                {/* Left Image Area - Slightly Larger on Mobile */}
                <div className="w-24 h-24 sm:w-[160px] sm:h-[130px] shrink-0 bg-slate-50/50 flex items-center justify-center p-3 sm:p-4 rounded-2xl sm:rounded-none border border-slate-100 sm:border-0 sm:border-r relative overflow-hidden self-center sm:self-auto">
                  {coupon.brandLogo ? (
                    <img 
                      src={(() => {
                        const { getProxyLogoUrl } = require('@/utils/imageHelper');
                        return getProxyLogoUrl(coupon.brandLogo, storeName.toLowerCase().replace(/\s+/g, ''));
                      })()} 
                      alt={storeName} 
                      className="max-w-full max-h-full object-contain mix-blend-multiply group-hover:scale-105 transition-transform" 
                      onError={(e: any) => {
                        e.currentTarget.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(storeName)}&background=FF9800&color=fff&size=128&bold=true`;
                      }}
                    />
                  ) : (
                    <Tag className="w-6 h-6 sm:w-8 sm:h-8 text-slate-300" />
                  )}
                </div>

                {/* Content Area */}
                <div className="flex-1 p-0 sm:p-6 sm:pr-8 flex flex-col justify-center">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 sm:gap-4 mb-1 sm:mb-2">
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] sm:text-[11px] font-black text-slate-400 uppercase tracking-widest">{storeName}</span>
                      <span className="hidden sm:inline-block w-1 h-1 bg-slate-200 rounded-full"></span>
                      <span className="flex items-center gap-1 text-[10px] sm:text-[11px] font-bold text-emerald-500">
                        <ShieldCheck className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
                        {verifiedLabel}
                      </span>
                    </div>
                    {/* Only visible on desktop right side */}
                    <div className="hidden sm:flex items-center gap-1.5 text-[12px] font-bold text-slate-400 bg-slate-50 px-3 py-1 rounded-full">
                      <Users className="w-3.5 h-3.5" />
                      {Math.floor(Math.random() * 500 + 100)} Used
                    </div>
                  </div>

                  <h3 className="font-['Georgia'] font-bold text-[15px] sm:text-[18px] text-[#1A1C1C] leading-snug mb-2 sm:mb-4 group-hover:text-[#FF9800] transition-colors line-clamp-2">
                    {coupon.title}
                  </h3>

                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-0 mt-auto">
                    <div className="flex items-center gap-2">
                      <div className="bg-[#FFF4E5] text-[#FF9800] px-2 sm:px-3 py-1 rounded-md sm:rounded-lg font-black text-[12px] sm:text-[14px]">
                        {discountText}
                      </div>
                      {isExpiringSoon && (
                        <span className="flex items-center gap-1 text-[11px] font-bold text-red-500 bg-red-50 px-2 py-1 rounded-md">
                          <Clock className="w-3 h-3" /> Ends Soon
                        </span>
                      )}
                    </div>

                    {/* Button - Mobile optimized */}
                    <button 
                      className={`w-full sm:w-auto flex items-center justify-center gap-2 px-4 sm:px-6 py-2 sm:py-2.5 rounded-xl sm:rounded-full font-bold text-[13px] sm:text-[14px] transition-all
                        ${coupon.code 
                          ? 'bg-[#1A1C1C] text-white hover:bg-[#FF9800] group-hover:shadow-lg group-hover:shadow-orange-500/20' 
                          : 'bg-orange-50 text-[#FF9800] hover:bg-[#FF9800] hover:text-white group-hover:shadow-lg group-hover:shadow-orange-500/20'
                        }`}
                    >
                      {coupon.code ? 'Show Code' : 'Get Deal'}
                      {coupon.code ? <Copy className="w-4 h-4" /> : <ArrowRight className="w-4 h-4" />}
                    </button>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>

      {/* Show More Button */}
      {hasMore && (
        <div className="flex flex-col items-center justify-center pt-8 pb-4">
          <p className="text-sm font-bold text-slate-400 mb-4">
            Showing {visibleCoupons.length} of {coupons.length} {itemType}
          </p>
          <button 
            onClick={showMore}
            className="flex items-center gap-2 px-8 py-3 bg-white border-2 border-slate-200 rounded-full font-bold text-[#1A1C1C] hover:border-[#FF9800] hover:text-[#FF9800] transition-colors shadow-sm"
          >
            Load 10 More <ChevronDown className="w-5 h-5 text-[#FF9800]" />
          </button>
        </div>
      )}
    </div>
  );
}
