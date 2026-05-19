"use client";

import { useState } from 'react';
import CategoryHero from './CategoryHero';
import CategoryGrid from './CategoryGrid';
import CategorySidebar from './CategorySidebar';

export default function CategoriesExplorer() {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeSort, setActiveSort] = useState('Most Popular');

  return (
    <div className="bg-[#F8F9FA] min-h-screen pt-24 sm:pt-32 pb-16 sm:pb-24 px-4 md:px-8">
      <div className="max-w-[1400px] mx-auto">
        <CategoryHero onSearch={setSearchQuery} />

        {/* Mobile Horizontal Sort Chips */}
        <div className="lg:hidden mt-6">
          <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none scroll-smooth">
            {['Most Popular', 'A-Z Alphabetical', 'Highest Offers', 'Recently Added'].map((opt) => (
              <button
                key={opt}
                onClick={() => setActiveSort(opt)}
                className={`shrink-0 px-5 py-2.5 rounded-full font-black text-[10px] uppercase tracking-wider transition-all border ${
                  activeSort === opt 
                    ? 'bg-[#FF9800] text-white border-transparent shadow-md' 
                    : 'bg-white text-slate-500 border-slate-100 hover:bg-slate-50'
                }`}
              >
                {opt}
              </button>
            ))}
          </div>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 mt-12">
          {/* Left Sidebar */}
          <CategorySidebar 
            activeSort={activeSort} 
            onSortChange={setActiveSort} 
          />

          {/* Main Grid */}
          <div className="lg:col-span-9">
            <CategoryGrid searchQuery={searchQuery} />
          </div>
        </div>
      </div>
    </div>
  );
}
