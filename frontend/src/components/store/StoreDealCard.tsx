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
      className="flex flex-col md:flex-row bg-white border border-slate-100 rounded-[48px] overflow-hidden group hover:shadow-2xl hover:shadow-slate-100 transition-all duration-500"
    >
      {/* Left Image Area */}
      <div className="w-full md:w-[320px] h-[240px] shrink-0 relative bg-slate-100 overflow-hidden">
        <img 
          src={coupon.image || `https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=600&q=80`} 
          alt={coupon.title}
          className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
        />
        <div className="absolute top-4 left-4">
          <span className="px-3 py-1 bg-[#FF9800] text-white text-[9px] font-black uppercase tracking-widest rounded-lg shadow-lg">
            {idx % 2 === 0 ? 'Limited Time' : 'Top Pick'}
          </span>
        </div>
      </div>

      {/* Content Area */}
      <div className="flex-1 p-10 flex flex-col justify-between relative">
        <div className="space-y-4">
          <h3 className="text-3xl font-black text-[#1A1C1C] leading-tight tracking-tight group-hover:text-[#FF9800] transition-colors uppercase">
            {coupon.title}
          </h3>
          <p className="text-slate-500 font-medium text-[16px] leading-relaxed max-w-[450px]">
            {coupon.description || "Save on all footwear, apparel and gear for the new season with this exclusive offer."}
          </p>
        </div>

        <div className="flex items-center gap-6 mt-8">
          <div className="flex items-center gap-1.5 text-slate-400 text-[11px] font-black uppercase tracking-widest">
            <Clock className="w-4 h-4" /> Exp. in 2 days
          </div>
          <div className="flex items-center gap-1.5 text-slate-400 text-[11px] font-black uppercase tracking-widest">
            <Users className="w-4 h-4" /> 1.2k used today
          </div>
        </div>

        {/* Right Info Section */}
        <div className="md:absolute md:top-10 md:right-10 text-right space-y-1">
          <div className="text-[32px] font-black text-[#FF9800] leading-none">
            {coupon.discountValue || "25%"}
          </div>
          <div className="text-[10px] font-black text-[#FF9800] uppercase tracking-widest opacity-60">
            {coupon.type === 'code' ? 'Discount' : 'Credit'}
          </div>
        </div>

        {/* Button */}
        <div className="md:absolute md:bottom-10 md:right-10 mt-8 md:mt-0">
          <button 
            onClick={() => onOpenDeal(coupon)}
            className="px-10 py-4 bg-[#1A1C1C] text-white rounded-[20px] font-black text-[14px] hover:bg-[#FF9800] transition-all shadow-xl shadow-black/10 active:scale-95"
          >
            {coupon.type === 'code' ? 'Show Code' : 'Activate Deal'}
          </button>
        </div>
      </div>
    </motion.div>
  );
}
