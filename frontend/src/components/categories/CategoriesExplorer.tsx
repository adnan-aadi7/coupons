"use client";

import { useState } from 'react';
import CategoryHero from './CategoryHero';
import CategoryGrid from './CategoryGrid';
import CategorySidebar from './CategorySidebar';

export default function CategoriesExplorer() {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeSort, setActiveSort] = useState('Most Popular');

  return (
    <div className="bg-[#F8F9FA] min-h-screen pt-32 pb-24 px-4 md:px-8">
      <div className="max-w-[1400px] mx-auto">
        <CategoryHero onSearch={setSearchQuery} />
        
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
