"use client";

import { motion } from 'framer-motion';
import { Focus, ArrowRight } from 'lucide-react';

const HOT_DEALS = [
  {
    id: 'nike',
    title: 'Nike Elite Pro Collection',
    desc: 'Unleash your potential with our exclusive member-only releases. Premium performance gear designed for the modern athlete.',
    reward: '15% Cashback',
    extra: 'Top Rated Deal',
    image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=1200&q=80',
    bgColor: 'bg-[#121A26]',
  },
  {
    id: 'nordic',
    title: 'Nordic Chrono',
    desc: 'Timeless elegance meets modern savings.',
    reward: '10% Cashback',
    image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=600&q=80',
    bgColor: 'bg-[#156B8A]',
  },
  {
    id: 'macbook',
    title: 'MacBook Air M3',
    desc: 'Empower your workflow today.',
    reward: '$200 Reward',
    image: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=600&q=80',
    bgColor: 'bg-[#111B28]',
  }
];

export default function HotDeals() {
  const featuredDeal = HOT_DEALS[0];
  const secondaryDeals = HOT_DEALS.slice(1);

  return (
    <section className="py-16 lg:py-24 bg-white">
      <div className="max-w-[1280px] mx-auto px-4 md:px-8">

        {/* Header */}
        <div className="mb-10 flex flex-col sm:flex-row sm:items-end justify-between gap-6">
          <div>
            <h2 className="text-[32px] md:text-[40px] font-['Manrope'] font-semibold text-[#1A1C1C] leading-[1.1] tracking-[-0.8px] mb-2 flex items-center gap-3">
              <Focus className="w-8 h-8 text-[#FF9800]" />
              Hot Deals Spotlight
            </h2>
            <p className="text-[16px] font-['Manrope'] text-[#554434]">
              Limited time offers hand-picked from elite brands.
            </p>
          </div>
          <button className="text-[#8B5000] font-['Manrope'] font-bold text-[14px] hover:text-[#FF9800] transition-colors flex items-center gap-2">
            View All Hot Deals <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        {/* Asymmetrical Bento Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 h-auto lg:h-[600px]">

          {/* Main Dominant Deal (Left) */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.6 }}
            className={`lg:col-span-2 relative rounded-[32px] overflow-hidden group cursor-pointer h-[500px] lg:h-full flex flex-col justify-end p-8 sm:p-12 ${featuredDeal.bgColor}`}
          >
            {/* Background Image Setup */}
            <div className="absolute inset-0 z-0">
              <img
                src={featuredDeal.image}
                alt={featuredDeal.title}
                className="w-full h-full object-cover opacity-60 mix-blend-luminosity group-hover:scale-105 group-hover:opacity-80 transition-all duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0A] via-[#0A0A0A]/60 to-transparent" />
            </div>

            {/* Badge */}
            <div className="absolute top-6 left-6 sm:top-8 sm:left-8 bg-[#FF9800] text-black text-[13px] font-black px-4 py-2 rounded-full flex items-center gap-2 z-20 shadow-[0_0_20px_rgba(255,152,0,0.4)]">
              <span className="w-4 h-4 rounded-full border-[2px] border-black flex items-center justify-center text-[10px]">$</span>
              {featuredDeal.reward}
            </div>

            {/* Content Overlay */}
            <div className="relative z-10 max-w-[500px]">
              <span className="text-yellow-400 font-bold text-[11px] tracking-[2px] uppercase mb-3 block">
                {featuredDeal.extra}
              </span>
              <h3 className="font-['Manrope'] text-[36px] sm:text-[48px] font-bold leading-[1.1] tracking-[-1px] mb-4 text-white">
                {featuredDeal.title}
              </h3>
              <p className="font-['Manrope'] text-[16px] leading-[24px] text-slate-300 mb-8">
                {featuredDeal.desc}
              </p>
              <button className="bg-white text-black px-8 py-4 rounded-full font-bold text-[15px] hover:bg-[#FF9800] hover:text-white transition-colors">
                Claim Offer Now
              </button>
            </div>
          </motion.div>

          {/* Secondary Stacked Deals (Right) */}
          <div className="flex flex-col gap-6 h-full">
            {secondaryDeals.map((deal, i) => (
              <motion.div
                key={deal.id}
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ delay: 0.2 + (i * 0.1), duration: 0.6 }}
                className={`relative rounded-[32px] overflow-hidden group cursor-pointer flex-1 min-h-[250px] p-6 sm:p-8 flex flex-col justify-end ${deal.bgColor}`}
              >
                {/* Image Setup */}
                <div className="absolute inset-0 z-0">
                  <img
                    src={deal.image}
                    alt={deal.title}
                    className="w-full h-full object-cover opacity-40 group-hover:scale-110 group-hover:opacity-60 transition-all duration-700 mix-blend-overlay"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 to-transparent" />
                </div>

                {/* Badge */}
                <div className="absolute top-6 left-6 backdrop-blur-md bg-white/10 border border-white/20 text-white text-[11px] font-bold px-3 py-1.5 rounded-full flex items-center gap-1.5 z-20">
                  <span className="text-[#FF9800]">$</span> {deal.reward}
                </div>

                {/* Content Overlay */}
                <div className="relative z-10 mt-auto">
                  <h3 className="font-['Manrope'] text-[24px] font-bold leading-[1.2] mb-2 text-white">
                    {deal.title}
                  </h3>
                  <p className="font-['Manrope'] text-[14px] text-slate-300 line-clamp-2 pr-12 transition-all">
                    {deal.desc}
                  </p>

                  {/* Arrow Action that slides in */}
                  <div className="absolute right-0 bottom-0 w-10 h-10 rounded-full bg-white/10 flex items-center justify-center opacity-0 group-hover:opacity-100 group-hover:-translate-y-2 transition-all duration-300">
                    <ArrowRight className="w-5 h-5 text-white" />
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
}
