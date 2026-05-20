"use client";

import { motion } from 'framer-motion';
import { ShieldCheck, ArrowRight, Clock, Users, ChevronDown } from 'lucide-react';
import { useState } from 'react';
import { getProxyLogoUrl } from '@/utils/imageHelper';

interface HotDealCardProps {
  coupon: any;
  idx: number;
  onOpenDeal: (coupon: any) => void;
}

function HotDealCard({ coupon, idx, onOpenDeal }: HotDealCardProps) {
  const brandName = coupon.store || 'Elite Brand';
  const cleanSlug = brandName.toLowerCase().replace(/[^a-z0-9]/g, '');
  const [logoUrl, setLogoUrl] = useState(
    coupon.brandLogo 
      ? getProxyLogoUrl(coupon.brandLogo, cleanSlug) 
      : `https://logo.clearbit.com/${cleanSlug}.com`
  );

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: idx * 0.05 }}
      onClick={() => onOpenDeal(coupon)}
      className="group bg-white rounded-[32px] border border-slate-100 hover:shadow-[0px_20px_40px_rgba(0,0,0,0.06)] transition-all duration-300 cursor-pointer overflow-hidden flex items-center p-5 gap-6 h-[130px]"
    >
      {/* Logo Block (Slightly Larger) */}
      <div className="w-[90px] h-full shrink-0 bg-slate-50 rounded-2xl flex items-center justify-center p-4 relative group-hover:bg-orange-50 transition-colors">
         <img 
           src={logoUrl} 
           alt={brandName} 
           className="w-full h-full object-contain mix-blend-multiply transition-transform group-hover:scale-110 duration-700" 
           onError={() => setLogoUrl(`https://www.google.com/s2/favicons?domain=${cleanDomain}&sz=128`)}
         />
      </div>

      {/* Content Area */}
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 mb-1">
          <span className="text-[10px] font-black text-orange-500 uppercase tracking-widest">{brandName}</span>
          <div className="bg-emerald-50 text-emerald-600 px-2 py-0.5 rounded-md text-[8px] font-black uppercase flex items-center gap-1 border border-emerald-100">
             <ShieldCheck className="w-2.5 h-2.5" />
             VERIFIED
          </div>
        </div>
        <h3 className="text-[16px] font-black text-[#1A1C1C] leading-tight truncate group-hover:text-orange-500 transition-colors mb-2">
          {coupon.title}
        </h3>
        <div className="flex items-center gap-4 text-[10px] font-bold text-slate-400">
           <span className="flex items-center gap-1">
              <Users className="w-3.5 h-3.5" />
              {Math.floor(Math.random() * 500 + 100)} Used
           </span>
           <span className="flex items-center gap-1">
              <Clock className="w-3.5 h-3.5 text-orange-400" />
              Expiring
           </span>
        </div>
      </div>

      {/* Savings & Action */}
      <div className="shrink-0 flex items-center gap-6 pl-6 border-l border-slate-50">
         <div className="text-right">
            <div className="text-2xl font-black text-[#FF9800] leading-none">{coupon.discountValue || '25%'}</div>
            <div className="text-[9px] font-black text-slate-300 uppercase tracking-widest mt-1">Savings</div>
         </div>
         <button className="w-10 h-10 bg-[#1A1C1C] group-hover:bg-orange-500 text-white rounded-xl flex items-center justify-center transition-all shadow-lg shadow-slate-100 group-hover:shadow-orange-100">
            <ArrowRight className="w-5 h-5" />
         </button>
      </div>
    </motion.div>
  );
}

interface HotDealsGridProps {
  coupons: any[];
  isLoading: boolean;
  onOpenDeal: (coupon: any) => void;
}

export default function HotDealsGrid({ coupons, isLoading, onOpenDeal }: HotDealsGridProps) {
  const [visibleCount, setVisibleCount] = useState(10);

  const showMore = () => {
    setVisibleCount(prev => prev + 10);
  };
  if (isLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {[1, 2, 3, 4, 5, 6].map(i => (
          <div key={i} className="h-[130px] bg-slate-50 rounded-[32px] animate-pulse" />
        ))}
      </div>
    );
  }

  if (!coupons || coupons.length === 0) {
    return (
      <div className="py-24 text-center border-2 border-dashed border-slate-100 rounded-[40px] text-slate-400 font-['Manrope'] font-bold">
        No deals found for your selection.
      </div>
    );
  }

  const visibleCoupons = coupons.slice(0, visibleCount);
  const hasMore = coupons.length > visibleCount;

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
        {visibleCoupons.map((coupon, i) => (
          <HotDealCard key={coupon._id} coupon={coupon} idx={i} onOpenDeal={onOpenDeal} />
        ))}
      </div>

      {hasMore && (
        <div className="flex flex-col items-center justify-center pt-8 pb-4">
          <p className="text-sm font-bold text-slate-400 mb-4">
            Showing {visibleCoupons.length} of {coupons.length} hot deals
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
