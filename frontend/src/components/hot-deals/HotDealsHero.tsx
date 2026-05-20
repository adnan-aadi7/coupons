"use client";

import { TrendingUp, Zap, Search } from 'lucide-react';
import { motion } from 'framer-motion';

interface HotDealsHeroProps {
  onSearch: (query: string) => void;
}

export default function HotDealsHero({ onSearch }: HotDealsHeroProps) {
  return (
    <div className="relative overflow-hidden bg-white py-12 md:py-16 border-b border-slate-100 mb-12 text-center">
      {/* Background Soft Ambient Light Glows */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] md:w-[600px] h-[300px] md:h-[600px] bg-amber-400/5 rounded-full blur-[80px] md:blur-[120px] pointer-events-none" />
      <div className="absolute top-10 left-10 w-[200px] h-[200px] bg-[#E53935]/5 rounded-full blur-[60px] pointer-events-none" />

      <div className="max-w-[900px] mx-auto px-6 relative z-10 space-y-6 md:space-y-8">
        
        {/* Main Luxury Heading (Centered, smaller size) */}
        <div className="space-y-3">
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="text-[32px] sm:text-[48px] md:text-[60px] font-black text-[#1A1C1C] leading-[1.1] tracking-tighter"
          >
            THE HOTTEST <br className="sm:hidden" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#E53935] via-[#FF5722] to-[#FF9800] animate-shimmer">DEALS UNLOCKED.</span>
          </motion.h1>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.6 }}
            className="text-slate-400 text-sm sm:text-base md:text-lg font-medium max-w-[620px] mx-auto leading-relaxed"
          >
            Gain instant access to high-frequency discount codes and flash sales. <br className="hidden sm:inline" />
            Curated daily for premium savings on world-class global brands.
          </motion.p>
        </div>

        {/* Premium Soft Search Bar (Centered) */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="relative max-w-[620px] mx-auto group"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-[#FFD700]/10 to-[#FF4500]/10 rounded-[24px] blur-xl opacity-30 group-hover:opacity-75 transition-opacity duration-500 pointer-events-none" />
          
          <div className="relative flex items-center">
            <div className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-[#FF9800] transition-colors">
              <Search className="w-5 h-5 sm:w-6 h-6" />
            </div>
            <input
              type="text"
              placeholder="Search specific flash deals..."
              onChange={(e) => onSearch(e.target.value)}
              className="w-full h-[60px] sm:h-[68px] bg-white rounded-2xl sm:rounded-[24px] pl-14 pr-16 sm:pr-40 border border-slate-100 focus:border-[#FF9800]/40 shadow-[0_15px_30px_rgba(0,0,0,0.02)] focus:shadow-[0_15px_35px_rgba(255,152,0,0.06)] focus:ring-4 focus:ring-[#FF9800]/5 transition-all text-sm sm:text-base font-bold text-[#1A1C1C] placeholder:text-slate-300 outline-none"
            />
            <button className="absolute right-2 top-1/2 -translate-y-1/2 h-[46px] sm:h-[52px] px-6 sm:px-8 bg-[#1A1C1C] hover:bg-[#E53935] text-white rounded-xl sm:rounded-[18px] font-black text-[11px] sm:text-xs uppercase tracking-widest active:scale-95 transition-all flex items-center justify-center gap-2 border border-slate-100/50">
              <span className="hidden sm:inline">Search</span>
              <Search className="w-4 h-4 sm:hidden" />
            </button>
          </div>
        </motion.div>

        {/* Performance Indicators (Centered) */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="flex flex-row items-center justify-center gap-6 sm:gap-12 pt-2"
        >
          {/* Stat 1 */}
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 sm:w-10 sm:h-10 bg-amber-500/[0.06] rounded-xl flex items-center justify-center border border-amber-500/10 text-[#FF9800] shrink-0">
              <TrendingUp className="w-4 h-4 sm:w-5 sm:h-5" />
            </div>
            <div className="text-left">
              <div className="text-[8px] font-black text-slate-400 uppercase tracking-wider mb-0.5">Live Activity</div>
              <div className="text-xs sm:text-sm font-black text-[#1A1C1C] tracking-tight">
                12.4K <span className="text-[#FF9800] text-[8px] font-bold ml-0.5">ACTIVE</span>
              </div>
            </div>
          </div>

          <div className="h-6 w-px bg-slate-200" />

          {/* Stat 2 */}
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 sm:w-10 sm:h-10 bg-[#E53935]/[0.06] rounded-xl flex items-center justify-center border border-[#E53935]/10 text-[#E53935] shrink-0">
              <Zap className="w-4 h-4 sm:w-5 sm:h-5 fill-current" />
            </div>
            <div className="text-left">
              <div className="text-[8px] font-black text-slate-400 uppercase tracking-wider mb-0.5">Assets Saved</div>
              <div className="text-xs sm:text-sm font-black text-[#1A1C1C] tracking-tight">
                $42,500 <span className="text-emerald-500 text-[8px] font-bold ml-0.5">TODAY</span>
              </div>
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
          animation: shimmer 6s ease infinite;
        }
      `}} />
    </div>
  );
}
