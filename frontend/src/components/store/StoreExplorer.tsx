"use client";

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Search, ChevronDown } from 'lucide-react';
import StoreCard from './StoreCard';
import StoreExplorerSidebar from './StoreExplorerSidebar';

const STORES = [
  { id: 1, name: 'Apple Store', category: 'Electronics', cashback: '10%', logo: 'apple', color: 'from-slate-500/10 to-slate-900/10' },
  { id: 2, name: 'Nike Lifestyle', category: 'Fashion', cashback: '8%', logo: 'nike', color: 'from-orange-500/10 to-orange-900/10' },
  { id: 3, name: 'Lululemon', category: 'Activewear', cashback: '15%', logo: 'lululemon', color: 'from-red-500/10 to-red-900/10' },
  { id: 4, name: 'Farfetch Luxury', category: 'Luxury', cashback: '5%', logo: 'farfetch', color: 'from-blue-500/10 to-blue-900/10' },
  { id: 5, name: 'Bang & Olufsen', category: 'Audio', cashback: '7%', logo: 'bang-olufsen', color: 'from-amber-500/10 to-amber-900/10' },
  { id: 6, name: 'Prada', category: 'Luxury', cashback: '12%', logo: 'prada', color: 'from-slate-800/10 to-black/10' },
];

export default function StoreExplorer() {
  const [activeCategory, setActiveCategory] = useState('All Stores');
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <div className="bg-[#F9FAFB] min-h-screen font-['Manrope'] pt-32 pb-24">
      <div className="max-w-[1400px] mx-auto px-6">
        
        {/* Header Section */}
        <div className="text-center mb-16 space-y-6">
          <h1 className="text-[42px] md:text-[56px] font-black text-[#1A1C1C] tracking-tight">
            Explore Our Partners
          </h1>
          <p className="text-slate-500 text-[18px] max-w-[700px] mx-auto leading-relaxed">
            Connect with over 500+ premium retailers and unlock exclusive wealth-generating rewards on every purchase.
          </p>

          {/* Search Bar */}
          <div className="relative max-w-[700px] mx-auto mt-10">
            <div className="absolute left-6 top-1/2 -translate-y-1/2 text-[#FF9800]">
              <Search className="w-6 h-6" />
            </div>
            <input 
              type="text"
              placeholder="Search for your favorite brand..."
              className="w-full h-[72px] bg-white rounded-full pl-16 pr-48 shadow-xl shadow-slate-200/50 border-none focus:ring-2 focus:ring-[#FF9800] transition-all text-lg font-medium"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <button className="absolute right-3 top-1/2 -translate-y-1/2 h-[56px] px-10 bg-[#FF9800] text-white rounded-full font-black text-[15px] hover:bg-[#F57C00] transition-all shadow-lg shadow-orange-200">
              Find Store
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          <StoreExplorerSidebar 
            activeCategory={activeCategory} 
            onCategoryChange={setActiveCategory} 
          />

          <main className="lg:col-span-9">
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-2 gap-8">
              
              {/* Featured Store Card */}
              <div className="md:col-span-1 xl:col-span-1 h-full">
                <div className="bg-[#1A1C1C] rounded-[40px] p-10 text-white relative overflow-hidden h-full group min-h-[400px] flex flex-col justify-end">
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent z-10" />
                  <img 
                    src="https://images.unsplash.com/photo-1596462502278-27bfdc4033c8?auto=format&fit=crop&w=800&q=80" 
                    alt="Featured"
                    className="absolute inset-0 w-full h-full object-cover opacity-60 transition-transform duration-[10s] group-hover:scale-110"
                  />
                  <div className="relative z-20 space-y-6">
                    <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-[10px] font-black uppercase tracking-widest">
                      Featured Store
                    </div>
                    <div>
                      <h2 className="text-4xl font-black mb-4">Sephora Beauty</h2>
                      <p className="text-white/60 font-bold leading-relaxed max-w-[300px]">
                        Unlock a world of luxury cosmetics and professional skincare.
                      </p>
                    </div>
                    <button className="w-full py-5 bg-white text-[#1A1C1C] rounded-2xl font-black text-[15px] hover:bg-[#FF9800] hover:text-white transition-all shadow-xl">
                      Shop Now — 12% Back
                    </button>
                  </div>
                </div>
              </div>

              {/* Regular Store Cards */}
              {STORES.map((store) => (
                <StoreCard key={store.id} store={store} idx={store.id} />
              ))}

            </div>

            <div className="mt-20 flex justify-center">
              <button className="flex items-center gap-3 px-12 py-5 bg-white border border-slate-200 rounded-full font-black text-[#1A1C1C] hover:border-[#FF9800] hover:text-[#FF9800] transition-all shadow-sm group">
                Load More Stores
                <ChevronDown className="w-5 h-5 group-hover:translate-y-1 transition-transform" />
              </button>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}
