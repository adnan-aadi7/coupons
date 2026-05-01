"use client";

import { motion } from 'framer-motion';
import { Filter, SlidersHorizontal, Check, TrendingUp, Tag } from 'lucide-react';

interface CategorySidebarProps {
  activeSort: string;
  onSortChange: (sort: string) => void;
}

export default function CategorySidebar({ activeSort, onSortChange }: CategorySidebarProps) {
  const sortOptions = ['Most Popular', 'A-Z Alphabetical', 'Highest Offers', 'Recently Added'];

  return (
    <aside className="lg:col-span-3 space-y-8 sticky top-32">
      {/* Filter Header */}
      <div className="flex items-center gap-3 px-2">
        <Filter className="w-5 h-5 text-[#FF9800]" />
        <h3 className="text-[11px] font-black uppercase tracking-[0.2em] text-slate-400">Refine Search</h3>
      </div>

      {/* Sort Section */}
      <div className="bg-white rounded-[32px] p-8 shadow-sm border border-slate-50 space-y-6">
        <div className="flex items-center gap-2 text-[#1A1C1C] font-black text-sm">
          <SlidersHorizontal className="w-4 h-4" />
          Sort By
        </div>
        <div className="space-y-2">
          {sortOptions.map((opt) => (
            <button
              key={opt}
              onClick={() => onSortChange(opt)}
              className={`w-full flex items-center justify-between px-5 py-4 rounded-2xl font-bold text-[14px] transition-all ${
                activeSort === opt 
                  ? 'bg-orange-50 text-[#FF9800]' 
                  : 'text-slate-500 hover:bg-slate-50'
              }`}
            >
              {opt}
              {activeSort === opt && <Check className="w-4 h-4" />}
            </button>
          ))}
        </div>
      </div>

      {/* Quick Stats Card */}
      <div className="bg-[#1A1C1C] rounded-[32px] p-8 text-white relative overflow-hidden group">
        <div className="relative z-10 space-y-4">
          <div className="w-12 h-12 bg-white/10 rounded-2xl flex items-center justify-center">
            <TrendingUp className="w-6 h-6 text-[#FF9800]" />
          </div>
          <div>
            <h4 className="font-black text-[15px] leading-tight">Trending Categories</h4>
            <p className="text-white/40 text-[11px] font-bold mt-1">Updated 5m ago</p>
          </div>
          <div className="space-y-2 pt-2">
            {['Fashion', 'Electronics'].map(item => (
              <div key={item} className="flex items-center gap-2 text-[12px] font-bold text-white/60">
                <Tag className="w-3 h-3 text-[#FF9800]" />
                {item}
              </div>
            ))}
          </div>
        </div>
        <div className="absolute -right-8 -bottom-8 w-32 h-32 bg-white/5 rounded-full blur-2xl group-hover:bg-white/10 transition-colors" />
      </div>
    </aside>
  );
}
