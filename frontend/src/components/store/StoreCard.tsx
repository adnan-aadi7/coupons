"use client";

import { motion } from 'framer-motion';
import Link from 'next/link';

interface StoreCardProps {
  store: any;
  idx: number;
}

export default function StoreCard({ store, idx }: StoreCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: idx * 0.05 }}
      className="flex flex-col items-center justify-center"
    >
      <Link 
        href={`/store/${store.name.toLowerCase().replace(/\s+/g, '-')}`}
        className="group relative flex flex-col items-center"
      >
        {/* The Floating Bubble */}
        <div className="relative">
          <div className="w-28 h-28 md:w-32 md:h-32 bg-white rounded-full flex items-center justify-center shadow-xl shadow-slate-200 border border-slate-50 group-hover:-translate-y-3 transition-all duration-500 p-6 z-10">
            <img 
              src={`https://logo.clearbit.com/${store.logo}.com`} 
              alt={store.name} 
              className="max-w-full max-h-full object-contain grayscale-[0.3] group-hover:grayscale-0 transition-all duration-500"
              onError={(e: any) => {
                e.target.src = `https://www.google.com/s2/favicons?domain=${store.logo}.com&sz=128`;
              }}
            />
          </div>
          
          {/* Animated Background Ring */}
          <div className="absolute inset-0 bg-[#FF9800] rounded-full blur-2xl opacity-0 group-hover:opacity-25 transition-opacity duration-500 scale-110" />
        </div>

        {/* Store Info & Discount (Outside the Bubble) */}
        <div className="mt-6 text-center">
          <div className="text-[14px] font-black text-[#FF9800] tracking-widest mb-1">
            {store.cashback}
          </div>
          <h3 className="text-lg font-black text-[#1A1C1C] tracking-tight group-hover:text-[#FF9800] transition-colors">
            {store.name}
          </h3>
          <p className="text-slate-400 font-bold text-[10px] uppercase tracking-widest mt-1">
            {store.category}
          </p>
        </div>
      </Link>
    </motion.div>
  );
}
