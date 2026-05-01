"use client";

import { motion } from 'framer-motion';
import { useState } from 'react';
import { Zap, ShieldCheck } from 'lucide-react';

const SELECTION_OF_THE_DAY = [
  { 
    name: 'Apple Store', 
    rate: '10% Cashback', 
    previousRate: '3%',
    logo: 'apple', 
    category: 'Premium Electronics',
    description: 'Upgrade your workspace with the latest MacBook Pro and Studio Display for professional-grade productivity.',
    image: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&q=80&w=800'
  },
  { 
    name: 'Farfetch', 
    rate: '12% Cashback', 
    previousRate: '5%',
    logo: 'farfetch', 
    category: 'Luxury Fashion',
    description: 'Access the world\'s most coveted designer footwear with exclusive member-only pricing on select luxury labels.',
    image: 'https://images.unsplash.com/photo-1594932224036-9c67192f9bc2?auto=format&fit=crop&q=80&w=800'
  },
  { 
    name: 'Samsung', 
    rate: '15% Cashback', 
    previousRate: '4%',
    logo: 'samsung', 
    category: 'Smart Living',
    description: 'Transform your living environment with state-of-the-art home automation systems and premium interior assets.',
    image: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&q=80&w=800'
  },
];

function CashbackRow({ store, idx }: { store: any, idx: number }) {
  const cleanDomain = store.logo + ".com";
  const [logoUrl, setLogoUrl] = useState(`https://logo.clearbit.com/${cleanDomain}`);

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: idx * 0.1, duration: 0.6 }}
      className="group relative flex flex-col lg:flex-row items-stretch gap-6 mb-8 lg:mb-12 h-auto lg:h-[420px]"
    >
      {/* Left Info Box */}
      <div className="flex-1 bg-white rounded-[40px] p-8 md:p-12 shadow-[0px_20px_40px_rgba(0,0,0,0.04)] border border-slate-50 flex flex-col justify-between z-10">
        <div className="space-y-6">
          <div className="flex items-start justify-between">
            <div className="w-14 h-14 md:w-16 md:h-16 bg-white border border-slate-100 rounded-2xl flex items-center justify-center p-3 shadow-sm">
              <img 
                src={logoUrl} 
                alt={store.name} 
                className="w-full h-full object-contain mix-blend-multiply" 
                onError={() => setLogoUrl(`https://www.google.com/s2/favicons?domain=${cleanDomain}&sz=128`)}
              />
            </div>
            <div className="flex items-center gap-2 bg-orange-50 text-[#FF9800] px-3 py-1.5 rounded-full border border-orange-100 text-[9px] md:text-[10px] font-black uppercase tracking-widest">
              <Zap className="w-3 h-3 fill-current" />
              Boosted
            </div>
          </div>

          <div>
            <div className="text-slate-400 font-bold text-[11px] md:text-[13px] uppercase tracking-widest mb-1">{store.category}</div>
            <h3 className="text-[28px] md:text-[42px] font-black text-[#1A1C1C] leading-tight font-serif tracking-tight">
              {store.rate}
            </h3>
            <div className="text-emerald-500 font-black text-[10px] md:text-[11px] uppercase tracking-widest mt-1 md:mt-2">
               Instead of {store.previousRate}
            </div>
            <p className="mt-4 md:mt-6 text-slate-500 font-medium text-[14px] md:text-[16px] leading-relaxed max-w-[400px]">
              {store.description}
            </p>
          </div>
        </div>

        {/* Footer Area with Avatars and Button */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-6 pt-8 md:pt-10">
           <div className="flex items-center gap-3">
              <div className="flex -space-x-3">
                  {[1,2,3].map(i => (
                    <div key={i} className="w-8 h-8 rounded-full border-2 border-white bg-slate-100 overflow-hidden">
                      <img src={`https://i.pravatar.cc/100?u=${i + 50 + idx}`} alt="user" />
                    </div>
                  ))}
              </div>
              <span className="text-[10px] md:text-[11px] font-black text-slate-300 uppercase tracking-widest">
                  {Math.floor(Math.random() * 500 + 100)} redeemed
              </span>
           </div>

           <button className="w-full sm:w-auto px-10 py-4 bg-[#1A1C1C] text-white rounded-full font-black text-[12px] md:text-[13px] uppercase tracking-widest hover:bg-[#FF9800] transition-all shadow-xl shadow-slate-100 active:scale-95 whitespace-nowrap">
             Activate Cashback
           </button>
        </div>
      </div>

      {/* Right Visual Area */}
      <div className="flex-1 md:flex-[1.2] min-h-[300px] lg:min-h-0 rounded-[40px] overflow-hidden relative group-hover:shadow-2xl transition-all duration-700">
        <img 
          src={store.image} 
          alt={store.name} 
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#1A1C1C]/40 to-transparent opacity-60" />
        
        <div className="absolute top-6 right-6">
           <div className="flex items-center gap-2 bg-white/20 backdrop-blur-md px-4 py-2 rounded-full border border-white/20 text-white">
              <ShieldCheck className="w-4 h-4" />
              <span className="text-[10px] md:text-[11px] font-black uppercase tracking-widest">Verified Partner</span>
           </div>
        </div>
      </div>
    </motion.div>
  );
}

export default function CashbackGrid() {
  return (
    <div className="max-w-[1200px] mx-auto py-12 md:py-24 px-4 sm:px-0">
      <div className="flex flex-col sm:flex-row items-center justify-between mb-12 md:mb-16 border-b border-slate-100 pb-10 gap-6">
        <div className="text-center sm:text-left space-y-2">
          <h2 className="text-[11px] md:text-[13px] font-black text-[#FF9800] uppercase tracking-[0.3em]">Curated Offers</h2>
          <h3 className="text-3xl md:text-4xl font-black text-[#1A1C1C]">Selection of the Day.</h3>
        </div>
        <div className="flex items-center gap-4 text-slate-400 text-xs md:text-sm font-bold">
           Updated 2h ago
        </div>
      </div>

      <div className="space-y-8 lg:space-y-12">
        {SELECTION_OF_THE_DAY.map((store, i) => (
          <CashbackRow key={i} store={store} idx={i} />
        ))}
      </div>
      
      <div className="mt-16 md:mt-20 flex justify-center">
        <button className="w-full sm:w-auto px-14 py-6 bg-white border border-slate-100 rounded-full font-black text-[12px] uppercase tracking-widest hover:border-[#FF9800] hover:text-[#FF9800] transition-all shadow-sm">
           Explore More Rewards
        </button>
      </div>
    </div>
  );
}
