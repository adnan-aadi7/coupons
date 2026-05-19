"use client";

import { Flame, TrendingUp, Zap, Search, Crown } from 'lucide-react';
import { motion } from 'framer-motion';

interface HotDealsHeroProps {
  onSearch: (query: string) => void;
}

export default function HotDealsHero({ onSearch }: HotDealsHeroProps) {
  return (
    <div className="relative overflow-hidden px-6 py-4 sm:px-12 sm:py-6 md:px-24 md:py-8 text-[#1A1C1C] border border-slate-100 rounded-[32px] sm:rounded-[64px] mb-8 sm:mb-12">
      {/* Ethereal Glow Accents */}
      <div className="absolute top-0 right-0 w-[300px] sm:w-[500px] h-[300px] sm:h-[500px] bg-orange-500/5 rounded-full blur-[80px] sm:blur-[120px] -translate-y-1/2 translate-x-1/2 pointer-events-none" />
      <div className="absolute -bottom-48 -left-48 w-[300px] sm:w-[500px] h-[300px] sm:h-[500px] bg-red-500/5 rounded-full blur-[80px] sm:blur-[120px] pointer-events-none opacity-50" />

      <div className="relative z-10 max-w-[1100px] mx-auto text-center space-y-8 sm:space-y-12">
        {/* Luxury Badge */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          className="inline-flex items-center gap-3 px-6 py-2.5 rounded-full bg-white shadow-xl shadow-slate-100 border border-slate-50"
        >

        </motion.div>

        {/* Main Luxury Heading */}
        <div className="space-y-4">
          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="text-[32px] sm:text-[64px] md:text-[100px] font-black leading-[0.95] tracking-tighter px-2"
          >
            THE <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FFD700] via-[#FF9800] to-[#FF4500] animate-shimmer">ULTIMATE</span> <br />
            DEAL VAULT.
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.8 }}
            className="text-slate-400 text-sm sm:text-xl md:text-2xl font-medium max-w-[800px] mx-auto leading-relaxed px-4"
          >
            Access a high-frequency selection of elite-tier discounts, <span className="hidden sm:inline"><br /></span>
            manually curated for the world's most disciplined shoppers.
          </motion.p>
        </div>

        {/* Premium Search Bar */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.8 }}
          className="relative max-w-[750px] mx-auto group px-2"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-[#FFD700]/10 to-[#FF4500]/10 rounded-3xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
          <div className="relative flex items-center">
            <div className="absolute left-5 sm:left-7 top-1/2 -translate-y-1/2 text-[#FF9800]">
              <Search className="w-5 h-5 sm:w-6 sm:h-6" />
            </div>
            <input
              type="text"
              placeholder="Search specific vault deals..."
              onChange={(e) => onSearch(e.target.value)}
              className="w-full h-[60px] sm:h-[84px] bg-white rounded-2xl sm:rounded-[28px] pl-12 sm:pl-18 pr-16 sm:pr-48 border border-slate-100 shadow-2xl shadow-slate-200/50 focus:ring-2 focus:ring-[#FF9800]/20 transition-all text-sm sm:text-lg font-bold text-[#1A1C1C] placeholder:text-slate-300 outline-none"
            />
            <button className="absolute right-2 sm:right-3 top-1/2 -translate-y-1/2 h-[44px] sm:h-[60px] px-4 sm:px-10 bg-[#1A1C1C] hover:bg-[#FF9800] text-white rounded-xl sm:rounded-[20px] font-black text-[11px] sm:text-[13px] uppercase tracking-widest shadow-xl transition-all flex items-center justify-center gap-2">
              <span className="hidden sm:inline">Search Vault</span>
              <Search className="w-4 h-4 sm:hidden" />
            </button>
          </div>
        </motion.div>

        {/* Performance Indicators */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.8 }}
          className="flex flex-row items-center justify-center gap-3 xs:gap-6 sm:gap-16 pt-4"
        >
          <div className="flex items-center gap-2 xs:gap-4 sm:gap-5">
            <div className="w-9 h-9 xs:w-12 xs:h-12 sm:w-14 sm:h-14 bg-white rounded-xl sm:rounded-2xl flex items-center justify-center border border-slate-100 text-[#FFD700] shadow-xl shadow-slate-100 shrink-0">
              <TrendingUp className="w-5 h-5 xs:w-6 xs:h-6 sm:w-7 sm:h-7" />
            </div>
            <div className="text-left">
              <div className="text-[8px] xs:text-[9px] sm:text-[10px] font-black text-slate-400 uppercase tracking-[0.1em] xs:tracking-[0.2em] mb-0.5 xs:mb-1">Live Activity</div>
              <div className="text-xs xs:text-lg sm:text-2xl font-black text-[#1A1C1C] tracking-tight whitespace-nowrap">12.4K <span className="text-slate-300 text-[8px] xs:text-xs sm:text-sm font-bold">ACTIVE</span></div>
            </div>
          </div>

          <div className="h-8 xs:h-10 sm:h-12 w-px bg-slate-200/60" />

          <div className="flex items-center gap-2 xs:gap-4 sm:gap-5">
            <div className="w-9 h-9 xs:w-12 xs:h-12 sm:w-14 sm:h-14 bg-white rounded-xl sm:rounded-2xl flex items-center justify-center border border-slate-100 text-orange-500 shadow-xl shadow-slate-100 shrink-0">
              <Zap className="w-5 h-5 xs:w-6 xs:h-6 sm:w-7 sm:h-7 fill-current" />
            </div>
            <div className="text-left">
              <div className="text-[8px] xs:text-[9px] sm:text-[10px] font-black text-slate-400 uppercase tracking-[0.1em] xs:tracking-[0.2em] mb-0.5 xs:mb-1">Assets Saved</div>
              <div className="text-xs xs:text-lg sm:text-2xl font-black text-[#1A1C1C] tracking-tight whitespace-nowrap">$42,500 <span className="text-slate-300 text-[8px] xs:text-xs sm:text-sm font-bold">TODAY</span></div>
            </div>
          </div>
        </motion.div>
      </div>

      <style dangerouslySetInnerHTML={{
        __html: `
        @keyframes shimmer {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }
        .animate-shimmer {
          background-size: 200% 200%;
          animation: shimmer 12s ease infinite;
        }
      `}} />
    </div>
  );
}
