"use client";

import { motion } from 'framer-motion';
import { Copy, Clock, Zap, ArrowRight, ShieldCheck, Tag } from 'lucide-react';
import SectionHeader from '@/components/ui/SectionHeader';

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
    window.open(`http://localhost:5000/api/track/${coupon._id}`, '_blank');
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
                <button
                  className="text-[#8B5000] font-['Manrope'] font-bold text-[14px] hover:text-[#FF9800] transition-colors flex items-center gap-2"
                >
                  View All Coupons <ArrowRight className="w-4 h-4" />
                </button>
              ) : (
                <button
                  onClick={() => onCategoryChange('all')}
                  className="text-[#FF9800] text-sm font-bold flex items-center gap-1 hover:underline"
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
                <div key={i} className="flex flex-col sm:flex-row items-center border border-slate-100 rounded-[24px] p-6 gap-6 bg-slate-50 animate-pulse h-[140px]" />
              ))
            ) : deals?.data?.length > 0 ? (
              deals.data.slice(0, 6).map((coupon: any, i: number) => {
                const isExpiringSoon = coupon.expiryDate && (new Date(coupon.expiryDate).getTime() - new Date().getTime()) < (48 * 60 * 60 * 1000);
                const verifiedLabel = coupon.verifiedAt ? `Verified ${Math.floor((Date.now() - new Date(coupon.verifiedAt).getTime()) / (1000 * 60 * 60))}h ago` : 'Verified Today';

                return (
                  <motion.div
                    key={coupon._id}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, margin: "-50px" }}
                    transition={{ delay: i * 0.05, duration: 0.4 }}
                    className="flex flex-col sm:flex-row items-center border border-slate-100 rounded-[24px] p-6 gap-6 hover:shadow-[0px_15px_30px_-5px_rgba(0,0,0,0.08)] transition-all duration-300 bg-white group cursor-pointer"
                    onClick={(e) => handleDealClick(e, coupon)}
                  >
                    {/* Logo / Brand block */}
                    <div className="w-[80px] h-[80px] shrink-0 bg-slate-50 border border-slate-100 rounded-2xl flex items-center justify-center overflow-hidden">
                      {coupon.brandLogo ? (
                        <>
                          <img 
                            src={coupon.brandLogo} 
                            alt={coupon.store || coupon.brand} 
                            className="w-[48px] h-[48px] object-contain mix-blend-multiply group-hover:scale-110 transition-transform" 
                            onError={(e) => {
                              e.currentTarget.style.display = 'none';
                              const nextSibling = e.currentTarget.nextElementSibling as HTMLElement;
                              if (nextSibling) {
                                nextSibling.style.display = 'block';
                                nextSibling.classList.remove('hidden');
                              }
                            }}
                          />
                          <Tag className="w-8 h-8 text-slate-300 hidden" />
                        </>
                      ) : (
                        <Tag className="w-8 h-8 text-slate-300" />
                      )}
                    </div>

                    {/* Info block */}
                    <div className="flex-1 text-center sm:text-left w-full">
                      <div className="flex items-center justify-center sm:justify-start gap-2 mb-2">
                        <span className="text-[10px] font-black text-[#FF9800] uppercase tracking-[0.2em]">{coupon.store || coupon.brand || 'Offer'}</span>
                        {coupon.verifiedAt && (
                          <div className="flex items-center gap-1 bg-emerald-50 text-emerald-600 px-2 py-0.5 rounded-full text-[9px] font-black uppercase tracking-tight">
                            <ShieldCheck className="w-3 h-3" />
                            {verifiedLabel}
                          </div>
                        )}
                      </div>
                      <h3 className="font-['Manrope'] font-bold text-[18px] text-[#1A1C1C] leading-[24px] mb-2 line-clamp-2 group-hover:text-[#FF9800] transition-colors">
                        {coupon.title}
                      </h3>
                      <div className="flex flex-wrap items-center justify-center sm:justify-start gap-4 text-[12px] font-['Manrope'] font-medium">
                        <span className={`flex items-center gap-1 ${isExpiringSoon ? 'text-orange-500 font-bold' : 'text-slate-500'}`}>
                          <Clock className="w-3.5 h-3.5" />
                          {isExpiringSoon ? 'Expiring Soon' : 'Active Offer'}
                        </span>
                      </div>
                    </div>

                    {/* Action block */}
                    <div className="w-full sm:w-auto shrink-0 flex items-center justify-center border-t sm:border-t-0 sm:border-l border-slate-100 pt-4 sm:pt-0 sm:pl-6 border-dashed">
                      <button
                        className={`flex items-center gap-2 px-6 py-3 rounded-xl font-['Manrope'] font-bold text-[14px] transition-colors w-full sm:w-auto min-w-[140px] justify-center ${coupon.code
                          ? 'bg-[#FF9800] hover:bg-[#F97316] text-white group-hover:shadow-[0px_10px_20px_rgba(255,152,0,0.3)]'
                          : 'bg-slate-100 hover:bg-slate-200 text-[#1A1C1C]'
                          }`}
                      >
                        {coupon.code ? coupon.code : 'Get Deal'}
                        {coupon.code ? <Copy className="w-4 h-4 opacity-70 group-hover:opacity-100 transition-opacity" /> : <Zap className="w-4 h-4 fill-current" />}
                      </button>
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
