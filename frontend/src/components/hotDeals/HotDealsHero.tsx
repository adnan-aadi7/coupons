"use client";

import { Flame, TrendingUp, Zap, Star } from 'lucide-react';
import { motion } from 'framer-motion';

export default function HotDealsHero() {
  return (
    <div className="relative overflow-hidden bg-[#0A0A0A] rounded-[48px] p-12 md:p-24 text-white">
      {/* Premium Mesh Gradient Background */}
      <div className="absolute top-0 right-0 w-full h-full bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-orange-500/30 via-red-500/10 to-transparent pointer-events-none" />
      <div className="absolute -bottom-24 -left-24 w-[500px] h-[500px] bg-orange-600/10 rounded-full blur-[120px] pointer-events-none" />
      
      {/* Floating Animated Elements */}
      <motion.div 
        animate={{ y: [0, -20, 0], rotate: [0, 5, 0] }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-20 right-20 hidden lg:block"
      >
        <div className="bg-white/5 backdrop-blur-xl border border-white/10 p-6 rounded-[32px] shadow-2xl">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-orange-500 rounded-2xl flex items-center justify-center">
              <Star className="w-6 h-6 text-white fill-current" />
            </div>
            <div>
              <div className="text-[10px] font-black text-orange-400 uppercase tracking-widest">Top Offer</div>
              <div className="text-lg font-black">75% OFF Nike</div>
            </div>
          </div>
        </div>
      </motion.div>

      <div className="relative z-10 max-w-[900px] space-y-10">
        <motion.div 
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          className="inline-flex items-center gap-3 px-6 py-2.5 rounded-full bg-gradient-to-r from-orange-500/20 to-red-500/20 backdrop-blur-md border border-orange-500/30"
        >
          <div className="relative">
            <Flame className="w-5 h-5 text-orange-500" />
            <div className="absolute inset-0 text-orange-500 blur-sm animate-pulse">
              <Flame className="w-5 h-5" />
            </div>
          </div>
          <span className="text-[12px] font-black uppercase tracking-[0.2em] text-orange-400">Exclusive Flash Sales</span>
        </motion.div>

        <motion.h1 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, duration: 0.6 }}
          className="text-[56px] md:text-[88px] font-black leading-[1] tracking-tighter"
        >
          Premium <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 via-red-500 to-orange-400 animate-gradient-x">Wealth</span> <br /> 
          Generating Deals.
        </motion.h1>

        <motion.p 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="text-white/50 text-xl md:text-2xl font-medium max-w-[700px] leading-relaxed"
        >
          Access the most aggressive discounts from elite global brands. Curated daily for the SmartSaver community.
        </motion.p>

        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="flex flex-wrap items-center gap-8 pt-6"
        >
          <div className="flex items-center gap-4">
            <div className="flex -space-x-4">
              {[1,2,3,4].map(i => (
                <div key={i} className="w-10 h-10 rounded-full border-2 border-[#0A0A0A] bg-slate-800 overflow-hidden">
                  <img src={`https://i.pravatar.cc/100?u=${i}`} alt="user" />
                </div>
              ))}
            </div>
            <div className="text-[14px] font-bold text-white/70">
              <span className="text-white">12.4k+</span> members active
            </div>
          </div>
          
          <div className="h-10 w-px bg-white/10 hidden md:block" />

          <div className="flex items-center gap-3">
             <Zap className="w-6 h-6 text-yellow-400 fill-current" />
             <div className="text-[14px] font-bold text-white/70">
              New deals every <span className="text-white">60 minutes</span>
            </div>
          </div>
        </motion.div>
      </div>

      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes gradient-x {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }
        .animate-gradient-x {
          background-size: 200% 200%;
          animation: gradient-x 15s ease infinite;
        }
      `}} />
    </div>
  );
}
