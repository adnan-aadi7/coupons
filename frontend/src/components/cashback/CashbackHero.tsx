"use client";

import { motion } from 'framer-motion';
import { ArrowRight, Sparkles, Coins, Gift } from 'lucide-react';

export default function CashbackHero() {
  return (
    <div className="relative overflow-hidden bg-white py-12 md:py-20 border-b border-slate-100 mb-12">
      {/* Background soft glowing lights */}
      <div className="absolute top-1/2 right-0 -translate-y-1/2 w-[300px] md:w-[600px] h-[300px] md:h-[600px] bg-amber-400/5 rounded-full blur-[80px] md:blur-[120px] pointer-events-none" />
      <div className="absolute top-10 left-10 w-[200px] h-[200px] bg-red-500/5 rounded-full blur-[60px] pointer-events-none" />

      <div className="max-w-[1400px] mx-auto px-6 md:px-12 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">

          {/* Left Column: Content */}
          <div className="lg:col-span-6 space-y-6 md:space-y-8 text-left">
            {/* Elegant Premium Tag */}
            {/* <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#FF9800]/10 border border-[#FF9800]/20 text-[#FF9800] backdrop-blur-md"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span className="text-[10px] md:text-xs font-black uppercase tracking-wider">Direct Cashback Program</span>
            </motion.div> */}

            {/* Main Bold Title */}
            <div className="space-y-2">
              <motion.h1
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, ease: "easeOut" }}
                className="text-[48px] sm:text-[64px] md:text-[84px] font-black text-[#1A1C1C] leading-[1.05] tracking-tighter"
              >
                GET YOUR <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#E53935] via-[#FF5722] to-[#FF9800]">REWARD.</span>
              </motion.h1>
            </div>

            {/* Description */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1, duration: 0.6 }}
              className="text-slate-400 text-sm sm:text-base md:text-lg font-medium max-w-[540px] leading-relaxed"
            >
              Shop from your favorite verified stores and unlock instant cashback rewards.
              Real money paid directly to your account. No hidden fees, no limits, 100% guaranteed.
            </motion.p>

            {/* Let's Go Button and Stats */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.6 }}
              className="flex flex-wrap items-center gap-6 pt-4"
            >
              {/* Lets Go Button */}
              <button
                onClick={() => {
                  const target = document.getElementById('cashback-grid-section');
                  if (target) {
                    target.scrollIntoView({ behavior: 'smooth' });
                  }
                }}
                className="group flex items-center justify-center gap-3 px-10 py-5 bg-[#E53935] hover:bg-[#FF9800] text-white rounded-xl sm:rounded-2xl font-black text-sm md:text-base uppercase tracking-widest transition-all duration-300 shadow-xl shadow-red-500/10 active:scale-95 border border-white/10"
              >
                <span>Let's Go</span>
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1.5 transition-transform" />
              </button>

              {/* Trust Badge */}
              <div className="flex items-center gap-3 py-2 px-4 rounded-2xl bg-slate-50 border border-slate-100">
                <Coins className="w-5 h-5 text-[#FF9800]" />
                <div className="text-left">
                  <div className="text-[9px] font-black text-slate-400 uppercase tracking-wider">Avg. Payout</div>
                  <div className="text-xs font-bold text-slate-700">24-48 Hours</div>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Right Column: 3D Illustration */}
          <div className="lg:col-span-6 flex justify-center items-center relative">
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8 }}
              className="relative max-w-[320px] sm:max-w-[420px] md:max-w-[500px] w-full aspect-square flex justify-center items-center select-none"
            >
              {/* Elegant floating container */}
              <div className="relative animate-float w-full h-full flex justify-center items-center">

                {/* Generated 3D Reward Box Image */}
                <img
                  src="/open_gift_box_reward.png"
                  alt="Get Your Reward Box"
                  className="w-[85%] h-[85%] object-contain drop-shadow-[0_20px_40px_rgba(229,57,53,0.1)] rounded-[32px]"
                />

                {/* Floating dynamic confetti SVGs around the box */}
                <div className="absolute top-10 left-10 text-red-500 animate-pulse delay-75">
                  <Gift className="w-6 h-6 rotate-12 opacity-40" />
                </div>
                <div className="absolute bottom-10 right-10 text-amber-500 animate-pulse">
                  <Sparkles className="w-5 h-5 -rotate-12 opacity-60" />
                </div>

                {/* SVG Confetti swirls matching user image */}
                <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 100 100">
                  {/* Left Swirl */}
                  <path d="M 15 25 Q 18 20, 20 28 T 25 22" fill="none" stroke="#E53935" strokeWidth="1.2" strokeLinecap="round" className="animate-pulse" />
                  {/* Right Swirl */}
                  <path d="M 80 75 Q 83 70, 85 78 T 90 72" fill="none" stroke="#FF9800" strokeWidth="1.2" strokeLinecap="round" className="animate-pulse" />
                </svg>
              </div>
            </motion.div>
          </div>

        </div>
      </div>

      <style dangerouslySetInnerHTML={{
        __html: `
        @keyframes float {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-12px); }
        }
        .animate-float {
          animation: float 5s ease-in-out infinite;
        }
      `}} />
    </div>
  );
}
