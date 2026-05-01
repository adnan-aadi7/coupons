"use client";

import { Flame, TrendingUp, Zap, Search, Crown } from 'lucide-react';
import { motion } from 'framer-motion';

interface HotDealsHeroProps {
  onSearch: (query: string) => void;
}

export default function HotDealsHero({ onSearch }: HotDealsHeroProps) {
  return (
    <div className="relative overflow-hidden p-12 md:p-24 text-[#1A1C1C] border border-slate-100 rounded-[64px] mb-12">
      {/* Ethereal Glow Accents */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-orange-500/5 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/2 pointer-events-none" />
      <div className="absolute -bottom-48 -left-48 w-[500px] h-[500px] bg-red-500/5 rounded-full blur-[120px] pointer-events-none opacity-50" />
      
      <div className="relative z-10 max-w-[1100px] mx-auto text-center space-y-12">
        {/* Luxury Badge */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          className="inline-flex items-center gap-3 px-6 py-2.5 rounded-full bg-white shadow-xl shadow-slate-100 border border-slate-50"
        >
          <div className="relative">
            <Crown className="w-5 h-5 text-[#FF9800]" />
            <div className="absolute inset-0 text-[#FF9800] blur-sm animate-pulse">
              <Crown className="w-5 h-5" />
            </div>
          </div>
          <span className="text-[11px] font-black uppercase tracking-[0.3em] text-slate-400">Exclusive Wealth Network</span>
        </motion.div>

        {/* Main Luxury Heading */}
        <div className="space-y-4">
          <motion.h1 
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="text-[64px] md:text-[100px] font-black leading-[0.95] tracking-tighter"
          >
            THE <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FFD700] via-[#FF9800] to-[#FF4500] animate-shimmer">ULTIMATE</span> <br /> 
            DEAL VAULT.
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.8 }}
            className="text-slate-400 text-xl md:text-2xl font-medium max-w-[800px] mx-auto leading-relaxed"
          >
            Access a high-frequency selection of elite-tier discounts, <br /> 
            manually curated for the world's most disciplined shoppers.
          </motion.p>
        </div>

        {/* Premium Search Bar */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.8 }}
          className="relative max-w-[750px] mx-auto group"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-[#FFD700]/10 to-[#FF4500]/10 rounded-3xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          <div className="relative flex items-center">
            <div className="absolute left-7 top-1/2 -translate-y-1/2 text-[#FF9800]">
              <Search className="w-6 h-6" />
            </div>
            <input 
              type="text"
              placeholder="Unlock specific deals by brand or category..."
              onChange={(e) => onSearch(e.target.value)}
              className="w-full h-[84px] bg-white rounded-[28px] pl-18 pr-48 border border-slate-100 shadow-2xl shadow-slate-200/50 focus:ring-2 focus:ring-[#FF9800]/20 transition-all text-lg font-bold text-[#1A1C1C] placeholder:text-slate-300"
            />
            <button className="absolute right-3 top-1/2 -translate-y-1/2 h-[60px] px-10 bg-[#1A1C1C] hover:bg-[#FF9800] text-white rounded-[20px] font-black text-[13px] uppercase tracking-widest shadow-xl transition-all">
              Search Vault
            </button>
          </div>
        </motion.div>

        {/* Performance Indicators */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.8 }}
          className="flex flex-wrap items-center justify-center gap-16 pt-4"
        >
          <div className="flex items-center gap-5">
            <div className="w-14 h-14 bg-white rounded-2xl flex items-center justify-center border border-slate-100 text-[#FFD700] shadow-xl shadow-slate-100">
              <TrendingUp className="w-7 h-7" />
            </div>
            <div className="text-left">
              <div className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-1">Live Activity</div>
              <div className="text-2xl font-black text-[#1A1C1C] tracking-tight">12.4K <span className="text-slate-200 text-sm">ACTIVE</span></div>
            </div>
          </div>
          
          <div className="h-12 w-px bg-slate-100 hidden md:block" />

          <div className="flex items-center gap-5">
             <div className="w-14 h-14 bg-white rounded-2xl flex items-center justify-center border border-slate-100 text-orange-500 shadow-xl shadow-slate-100">
               <Zap className="w-7 h-7 fill-current" />
             </div>
             <div className="text-left">
              <div className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-1">Assets Saved</div>
              <div className="text-2xl font-black text-[#1A1C1C] tracking-tight">$42,500 <span className="text-slate-200 text-sm">TODAY</span></div>
            </div>
          </div>
        </motion.div>
      </div>

      <style dangerouslySetInnerHTML={{ __html: `
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
