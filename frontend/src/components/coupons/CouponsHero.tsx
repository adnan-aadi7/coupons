"use client";

import { motion } from 'framer-motion';
import { Search, Sparkles, Flame, Tag } from 'lucide-react';

interface CouponsHeroProps {
  onSearch: (query: string) => void;
  value?: string;
  title?: string;
  description?: string;
  tag?: string;
}

export default function CouponsHero({ onSearch, value = '', title, description, tag }: CouponsHeroProps) {
  const defaultTag = tag || "Latest Offers & Deals";
  const defaultTitle = title || "Discover Super Savings";
  const defaultDesc = description || "Access thousands of verified coupon codes and exclusive discounts from top retailers around the globe.";

  return (
    <div className="text-center space-y-6 sm:space-y-8 mb-10 sm:mb-16 px-4">
      <motion.div 
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="inline-flex items-center gap-2 px-4 py-2 bg-orange-50 border border-orange-100 rounded-full text-[#FF9800] text-[11px] font-black uppercase tracking-[2px] shadow-sm mb-2"
      >
        <Tag className="w-4 h-4 fill-[#FF9800]" />
        {defaultTag}
      </motion.div>
      
      <h1 className="text-[32px] sm:text-[48px] md:text-[64px] font-black text-[#1A1C1C] tracking-tight leading-tight px-2">
        {defaultTitle}
      </h1>
      
      <p className="text-slate-500 text-sm sm:text-[18px] max-w-[700px] mx-auto leading-relaxed font-medium px-4">
        {defaultDesc}
      </p>

      {/* Modern Search */}
      <div className="relative max-w-[750px] mx-auto mt-8 sm:mt-12 group">
        <div className="absolute left-5 sm:left-7 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-[#FF9800] transition-colors">
          <Search className="w-5 h-5 sm:w-6 sm:h-6" />
        </div>
        <input 
          type="text"
          value={value}
          placeholder="Search by brand or store..."
          className="w-full h-[60px] sm:h-[76px] bg-white rounded-2xl sm:rounded-3xl pl-12 sm:pl-16 pr-16 sm:pr-48 shadow-xl shadow-slate-100/50 border-2 border-transparent focus:border-[#FF9800]/20 focus:ring-0 transition-all text-sm sm:text-lg font-bold text-[#1A1C1C] placeholder:text-slate-300"
          onChange={(e) => onSearch(e.target.value)}
        />
        <button className="absolute right-2 sm:right-3 top-1/2 -translate-y-1/2 h-[44px] sm:h-[56px] px-4 sm:px-10 bg-[#1A1C1C] text-white rounded-xl sm:rounded-2xl font-black text-[11px] sm:text-[14px] uppercase tracking-widest hover:bg-[#FF9800] transition-all shadow-lg shadow-black/10 flex items-center justify-center gap-2">
          <span className="hidden sm:inline">Find Deals</span>
          <Search className="w-4 h-4 sm:hidden" />
        </button>
      </div>
    </div>
  );
}
