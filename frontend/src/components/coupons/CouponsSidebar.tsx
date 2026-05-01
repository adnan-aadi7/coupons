"use client";

import { Filter, SlidersHorizontal, Check, ShieldCheck, Tag, Zap, Percent } from 'lucide-react';

interface CouponsSidebarProps {
  activeCategory: string;
  onCategoryChange: (cat: string) => void;
  verifiedOnly: boolean;
  onVerifiedToggle: () => void;
}

const CATEGORIES = [
  { name: 'All Categories', slug: 'all' },
  { name: 'Fashion', slug: 'fashion' },
  { name: 'Electronics', slug: 'electronics' },
  { name: 'Home & Garden', slug: 'home-garden' },
  { name: 'Beauty', slug: 'beauty' },
  { name: 'Travel', slug: 'travel' }
];

export default function CouponsSidebar({ 
  activeCategory, 
  onCategoryChange, 
  verifiedOnly, 
  onVerifiedToggle 
}: CouponsSidebarProps) {
  return (
    <aside className="lg:col-span-3 space-y-8 sticky top-32">
      
      {/* Search Filter Header */}
      <div className="flex items-center gap-3 px-2">
        <Filter className="w-5 h-5 text-[#FF9800]" />
        <h3 className="text-[11px] font-black uppercase tracking-[0.2em] text-slate-400">Filter By</h3>
      </div>

      {/* Category List */}
      <div className="bg-white rounded-[32px] p-6 shadow-sm border border-slate-50">
        <h4 className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-300 mb-6 px-2">Categories</h4>
        <div className="space-y-1.5">
          {CATEGORIES.map((cat) => (
            <button
              key={cat.slug}
              onClick={() => onCategoryChange(cat.slug)}
              className={`w-full flex items-center justify-between px-4 py-3 rounded-xl font-black text-[13px] transition-all ${
                activeCategory === cat.slug 
                  ? 'bg-[#FF9800] text-white shadow-lg shadow-orange-100' 
                  : 'text-slate-500 hover:bg-slate-50 hover:text-[#1A1C1C]'
              }`}
            >
              {cat.name}
              {activeCategory === cat.slug && <Check className="w-4 h-4" />}
            </button>
          ))}
        </div>
      </div>

      {/* Verification Filter */}
      <div className="bg-white rounded-[32px] p-6 shadow-sm border border-slate-50">
        <h4 className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-300 mb-6 px-2">Trust Center</h4>
        <button 
          onClick={onVerifiedToggle}
          className={`w-full flex items-center justify-between px-4 py-4 rounded-2xl border-2 transition-all ${
            verifiedOnly 
              ? 'border-[#FF9800] bg-orange-50/50 text-[#FF9800]' 
              : 'border-slate-50 text-slate-500 hover:border-slate-100'
          }`}
        >
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-4 h-4" />
            <span className="font-black text-[12px] uppercase tracking-widest">Verified Only</span>
          </div>
          <div className={`w-8 h-4 rounded-full relative transition-colors ${verifiedOnly ? 'bg-[#FF9800]' : 'bg-slate-200'}`}>
            <div className={`absolute top-0.5 w-3 h-3 bg-white rounded-full transition-all ${verifiedOnly ? 'left-4.5' : 'left-0.5'}`} />
          </div>
        </button>
      </div>

      {/* Promotion Card */}
      <div className="bg-gradient-to-br from-[#1A1C1C] to-[#333] rounded-[32px] p-8 text-white relative overflow-hidden group">
        <div className="relative z-10 space-y-4">
          <div className="w-10 h-10 bg-[#FF9800] rounded-xl flex items-center justify-center">
            <Percent className="w-5 h-5 text-white" />
          </div>
          <div>
            <h4 className="font-black text-[15px] leading-tight">Exclusive Offers</h4>
            <p className="text-white/40 text-[11px] font-bold mt-1">Direct from our partners to your wallet.</p>
          </div>
        </div>
        <div className="absolute -right-8 -bottom-8 w-32 h-32 bg-[#FF9800]/10 rounded-full blur-2xl" />
      </div>

    </aside>
  );
}
