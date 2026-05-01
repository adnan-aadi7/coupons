"use client";

import { Wallet, Coins, ArrowRight, ShieldCheck, Sparkles } from 'lucide-react';
import { motion } from 'framer-motion';

export default function CashbackHero() {
  return (
    <div className="pt-20 pb-12 text-center space-y-8">
      <motion.div 
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="inline-flex items-center gap-3 px-6 py-2 rounded-full bg-slate-50 border border-slate-100"
      >
        <Sparkles className="w-4 h-4 text-[#FF9800]" />
        <span className="text-[12px] font-black uppercase tracking-widest text-[#1A1C1C]">Member Exclusive Rewards</span>
      </motion.div>

      <div className="space-y-4">
        <motion.h1 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-[48px] md:text-[72px] font-black text-[#1A1C1C] leading-[1.1] tracking-tighter"
        >
          Maximize Your <span className="text-[#FF9800]">Returns.</span>
        </motion.h1>

        <motion.p 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-slate-400 text-lg md:text-xl font-medium max-w-[700px] mx-auto leading-relaxed"
        >
          Discover today's highest-performing cashback offers from our premium partner network.
          Earn real cash back on every transaction, guaranteed.
        </motion.p>
      </div>

      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="flex items-center justify-center gap-12 pt-6"
      >
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-emerald-50 rounded-xl flex items-center justify-center text-emerald-500">
            <Wallet className="w-5 h-5" />
          </div>
          <div className="text-left">
            <div className="text-[10px] font-black text-slate-300 uppercase tracking-widest">Payouts</div>
            <div className="text-[15px] font-black text-[#1A1C1C]">100% Guaranteed</div>
          </div>
        </div>
        <div className="h-10 w-px bg-slate-100" />
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-orange-50 rounded-xl flex items-center justify-center text-[#FF9800]">
            <ShieldCheck className="w-5 h-5" />
          </div>
          <div className="text-left">
            <div className="text-[10px] font-black text-slate-300 uppercase tracking-widest">Security</div>
            <div className="text-[15px] font-black text-[#1A1C1C]">Bank-Level Trust</div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
