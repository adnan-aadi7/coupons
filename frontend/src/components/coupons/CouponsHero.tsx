"use client";

import { motion } from 'framer-motion';
import { Search, Sparkles, Flame, Tag } from 'lucide-react';

interface CouponsHeroProps {
  onSearch: (query: string) => void;
}

export default function CouponsHero({ onSearch }: CouponsHeroProps) {
  return (
    <div className="text-center space-y-8 mb-16">
      <motion.div 
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="inline-flex items-center gap-2 px-4 py-2 bg-orange-50 border border-orange-100 rounded-full text-[#FF9800] text-[11px] font-black uppercase tracking-[2px] shadow-sm mb-4"
      >
        <Tag className="w-4 h-4 fill-[#FF9800]" />
        Latest Offers & Deals
      </motion.div>
      
      <h1 className="text-[48px] md:text-[64px] font-black text-[#1A1C1C] tracking-tight leading-tight">
        Discover <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FF9800] to-[#F57C00]">Super Savings</span>
      </h1>
      
      <p className="text-slate-500 text-[18px] max-w-[700px] mx-auto leading-relaxed font-medium">
        Access thousands of verified coupon codes and exclusive discounts from top retailers around the globe.
      </p>

      {/* Modern Search */}
      <div className="relative max-w-[750px] mx-auto mt-12 group">
        <div className="absolute left-7 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-[#FF9800] transition-colors">
          <Search className="w-6 h-6" />
        </div>
        <input 
          type="text"
          placeholder="Search by brand or store name..."
          className="w-full h-[76px] bg-white rounded-3xl pl-16 pr-48 shadow-xl shadow-slate-100/50 border-2 border-transparent focus:border-[#FF9800]/20 focus:ring-0 transition-all text-lg font-bold text-[#1A1C1C] placeholder:text-slate-300"
          onChange={(e) => onSearch(e.target.value)}
        />
        <button className="absolute right-3 top-1/2 -translate-y-1/2 h-[56px] px-10 bg-[#1A1C1C] text-white rounded-2xl font-black text-[14px] uppercase tracking-widest hover:bg-[#FF9800] transition-all shadow-lg shadow-black/10">
          Find Deals
        </button>
      </div>
    </div>
  );
}
