"use client";

import { LayoutGrid, Shirt, Smartphone, Plane, Gem, Tag } from 'lucide-react';

interface StoreExplorerSidebarProps {
  activeCategory: string;
  onCategoryChange: (category: string) => void;
}

const CATEGORIES = [
  { name: 'All Stores', icon: LayoutGrid },
  { name: 'Fashion', icon: Shirt },
  { name: 'Electronics', icon: Smartphone },
  { name: 'Travel', icon: Plane },
  { name: 'Luxury', icon: Gem },
];

export default function StoreExplorerSidebar({ activeCategory, onCategoryChange }: StoreExplorerSidebarProps) {
  return (
    <aside className="lg:col-span-3 space-y-8 sticky top-32">
      <div className="bg-white rounded-[32px] p-8 shadow-sm border border-slate-100">
        <h3 className="text-sm font-black uppercase tracking-widest text-slate-400 mb-6 px-2">Categories</h3>
        <div className="space-y-2">
          {CATEGORIES.map((cat) => (
            <button
              key={cat.name}
              onClick={() => onCategoryChange(cat.name)}
              className={`w-full flex items-center gap-4 px-5 py-4 rounded-2xl font-bold transition-all ${
                activeCategory === cat.name 
                  ? 'bg-[#FF9800] text-white shadow-lg shadow-orange-100' 
                  : 'text-slate-500 hover:bg-slate-50'
              }`}
            >
              <cat.icon className="w-5 h-5" />
              {cat.name}
            </button>
          ))}
        </div>
      </div>

      {/* Vault Membership Card */}
      <div className="bg-orange-50 rounded-[32px] p-8 border border-orange-100 relative overflow-hidden group">
        <div className="relative z-10 space-y-4">
          <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center shadow-sm">
            <Tag className="w-8 h-8 text-[#FF9800]" />
          </div>
          <div>
            <h4 className="font-black text-[#1A1C1C] uppercase text-[12px] tracking-widest mb-1">Vault Membership</h4>
            <p className="text-[11px] text-slate-500 font-bold leading-relaxed">
              Double your cashback on all luxury brands.
            </p>
          </div>
          <button className="w-full py-3 bg-white text-[#1A1C1C] rounded-full text-[11px] font-black uppercase tracking-widest border border-slate-200 hover:border-[#FF9800] transition-all">
            Upgrade Now
          </button>
        </div>
        <div className="absolute -right-8 -bottom-8 w-32 h-32 bg-orange-100/50 rounded-full blur-2xl group-hover:bg-orange-200/50 transition-colors" />
      </div>
    </aside>
  );
}
