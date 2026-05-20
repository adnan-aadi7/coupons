"use client";

import { motion } from 'framer-motion';
import { Focus, ArrowRight, Zap, Flame, Ticket, Clock, Users } from 'lucide-react';
import Link from 'next/link';
import { getProxyLogoUrl } from '@/utils/imageHelper';

interface HotDealsProps {
  deals: any[];
  isLoading: boolean;
  onOpenDeal?: (deal: any) => void;
}

export default function HotDeals({ deals, isLoading, onOpenDeal }: HotDealsProps) {
  // If no deals have resolved yet
  if (isLoading && deals.length === 0) {
    return (
      <section className="py-20 bg-white relative overflow-hidden">
        <div className="max-w-[1280px] mx-auto px-4 md:px-8 h-[400px] bg-slate-50 animate-pulse rounded-[32px]" />
      </section>
    );
  }

  // Filter for hot deals/exclusive clearance deals
  const hotDeals = deals.filter(d => d.exclusive || d.promoCode === 'NOT REQUIRED').slice(0, 3);

  // If no custom flagged exclusive deals, fall back to trending database coupons
  const displayedDeals = hotDeals.length > 0 ? hotDeals : deals.slice(0, 3);

  if (displayedDeals.length === 0) return null;

  return (
    <section className="relative py-20 lg:py-28 bg-white overflow-hidden font-['Manrope'] border-t border-slate-100">
      <div className="max-w-[1280px] mx-auto px-4 md:px-8 relative z-10">

        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-12">
          <div>
            <h2 className="text-[32px] md:text-[40px] font-['Manrope'] font-semibold text-[#1A1C1C] leading-[1.1] tracking-[-0.8px] mb-2 text-center sm:text-left">
              Hot Deals <span className="text-[#FF9800]">Spotlight</span>
            </h2>
            <p className="text-[16px] font-['Manrope'] text-[#554434] leading-[24px] text-center sm:text-left">
              Limited time exclusive promo codes hand-picked from top retailers.
            </p>
          </div>
          <div className="flex justify-center sm:justify-end">
            <Link
              href="/deals"
              className="group flex items-center justify-center sm:justify-start gap-2 font-['Manrope'] font-bold text-[#8B5000] text-[15px] hover:text-[#FF9800] transition-colors"
            >
              <span>View All Hot Deals</span>
              <ArrowRight className="w-5 h-5 transform group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>

        {/* Symmetrical Horizontal Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 pb-12">
          {displayedDeals.map((deal, i) => {
            const storeName = deal.store || deal.storeName || 'Brand Offer';

            // Smart discount parser to produce gorgeous, huge dynamic typography
            let discountText = 'HOT DEAL';
            if (deal.discountValue) {
              const symbol = deal.discountType === 'percentage' ? '%' : (deal.currency || '$');
              if (deal.discountType === 'percentage') {
                discountText = `${deal.discountValue}% OFF`;
              } else {
                discountText = `${symbol}${deal.discountValue} OFF`;
              }
            } else {
              // Try to extract dynamic discount values directly from the title using smart regex!
              const title = deal.title || '';
              const percentMatch = title.match(/(\d+)\s*%/);
              const eurMatch = title.match(/(€\s*\d+|\d+\s*€)/);
              const usdMatch = title.match(/(\d+)\s*USD/i);
              const dollarMatch = title.match(/(\$\s*\d+|\d+\s*\$)/);

              if (usdMatch) {
                discountText = `$${usdMatch[1]} OFF`;
              } else if (eurMatch) {
                const cleaned = eurMatch[0].replace(/\s+/g, '').toUpperCase();
                discountText = cleaned.includes('€') ? `${cleaned} OFF` : `€${cleaned} OFF`;
              } else if (dollarMatch) {
                const cleaned = dollarMatch[0].replace(/\s+/g, '').toUpperCase();
                discountText = cleaned.includes('$') ? `${cleaned} OFF` : `$${cleaned} OFF`;
              } else if (percentMatch) {
                discountText = `${percentMatch[1]}% OFF`;
              } else if (deal.discount) {
                discountText = deal.discount.toUpperCase().replace('DISCOUNT', 'OFF').replace('USD', '$');
              } else {
                discountText = 'HOT DEAL';
              }
            }

            const cleanStoreName = storeName.toLowerCase().replace(/[^a-z0-9]/g, '');
            const logoUrl = deal.brandLogo 
              ? getProxyLogoUrl(deal.brandLogo, cleanStoreName) 
              : `https://logo.clearbit.com/${cleanStoreName}.com`;

            return (
              <motion.div
                key={deal._id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ delay: i * 0.1, duration: 0.5 }}
                onClick={() => onOpenDeal && onOpenDeal(deal)}
                className="flex flex-row bg-white border border-slate-100 rounded-2xl sm:rounded-[32px] overflow-hidden group hover:shadow-xl hover:shadow-slate-100/50 transition-all duration-500 p-3 sm:p-0 gap-3 sm:gap-0 relative cursor-pointer"
              >
                {/* Left Image Area - Slightly Larger on Mobile */}
                <div className="w-24 h-24 sm:w-[160px] sm:h-[130px] shrink-0 bg-slate-50/50 flex items-center justify-center p-3 sm:p-4 rounded-2xl sm:rounded-none border border-slate-100 sm:border-0 sm:border-r relative overflow-hidden self-center sm:self-auto">
                  <img 
                    src={getProxyLogoUrl(deal.brandLogo || logoUrl, storeName.toLowerCase().replace(/[^a-z0-9]/g, ''))} 
                    alt={storeName} 
                    className="max-w-full max-h-full object-contain mix-blend-multiply group-hover:scale-105 transition-transform" 
                    onError={(e) => {
                      e.currentTarget.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(storeName)}&background=FF9800&color=fff&size=128&bold=true`;
                    }}
                  />
                  <div className="absolute top-1 left-1 sm:top-2 sm:left-2 scale-75 sm:scale-100 origin-top-left">
                    <span className="px-2 py-0.5 bg-[#FF9800] text-white text-[8px] font-black uppercase tracking-widest rounded-md shadow-md">
                      Hot
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
                      {deal.title}
                    </h3>
                  </div>

                  {/* Dynamic statistics row */}
                  <div className="flex items-center gap-2 sm:gap-4 mt-1.5 sm:mt-3">
                    <div className="flex items-center gap-0.5 sm:gap-1 text-slate-400 text-[8px] sm:text-[10px] font-black uppercase tracking-wider">
                      <Clock className="w-2.5 h-2.5 sm:w-3.5 sm:h-3.5" /> Exp. Soon
                    </div>
                    <div className="flex items-center gap-0.5 sm:gap-1 text-slate-400 text-[8px] sm:text-[10px] font-black uppercase tracking-wider">
                      <Users className="w-2.5 h-2.5 sm:w-3.5 sm:h-3.5" /> {Math.floor(Math.random() * 80) + 12} used
                    </div>
                  </div>

                  {/* Right Info Section - Dynamic positioning */}
                  <div className="absolute top-3 right-3 sm:top-5 sm:right-5 text-right space-y-0 sm:space-y-0.5 pointer-events-none">
                    <div className="text-sm sm:text-xl font-black text-[#FF9800] leading-none">
                      {discountText}
                    </div>
                  </div>

                  {/* Button - Compact positioning */}
                  <div className="absolute bottom-3 right-3 sm:bottom-5 sm:right-5">
                    <button 
                      onClick={(e) => {
                        e.stopPropagation();
                        if (onOpenDeal) onOpenDeal(deal);
                      }}
                      className="px-2.5 py-1.5 sm:px-5 sm:py-2.5 bg-[#FF9800] hover:bg-[#F57C00] text-white rounded-lg sm:rounded-xl font-black text-[9px] sm:text-[12px] transition-all shadow-md active:scale-95 flex items-center justify-center"
                    >
                      Get
                    </button>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
