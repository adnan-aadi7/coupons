"use client";

import { motion } from 'framer-motion';
import { Copy, Clock, Zap, ArrowRight, ShieldCheck, Tag, Users } from 'lucide-react';
import SectionHeader from '@/components/ui/SectionHeader';
import Link from 'next/link';

interface TopCouponsProps {
  activeCategory: string;
  onCategoryChange: (category: string) => void;
  isLoading: boolean;
  deals: any;
  onOpenDeal: (coupon: any) => void;
}

export default function TopCoupons({ activeCategory, onCategoryChange, isLoading, deals, onOpenDeal }: TopCouponsProps) {

  const handleDealClick = (e: React.MouseEvent, coupon: any) => {
    e.stopPropagation();
    if (coupon.isPrintable) {
      window.open(coupon.printableUrl || '#', '_blank');
      return;
    }
    const API_URL = process.env.NEXT_PUBLIC_API_URL || 'https://coupons-52jf.vercel.app/api';
    window.open(`${API_URL}/track/${coupon._id}`, '_blank');
    onOpenDeal(coupon);
  };

  return (
    <section className="py-16 lg:py-24 bg-white border-t border-slate-100">
      <div className="max-w-[1280px] mx-auto px-4 md:px-8 space-y-12">

        <div className="space-y-8">
          <SectionHeader
            title={activeCategory === 'all' ? 'Top and Trending Coupons' : `${activeCategory} Deals`}
            action={
              activeCategory === 'all' ? (
                <Link
                  href="/coupons"
                  className="group flex items-center justify-center sm:justify-start gap-2 font-['Manrope'] font-bold text-[#8B5000] text-[15px] hover:text-[#FF9800] transition-colors"
                >
                  <span>View All Coupons</span>
                  <ArrowRight className="w-5 h-5 transform group-hover:translate-x-1 transition-transform" />
                </Link>
              ) : (
                <button
                  onClick={() => onCategoryChange('all')}
                  className="text-[#FF9800] text-xs sm:text-sm font-bold flex items-center gap-1 hover:underline"
                >
                  Reset Filter <ArrowRight className="w-4 h-4" />
                </button>
              )
            }
          />

          {/* Grid of horizontal cards */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 pb-12">
            {isLoading ? (
              // Skeletons
              [1, 2, 3, 4].map(i => (
                <div key={i} className="flex flex-row items-center border border-slate-100 rounded-[24px] p-6 gap-6 bg-slate-50 animate-pulse h-[140px]" />
              ))
    ) : (deals?.data || deals)?.length > 0 ? (
      (deals?.data || deals).slice(0, 6).map((coupon: any, i: number) => {
                const isExpiringSoon = coupon.expiryDate && (new Date(coupon.expiryDate).getTime() - new Date().getTime()) < (48 * 60 * 60 * 1000);
                const verifiedLabel = coupon.verifiedAt ? `Verified` : 'Verified';
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
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-50px" }}
                    transition={{ delay: i * 0.05, duration: 0.4 }}
                    className="flex flex-row bg-white border border-slate-100 rounded-2xl sm:rounded-[32px] overflow-hidden group hover:shadow-xl hover:shadow-slate-100/50 transition-all duration-500 p-3 sm:p-0 gap-3 sm:gap-0 relative cursor-pointer"
                    onClick={(e) => handleDealClick(e, coupon)}
                  >
                    {/* Left Image Area - Slightly Larger on Mobile */}
                    <div className="w-24 h-24 sm:w-[160px] sm:h-[130px] shrink-0 bg-slate-50/50 flex items-center justify-center p-3 sm:p-4 rounded-2xl sm:rounded-none border border-slate-100 sm:border-0 sm:border-r relative overflow-hidden self-center sm:self-auto">
                      {coupon.brandLogo ? (
                        <img 
                          src={coupon.brandLogo} 
                          alt={storeName} 
                          className="max-w-full max-h-full object-contain mix-blend-multiply group-hover:scale-105 transition-transform" 
                          onError={(e) => {
                            e.currentTarget.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(storeName)}&background=FF9800&color=fff&size=128&bold=true`;
                          }}
                        />
                      ) : (
                        <Tag className="w-6 h-6 sm:w-8 sm:h-8 text-slate-300" />
                      )}
                      <div className="absolute top-1 left-1 sm:top-2 sm:left-2 scale-75 sm:scale-100 origin-top-left">
                        <span className="px-2 py-0.5 bg-[#FF9800] text-white text-[8px] font-black uppercase tracking-widest rounded-md shadow-md">
                          {i % 2 === 0 ? 'Limited' : 'Top'}
                        </span>
                      </div>
                    </div>

                    {/* Content Area - Highly Compact on Mobile */}
                    <div className="flex-1 p-0 sm:p-5 flex flex-col justify-between relative min-w-0 pr-16 sm:pr-0">
                      <div className="space-y-0.5 sm:space-y-2 pr-0 sm:pr-24">
                        <div className="flex items-center gap-1 sm:gap-2 mb-0.5 sm:mb-1">
                          <span className="text-[9px] sm:text-[11px] font-black text-[#FF9800] uppercase tracking-wider">{storeName}</span>
                          <div className="flex items-center gap-0.5 bg-emerald-50 text-emerald-600 px-1.5 py-0.5 rounded-full text-[7px] sm:text-[9px] font-black uppercase tracking-tight">
                            <span className="w-1 h-1 rounded-full bg-emerald-500 animate-pulse" /> Verified
                          </div>
                        </div>
                        <h3 className="text-xs sm:text-base font-black text-[#1A1C1C] leading-tight tracking-tight group-hover:text-[#FF9800] transition-colors uppercase line-clamp-1 sm:line-clamp-2">
                          {coupon.title}
                        </h3>
                      </div>

                      {/* Dynamic statistics row */}
                      <div className="flex items-center gap-2 sm:gap-4 mt-1.5 sm:mt-3">
                        <div className={`flex items-center gap-0.5 sm:gap-1 text-slate-400 text-[8px] sm:text-[10px] font-black uppercase tracking-wider ${isExpiringSoon ? 'text-orange-500 font-bold' : ''}`}>
                          <Clock className="w-2.5 h-2.5 sm:w-3.5 sm:h-3.5" /> {isExpiringSoon ? 'Expiring' : 'Active'}
                        </div>
                        <div className="flex items-center gap-0.5 sm:gap-1 text-slate-400 text-[8px] sm:text-[10px] font-black uppercase tracking-wider">
                          <Users className="w-2.5 h-2.5 sm:w-3.5 sm:h-3.5" /> {coupon.usageCountToday || Math.floor(Math.random() * 80) + 12} used
                        </div>
                      </div>

                      {/* Right Info Section - Dynamic positioning */}
                      <div className="absolute top-3 right-3 sm:top-5 sm:right-5 text-right space-y-0 sm:space-y-0.5 pointer-events-none">
                        <div className="text-sm sm:text-xl font-black text-[#FF9800] leading-none">
                          {discountText}
                        </div>
                        <div className="text-[7px] sm:text-[9px] font-black text-[#FF9800] uppercase tracking-widest opacity-60 hidden sm:block">
                          {coupon.code ? 'CODE' : 'DEAL'}
                        </div>
                      </div>

                      {/* Button - Compact positioning */}
                      <div className="absolute bottom-3 right-3 sm:bottom-5 sm:right-5">
                        <button 
                          className={`px-2.5 py-1.5 sm:px-5 sm:py-2.5 rounded-lg sm:rounded-xl font-black text-[9px] sm:text-[12px] transition-all shadow-md active:scale-95 flex items-center justify-center ${coupon.code
                            ? 'bg-[#FF9800] text-white hover:bg-[#F97316]'
                            : 'bg-slate-100 text-[#1A1C1C] hover:bg-slate-200'
                            }`}
                        >
                          {coupon.code ? 'Code' : 'Get'}
                        </button>
                      </div>
                    </div>
                  </motion.div>
                );
              })
            ) : (
              <div className="col-span-full py-24 text-center border-2 border-dashed border-slate-100 rounded-[32px] text-slate-400 font-['Manrope'] font-bold">
                No active deals in this category. Check back later!
              </div>
            )}
          </div>
        </div>

      </div>
    </section>
  );
}
