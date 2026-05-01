"use client";

import { Filter, SlidersHorizontal, Check, ShieldCheck, Tag } from 'lucide-react';

interface DealsSidebarProps {
  activeCategory: string;
  onCategoryChange: (cat: string) => void;
  verificationFilter: boolean;
  onVerificationToggle: () => void;
}

const CATEGORIES = ['All Deals', 'Fashion', 'Electronics', 'Luxury', 'Travel', 'Food'];

export default function DealsSidebar({ 
  activeCategory, 
  onCategoryChange, 
  verificationFilter, 
  onVerificationToggle 
}: DealsSidebarProps) {
  return (
    <aside className="lg:col-span-3 space-y-10 sticky top-32">
      
      {/* Filters Card */}
      <div className="bg-white rounded-[40px] p-8 shadow-sm border border-slate-50 space-y-10">
        
        {/* Categories */}
        <div className="space-y-6">
          <div className="flex items-center gap-2 text-[#1A1C1C] font-black text-sm uppercase tracking-widest px-2">
            <Tag className="w-4 h-4 text-[#FF9800]" />
            Categories
          </div>
          <div className="space-y-1">
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => onCategoryChange(cat)}
                className={`w-full flex items-center justify-between px-5 py-4 rounded-2xl font-bold text-[14px] transition-all ${
                  activeCategory === cat 
                    ? 'bg-orange-50 text-[#FF9800]' 
                    : 'text-slate-500 hover:bg-slate-50'
                }`}
              >
                {cat}
                {activeCategory === cat && <Check className="w-4 h-4" />}
              </button>
            ))}
          </div>
        </div>

        {/* Verification Toggle */}
        <div className="space-y-6 pt-6 border-t border-slate-50">
          <div className="flex items-center gap-2 text-[#1A1C1C] font-black text-sm uppercase tracking-widest px-2">
            <ShieldCheck className="w-4 h-4 text-[#FF9800]" />
            Trust Filter
          </div>
          <button 
            onClick={onVerificationToggle}
            className={`w-full flex items-center justify-between px-5 py-5 rounded-2xl border-2 transition-all ${
              verificationFilter 
                ? 'border-[#FF9800] bg-orange-50/50 text-[#FF9800]' 
                : 'border-slate-100 text-slate-400 hover:border-slate-200'
            }`}
          >
            <span className="font-black text-[13px] uppercase tracking-widest">Verified Only</span>
            <div className={`w-10 h-5 rounded-full relative transition-colors ${verificationFilter ? 'bg-[#FF9800]' : 'bg-slate-200'}`}>
              <div className={`absolute top-1 w-3 h-3 bg-white rounded-full transition-all ${verificationFilter ? 'left-6' : 'left-1'}`} />
            </div>
          </button>
        </div>

      </div>

      {/* Trust Badge */}
      <div className="bg-[#1A1C1C] rounded-[40px] p-10 text-white relative overflow-hidden group">
        <ShieldCheck className="w-12 h-12 text-[#FF9800] mb-4" />
        <h4 className="font-black text-[18px] leading-tight mb-2">Tested & Verified</h4>
        <p className="text-white/40 text-[12px] font-bold leading-relaxed">
          Our community tests over 10,000 coupons daily to ensure you save money every time.
        </p>
      </div>

    </aside>
  );
}
