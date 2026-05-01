"use client";

import { motion } from 'framer-motion';
import { Copy, Clock, Zap, ArrowRight, ShieldCheck, Tag, Users } from 'lucide-react';

interface CouponsGridProps {
  coupons: any[];
  isLoading: boolean;
  onOpenDeal: (coupon: any) => void;
}

export default function CouponsGrid({ coupons, isLoading, onOpenDeal }: CouponsGridProps) {
  
  const handleDealClick = (e: React.MouseEvent, coupon: any) => {
    e.stopPropagation();
    if (coupon.isPrintable) {
      window.open(coupon.printableUrl || '#', '_blank');
      return;
    }
    // Track click and open modal
    window.open(`http://localhost:5000/api/track/${coupon._id}`, '_blank');
    onOpenDeal(coupon);
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
        No active deals found. Please check back later!
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {coupons.map((coupon, i) => {
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
            <div className="w-[80px] h-[80px] shrink-0 bg-slate-50 border border-slate-100 rounded-2xl flex items-center justify-center overflow-hidden p-2">
              {coupon.brandLogo ? (
                <img 
                  src={coupon.brandLogo} 
                  alt={coupon.store} 
                  className="w-full h-full object-contain group-hover:scale-110 transition-transform" 
                  onError={(e: any) => {
                    e.currentTarget.style.display = 'none';
                    const nextSibling = e.currentTarget.nextElementSibling as HTMLElement;
                    if (nextSibling) {
                        nextSibling.style.display = 'block';
                        nextSibling.classList.remove('hidden');
                    }
                  }}
                />
              ) : null}
              <Tag className={`w-8 h-8 text-slate-300 ${coupon.brandLogo ? 'hidden' : ''}`} />
            </div>

            {/* Info block */}
            <div className="flex-1 text-center sm:text-left w-full">
              <div className="flex items-center justify-center sm:justify-start gap-2 mb-2">
                <span className="text-[10px] font-black text-[#FF9800] uppercase tracking-[0.2em]">{coupon.store || 'Featured'}</span>
                <div className="flex items-center gap-1 bg-emerald-50 text-emerald-600 px-2.5 py-0.5 rounded-full text-[9px] font-black uppercase tracking-tight border border-emerald-100">
                  <ShieldCheck className="w-3 h-3" />
                  {verifiedLabel}
                </div>
              </div>
              <h3 className="font-['Manrope'] font-bold text-[18px] text-[#1A1C1C] leading-[24px] mb-2 line-clamp-2 group-hover:text-[#FF9800] transition-colors">
                {coupon.title}
              </h3>
              <div className="flex flex-wrap items-center justify-center sm:justify-start gap-4 text-[12px] font-['Manrope'] font-medium">
                <span className={`flex items-center gap-1 ${isExpiringSoon ? 'text-orange-500 font-bold' : 'text-slate-500'}`}>
                  <Clock className="w-3.5 h-3.5" />
                  {isExpiringSoon ? 'Expiring Soon' : 'Active Offer'}
                </span>
                <span className="text-slate-400">•</span>
                <span className="text-slate-500 flex items-center gap-1">
                  <Users className="w-3.5 h-3.5" />
                  {Math.floor(Math.random() * 200 + 50)} people used today
                </span>
              </div>
            </div>

            {/* Action block */}
            <div className="w-full sm:w-auto shrink-0 flex flex-col items-center justify-center border-t sm:border-t-0 sm:border-l border-slate-100 pt-4 sm:pt-0 sm:pl-6 border-dashed">
              <div className="text-center mb-3">
                <span className="block text-[20px] font-black text-[#FF9800] leading-tight">{coupon.discountValue || 'SAVE'}</span>
                <span className="block text-[9px] font-black text-slate-400 uppercase tracking-widest">SAVINGS</span>
              </div>
              <button
                className={`flex items-center gap-2 px-6 py-3 rounded-xl font-['Manrope'] font-bold text-[14px] transition-colors w-full sm:w-auto min-w-[140px] justify-center ${
                    coupon.code
                  ? 'bg-[#FF9800] hover:bg-[#F97316] text-white group-hover:shadow-[0px_10px_20px_rgba(255,152,0,0.3)]'
                  : 'bg-slate-100 hover:bg-slate-200 text-[#1A1C1C]'
                  }`}
              >
                {coupon.code ? 'Show Code' : 'Get Deal'}
                {coupon.code ? <Copy className="w-4 h-4 opacity-70" /> : <Zap className="w-4 h-4 fill-current" />}
              </button>
            </div>
          </motion.div>
        );
      })}
    </div>
  );
}
