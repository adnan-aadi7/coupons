"use client";

import { useState } from 'react';
import { Search, ChevronDown } from 'lucide-react';
import StoreCard from '@/components/store/StoreCard';

const STORES = [
  { id: 1, name: 'Apple Store', category: 'Electronics', cashback: '10% BACK', logo: 'apple' },
  { id: 2, name: 'Nike', category: 'Fashion', cashback: '8% BACK', logo: 'nike' },
  { id: 3, name: 'Lululemon', category: 'Activewear', cashback: '15% BACK', logo: 'lululemon' },
  { id: 4, name: 'Farfetch', category: 'Luxury', cashback: '5% BACK', logo: 'farfetch' },
  { id: 5, name: 'Bang & Olufsen', category: 'Audio', cashback: '7% BACK', logo: 'bang-olufsen' },
  { id: 6, name: 'Prada', category: 'Luxury', cashback: '12% BACK', logo: 'prada' },
  { id: 7, name: 'Gucci', category: 'Luxury', cashback: '6% BACK', logo: 'gucci' },
  { id: 8, name: 'Adidas', category: 'Sports', cashback: '10% BACK', logo: 'adidas' },
  { id: 9, name: 'Amazon', category: 'General', cashback: '5% BACK', logo: 'amazon' },
  { id: 10, name: 'Samsung', category: 'Electronics', cashback: '11% BACK', logo: 'samsung' },
  { id: 11, name: 'Microsoft', category: 'Software', cashback: '9% BACK', logo: 'microsoft' },
  { id: 12, name: 'Tesla', category: 'Auto', cashback: '4% BACK', logo: 'tesla' },
  { id: 13, name: 'Sony', category: 'Electronics', cashback: '6% BACK', logo: 'sony' },
  { id: 14, name: 'Zara', category: 'Fashion', cashback: '5% BACK', logo: 'zara' },
  { id: 15, name: 'BMW', category: 'Auto', cashback: '3% BACK', logo: 'bmw' },
];

export default function StoresPage() {
  const [searchQuery, setSearchQuery] = useState('');

  const filteredStores = STORES.filter(s => 
    s.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="bg-[#F9FAFB] min-h-screen font-['Manrope'] pt-32 pb-24 text-[#1A1C1C]">
      <div className="max-w-[1440px] mx-auto px-6">
        
        {/* Header Section */}
        <div className="text-center mb-24 space-y-6">
          <h1 className="text-[48px] md:text-[64px] font-black tracking-tight leading-tight">
            Our <span className="text-[#FF9800]">Partner</span> Network
          </h1>
          <p className="text-slate-500 text-[18px] max-w-[800px] mx-auto leading-relaxed font-medium">
            Discover a curated selection of global brands. We've eliminated the clutter to bring you a clean, focused shopping experience.
          </p>

          {/* Search Bar - Refined */}
          <div className="relative max-w-[750px] mx-auto mt-12">
            <div className="absolute left-7 top-1/2 -translate-y-1/2 text-[#FF9800]">
              <Search className="w-6 h-6" />
            </div>
            <input 
              type="text" 
              placeholder="Search by brand name..."
              className="w-full h-[76px] bg-white rounded-3xl pl-16 pr-48 shadow-2xl shadow-slate-200/50 border-none focus:ring-2 focus:ring-[#FF9800]/30 transition-all text-lg font-bold"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <button className="absolute right-3 top-1/2 -translate-y-1/2 h-[56px] px-12 bg-[#1A1C1C] text-white rounded-2xl font-black text-[14px] uppercase tracking-widest hover:bg-[#FF9800] transition-all">
              Search
            </button>
          </div>
        </div>

        {/* Store Bubbles Grid - Updated to 5 Columns */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-x-6 gap-y-12">
          {filteredStores.map((store) => (
            <StoreCard key={store.id} store={store} idx={store.id} />
          ))}
        </div>

        <div className="mt-32 flex flex-col items-center gap-6">
          <div className="w-16 h-1 bg-slate-100 rounded-full" />
          <button className="flex items-center gap-3 px-14 py-5 bg-white border border-slate-200 rounded-full font-black text-[12px] uppercase tracking-widest hover:border-[#FF9800] hover:text-[#FF9800] transition-all shadow-sm group">
            Load More Partners
            <ChevronDown className="w-5 h-5 group-hover:translate-y-1 transition-transform" />
          </button>
        </div>
      </div>
    </div>
  );
}
