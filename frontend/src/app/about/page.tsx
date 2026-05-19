"use client";

import { Info, Users, Target, Zap, ShieldCheck } from 'lucide-react';
import { motion } from 'framer-motion';

export default function AboutPage() {
  const stats = [
    { value: "60K+", label: "Partner Brands" },
    { value: "1M+", label: "Verified Coupons" },
    { value: "$50M", label: "User Savings" },
    { value: "24/7", label: "Real-time Sync" },
  ];

  const perks = [
    { icon: Users, title: "Community First", desc: "Built for smart shoppers looking for real savings." },
    { icon: Target, title: "Verified Deals", desc: "Every coupon is tested to ensure maximum success rate." },
    { icon: Zap, title: "Real-time Updates", desc: "Our system syncs 24/7 to bring you the latest discounts." }
  ];

  return (
    <div className="bg-[#F8F9FA] min-h-screen pt-24 pb-24 font-['Manrope'] overflow-hidden">

      {/* Hero Section */}
      <div className="relative max-w-[1280px] mx-auto px-6 pt-12 lg:pt-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            className="z-10"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-[#FF9800]/10 text-[#FF9800] rounded-full font-bold text-sm mb-6 border border-[#FF9800]/20">
              <Info className="w-4 h-4" /> Who We Are
            </div>
            <h1 className="text-5xl md:text-6xl lg:text-[72px] font-black text-[#1A1C1C] tracking-tight leading-[1.1] mb-6">
              Redefining <br /> <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FF9800] to-[#F65300]">Smart Shopping</span>
            </h1>
            <p className="text-slate-500 text-lg md:text-xl max-w-[500px] leading-relaxed font-medium mb-10">
              We connect millions of users with the world's top brands, ensuring you never pay full price again. Verified, real-time, and effortless.
            </p>
            <div className="flex items-center gap-6">
              <button className="bg-[#1A1C1C] text-white px-8 py-4 rounded-xl font-bold hover:bg-[#FF9800] transition-colors shadow-xl shadow-slate-200">
                Join Our Network
              </button>
            </div>
          </motion.div>

          {/* Image */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
            className="relative lg:h-[600px] w-full"
          >
            <div className="absolute inset-0 bg-gradient-to-tr from-[#FF9800]/20 to-transparent blur-3xl rounded-full" />
            <img
              src="/about_hero.png"
              alt="Coupons Mart Team"
              className="w-full h-full object-cover rounded-[2.5rem] shadow-2xl border-[8px] border-white relative z-10"
            />

            {/* Floating Card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="absolute -bottom-8 -left-8 bg-white p-6 rounded-3xl shadow-xl border border-slate-50 z-20 hidden md:flex items-center gap-5"
            >
              <div className="w-14 h-14 bg-emerald-50 rounded-2xl flex items-center justify-center text-emerald-500">
                <ShieldCheck className="w-7 h-7" />
              </div>
              <div>
                <p className="text-slate-400 text-xs font-bold uppercase tracking-wider mb-1">Network Status</p>
                <p className="text-[#1A1C1C] font-black text-xl">100% Verified Partners</p>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="max-w-[1280px] mx-auto px-6 mt-32 lg:mt-40">
        <div className="bg-[#1A1C1C] rounded-[2rem] p-10 md:p-16 relative overflow-hidden shadow-2xl">
          <div className="absolute top-0 right-0 w-96 h-96 bg-[#FF9800]/20 blur-3xl rounded-full pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-blue-500/10 blur-3xl rounded-full pointer-events-none" />

          <div className="grid grid-cols-2 md:grid-cols-4 gap-12 relative z-10">
            {stats.map((stat, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="text-center md:text-left"
              >
                <h3 className="text-4xl md:text-5xl font-black text-white mb-3">{stat.value}</h3>
                <p className="text-slate-400 font-bold text-sm md:text-base uppercase tracking-wider">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Story & Perks */}
      <div className="max-w-[1280px] mx-auto px-6 mt-32">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">

          <div className="lg:col-span-5">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="sticky top-32"
            >
              <h2 className="text-4xl md:text-5xl font-black text-[#1A1C1C] mb-8 leading-tight">The Story Behind <br /><span className="text-[#FF9800]">Coupons Mart</span></h2>
              <div className="space-y-6 text-slate-500 leading-relaxed font-medium text-lg">
                <p>
                  Coupons Mart was founded with a simple goal: to help consumers find verified, working discounts without the hassle of clicking through expired or fake promo codes. We know how frustrating it is to reach checkout only to find out a coupon is invalid.
                </p>
                <p>
                  By partnering directly with elite global networks like Skimlinks and Admitad, our platform bypasses the noise. We sync our database directly with the merchants' APIs, ensuring that when you see a deal on Coupons Mart, it's legitimate, active, and ready to use.
                </p>
              </div>
            </motion.div>
          </div>

          <div className="lg:col-span-7 grid gap-8">
            {perks.map((perk, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 * i }}
                className="bg-white p-8 md:p-10 rounded-[2rem] shadow-[0_4px_20px_rgba(0,0,0,0.03)] border border-slate-100 flex flex-col md:flex-row gap-8 items-start hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
              >
                <div className="w-16 h-16 bg-[#F8F9FA] rounded-2xl flex items-center justify-center shrink-0 text-[#1A1C1C] shadow-inner">
                  <perk.icon className="w-8 h-8" />
                </div>
                <div>
                  <h3 className="font-black text-2xl text-[#1A1C1C] mb-3">{perk.title}</h3>
                  <p className="text-slate-500 leading-relaxed text-lg">{perk.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>

        </div>
      </div>
    </div>
  );
}
