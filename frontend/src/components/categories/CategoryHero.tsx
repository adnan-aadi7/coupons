"use client";

import { motion } from 'framer-motion';
import { Search, Sparkles } from 'lucide-react';

interface CategoryHeroProps {
  onSearch: (query: string) => void;
}

export default function CategoryHero({ onSearch }: CategoryHeroProps) {
  return (
    <div className="text-center space-y-8 mb-20">
      <motion.div 
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="inline-flex items-center gap-2 px-4 py-2 bg-white border border-slate-100 rounded-full text-[#FF9800] text-[11px] font-black uppercase tracking-[2px] shadow-sm"
      >
        <Sparkles className="w-4 h-4" />
        Browse by Interest
      </motion.div>
      
      <h1 className="text-[48px] md:text-[64px] font-black text-[#1A1C1C] tracking-tight leading-tight">
        Shopping <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FF9800] to-[#F57C00]">Categories</span>
      </h1>
      
      <p className="text-slate-500 text-[18px] max-w-[600px] mx-auto leading-relaxed font-medium">
        Discover the best deals and cashback rewards across your favorite shopping categories.
      </p>

      {/* Search Bar */}
      <div className="relative max-w-[650px] mx-auto mt-12 group">
        <div className="absolute left-7 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-[#FF9800] transition-colors">
          <Search className="w-6 h-6" />
        </div>
        <input 
          type="text"
          placeholder="Search for a category..."
          className="w-full h-[76px] bg-white rounded-3xl pl-16 pr-10 shadow-xl shadow-slate-100/50 border-2 border-transparent focus:border-[#FF9800]/20 focus:ring-0 transition-all text-lg font-bold text-[#1A1C1C]"
          onChange={(e) => onSearch(e.target.value)}
        />
      </div>
    </div>
  );
}
