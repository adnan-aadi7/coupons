"use client";

import { LayoutGrid, Shirt, Smartphone, Sparkles, Home, Plane, ShieldCheck } from 'lucide-react';

interface HotDealsSidebarProps {
  activeCategory: string;
  onCategoryChange: (category: string) => void;
  discountRange: string;
  onDiscountChange: (range: string) => void;
  dealType: string;
  onTypeChange: (type: string) => void;
  verifiedOnly: boolean;
  onVerifiedToggle: () => void;
}

const CATEGORIES = [
  { id: 'all', name: 'All Deals', icon: LayoutGrid },
  { id: 'fashion', name: 'Fashion', icon: Shirt },
  { id: 'tech', name: 'Tech', icon: Smartphone },
  { id: 'beauty', name: 'Beauty', icon: Sparkles },
  { id: 'home', name: 'Home', icon: Home },
  { id: 'travel', name: 'Travel', icon: Plane },
];

const DISCOUNT_RANGES = [
  { id: '0-25', name: '0-25% Off' },
  { id: '25-50', name: '25-50% Off' },
  { id: '50+', name: '50%+ Off' },
];

const DEAL_TYPES = ['Promo Code', 'Cashback', 'Free Shipping'];

export default function HotDealsSidebar({ 
  activeCategory, 
  onCategoryChange,
  discountRange,
  onDiscountChange,
  dealType,
  onTypeChange,
  verifiedOnly,
  onVerifiedToggle
}: HotDealsSidebarProps) {
  
  return (
    <aside className="lg:col-span-3 space-y-10">
      {/* Categories */}
      <div className="space-y-4">
        <h3 className="text-[13px] font-black text-[#1A1C1C] uppercase tracking-widest mb-6">Categories</h3>
        <div className="space-y-1">
          {CATEGORIES.map((cat) => (
            <button
              key={cat.id}
              onClick={() => onCategoryChange(cat.id)}
              className={`w-full flex items-center gap-4 px-4 py-3 rounded-2xl font-bold text-[14px] transition-all ${
                activeCategory === cat.id 
                  ? 'bg-orange-50 text-[#FF9800] shadow-sm' 
                  : 'text-slate-400 hover:text-slate-600 hover:bg-slate-50'
              }`}
            >
              <cat.icon className="w-4 h-4" />
              {cat.name}
            </button>
          ))}
        </div>
      </div>

      {/* Discount Range */}
      <div className="space-y-4">
        <h3 className="text-[13px] font-black text-[#1A1C1C] uppercase tracking-widest mb-6">Discount Range</h3>
        <div className="space-y-4">
          {DISCOUNT_RANGES.map((range) => (
            <label key={range.id} className="flex items-center gap-3 cursor-pointer group">
              <div className="relative flex items-center justify-center">
                <input 
                  type="radio" 
                  name="discount" 
                  className="peer appearance-none w-5 h-5 border-2 border-slate-200 rounded-full checked:border-[#FF9800] transition-all"
                  checked={discountRange === range.id}
                  onChange={() => onDiscountChange(range.id)}
                />
                <div className="absolute w-2.5 h-2.5 bg-[#FF9800] rounded-full scale-0 peer-checked:scale-100 transition-transform" />
              </div>
              <span className={`text-[14px] font-bold ${discountRange === range.id ? 'text-[#1A1C1C]' : 'text-slate-400 group-hover:text-slate-600'}`}>
                {range.name}
              </span>
            </label>
          ))}
        </div>
      </div>

      {/* Deal Type */}
      <div className="space-y-4">
        <h3 className="text-[13px] font-black text-[#1A1C1C] uppercase tracking-widest mb-6">Deal Type</h3>
        <div className="flex flex-wrap gap-2">
          {DEAL_TYPES.map((type) => (
            <button
              key={type}
              onClick={() => onTypeChange(type)}
              className={`px-4 py-2 rounded-full text-[11px] font-black uppercase tracking-widest border transition-all ${
                dealType === type 
                  ? 'bg-orange-50 border-orange-100 text-[#FF9800]' 
                  : 'bg-white border-slate-100 text-slate-400 hover:border-slate-200'
              }`}
            >
              {type}
            </button>
          ))}
        </div>
      </div>

      {/* Verified Only Toggle */}
      <div className="flex items-center justify-between pt-6 border-t border-slate-100">
        <span className="text-[13px] font-black text-[#1A1C1C] uppercase tracking-widest">Verified Only</span>
        <button 
          onClick={onVerifiedToggle}
          className={`w-12 h-6 rounded-full p-1 transition-colors duration-300 ${verifiedOnly ? 'bg-[#FF9800]' : 'bg-slate-200'}`}
        >
          <div className={`w-4 h-4 bg-white rounded-full shadow-sm transform transition-transform duration-300 ${verifiedOnly ? 'translate-x-6' : 'translate-x-0'}`} />
        </button>
      </div>
    </aside>
  );
}
