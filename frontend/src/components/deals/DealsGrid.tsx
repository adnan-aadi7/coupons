"use client";

import { motion } from 'framer-motion';
import { Clock, Users, Zap, ShieldCheck, ArrowRight } from 'lucide-react';

interface DealsGridProps {
  coupons: any[];
  isLoading: boolean;
  onOpenDeal: (coupon: any) => void;
}

export default function DealsGrid({ coupons, isLoading, onOpenDeal }: DealsGridProps) {
  if (isLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {[1,2,3,4].map(i => <div key={i} className="h-80 bg-slate-50 rounded-[40px] animate-pulse" />)}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {coupons.map((coupon, idx) => (
        <motion.div 
          key={coupon._id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: idx * 0.05 }}
          className="bg-white border border-slate-100 rounded-[40px] overflow-hidden group hover:shadow-2xl hover:shadow-slate-100 transition-all duration-500 flex flex-col h-full"
        >
          {/* Top Image Area - More Compact */}
          <div className="h-[200px] w-full relative bg-slate-100 overflow-hidden">
            <img 
              src={coupon.image || `https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?auto=format&fit=crop&w=600&q=80`} 
              alt={coupon.title}
              className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
            />
            
            {/* Store Logo Floating */}
            <div className="absolute top-4 left-4 z-20">
              <div className="bg-white rounded-xl p-1.5 shadow-lg border border-slate-100">
                <img 
                  src={`https://logo.clearbit.com/${coupon.store?.toLowerCase().replace(/\s+/g, '') || 'shop'}.com`} 
                  alt={coupon.store}
                  className="w-8 h-8 object-contain"
                  onError={(e: any) => e.target.src = 'https://www.google.com/s2/favicons?domain=shop.com&sz=64'}
                />
              </div>
            </div>

            <div className="absolute top-4 right-4 z-20">
              <span className="px-3 py-1 bg-[#1A1C1C]/80 backdrop-blur-md text-white text-[9px] font-black uppercase tracking-widest rounded-lg">
                {coupon.store}
              </span>
            </div>
          </div>

          {/* Content Area - Optimized for Grid */}
          <div className="p-8 flex flex-col flex-1 relative">
            <div className="space-y-3 mb-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1.5 text-[#FF9800] text-[9px] font-black uppercase tracking-widest">
                  <ShieldCheck className="w-3.5 h-3.5" /> Verified
                </div>
                <div className="text-[20px] font-black text-[#FF9800]">
                  {coupon.discountValue || 'EXTRA'}
                </div>
              </div>
              
              <h3 className="text-xl font-black text-[#1A1C1C] leading-tight line-clamp-2 group-hover:text-[#FF9800] transition-colors uppercase h-12">
                {coupon.title}
              </h3>
              <p className="text-slate-400 font-bold text-[13px] leading-relaxed line-clamp-2 h-10">
                {coupon.description || "Limited time offer. Activate now and save instantly."}
              </p>
            </div>

            {/* Bottom Info & Action */}
            <div className="mt-auto space-y-4">
              <div className="flex items-center justify-between py-4 border-t border-slate-50">
                <div className="flex items-center gap-1.5 text-slate-300 text-[10px] font-bold">
                  <Clock className="w-3.5 h-3.5" /> Oct 2024
                </div>
                <div className="flex items-center gap-1.5 text-slate-300 text-[10px] font-bold">
                  <Users className="w-3.5 h-3.5" /> {Math.floor(Math.random() * 500)} Uses
                </div>
              </div>

              <button 
                onClick={() => onOpenDeal(coupon)}
                className="w-full py-4 bg-[#1A1C1C] text-white rounded-2xl font-black text-[12px] uppercase tracking-widest hover:bg-[#FF9800] transition-all flex items-center justify-center gap-2 group-hover:shadow-xl"
              >
                {coupon.type === 'code' ? 'Get Code' : 'Activate Deal'}
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </div>
        </motion.div>
      ))}

      {coupons.length === 0 && !isLoading && (
        <div className="col-span-full py-20 text-center bg-slate-50 rounded-[48px] border-2 border-dashed border-slate-200">
          <p className="text-slate-400 font-bold italic">No deals found.</p>
        </div>
      )}
    </div>
  );
}
