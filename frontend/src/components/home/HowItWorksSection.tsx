"use client";

import { motion } from 'framer-motion';
import { Search, ShoppingBag, Wallet, ArrowRight, CheckCircle2 } from 'lucide-react';
import Link from 'next/link';

const STEPS = [
  {
    step: "01",
    icon: Search,
    title: "Browse & Find Deals",
    desc: "Search through thousands of verified promo codes, active coupons, and exclusive discounts from your favorite retail brands.",
    color: "from-orange-500/20 to-amber-500/10",
    iconColor: "text-orange-500",
    borderColor: "hover:border-orange-200"
  },
  {
    step: "02",
    icon: ShoppingBag,
    title: "Shop & Apply Code",
    desc: "Click 'Get Deal' to automatically copy the code and start shopping on the official retailer website. Paste at checkout to save.",
    color: "from-blue-500/20 to-indigo-500/10",
    iconColor: "text-blue-500",
    borderColor: "hover:border-blue-200"
  },
  {
    step: "03",
    icon: Wallet,
    title: "Earn Real Cash Back",
    desc: "We track your affiliate purchase automatically and transfer the cash back earnings directly into your digital account balance.",
    color: "from-emerald-500/20 to-teal-500/10",
    iconColor: "text-emerald-500",
    borderColor: "hover:border-emerald-200"
  }
];

export default function HowItWorksSection() {
  return (
    <section className="py-24 lg:py-32 bg-[#F8F9FA] relative overflow-hidden">
      {/* Background Decoration */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-[#FF9800]/5 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-blue-500/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-[1280px] mx-auto px-6 md:px-8 relative z-10">

        {/* Section Header */}
        <div className="text-center mb-20 space-y-4">
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#FF9800]/10 border border-[#FF9800]/20"
          >
            <span className="w-2 h-2 rounded-full bg-[#FF9800] animate-pulse" />
            <span className="text-[#FF9800] font-black text-[11px] tracking-[2px] uppercase">
              Simple Steps
            </span>
          </motion.div>
          
          <motion.h2 
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-[40px] md:text-[56px] font-['Manrope'] font-black text-[#1A1C1C] leading-[1.1] tracking-tight"
          >
            How Coupons Mart Works
          </motion.h2>
          
          <motion.p 
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-[17px] font-['Manrope'] text-slate-500 max-w-[600px] mx-auto leading-relaxed font-medium"
          >
            Start saving on all your online purchases in just 3 super easy steps. No complex forms, no hidden fees—100% free.
          </motion.p>
        </div>

        {/* 3 Step Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
          
          {/* Connector Line in Desktop */}
          <div className="hidden md:block absolute top-1/2 left-1/6 right-1/6 h-[2px] bg-gradient-to-r from-orange-200/50 via-blue-200/50 to-emerald-200/50 -translate-y-[80px] z-0" />

          {STEPS.map((step, index) => {
            const IconComponent = step.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.15, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                className={`relative bg-white border border-slate-100 rounded-[32px] p-8 md:p-10 shadow-sm transition-all duration-300 hover:shadow-xl hover:-translate-y-1.5 z-10 group ${step.borderColor}`}
              >
                {/* Step Counter Label */}
                <div className="absolute top-8 right-8 text-[48px] font-black text-slate-100/80 font-sans leading-none tracking-tight select-none group-hover:text-[#FF9800]/10 transition-colors duration-300">
                  {step.step}
                </div>

                {/* Icon Wrapper with Gradient Glowing Halo */}
                <div className={`w-16 h-16 rounded-[20px] bg-gradient-to-br ${step.color} flex items-center justify-center mb-8 relative overflow-hidden shadow-inner`}>
                  <div className="absolute inset-0 bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <IconComponent className={`w-7 h-7 ${step.iconColor} transform group-hover:scale-110 transition-transform duration-300`} />
                </div>

                {/* Step Details */}
                <div className="space-y-3">
                  <h3 className="font-['Manrope'] font-black text-[20px] md:text-[22px] text-[#1A1C1C]">
                    {step.title}
                  </h3>
                  <p className="font-['Manrope'] text-[14.5px] leading-relaxed text-slate-400 font-semibold group-hover:text-slate-500 transition-colors duration-300">
                    {step.desc}
                  </p>
                </div>

                {/* Sub-label showing security verified */}
                <div className="mt-8 pt-6 border-t border-slate-50 flex items-center gap-2 text-slate-300 group-hover:text-emerald-500/80 transition-colors duration-300">
                  <CheckCircle2 className="w-4 h-4 shrink-0" />
                  <span className="text-[11px] font-bold uppercase tracking-wider font-sans">Verified safe & secure</span>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Dynamic CTA at the bottom */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          className="mt-16 text-center"
        >
          <Link href="/auth/signup">
            <button className="relative group bg-[#1A1C1C] hover:bg-[#FF9800] text-white font-['Manrope'] font-bold text-sm uppercase tracking-widest px-10 py-5 rounded-[24px] shadow-xl hover:shadow-[#FF9800]/20 transition-all duration-300 active:scale-95 inline-flex items-center gap-3 overflow-hidden">
              <span className="relative z-10">Start Saving Today</span>
              <ArrowRight className="w-4 h-4 relative z-10 group-hover:translate-x-1 transition-transform" />
              <div className="absolute inset-0 -translate-x-full group-hover:translate-x-0 bg-gradient-to-r from-orange-500 to-[#FF9800] transition-transform duration-500 ease-out z-0" />
            </button>
          </Link>
        </motion.div>

      </div>
    </section>
  );
}
