"use client";

import { motion } from 'framer-motion';
import { Tag, Sparkles, Home, ShoppingCart, Smartphone, Coffee, Plane } from 'lucide-react';

const categories = [
  { id: 'all', name: 'All Deals', icon: Sparkles },
  { id: 'Groceries', name: 'Groceries', icon: ShoppingCart },
  { id: 'Tech', name: 'Electronics', icon: Smartphone },
  { id: 'Personal Care', name: 'Beauty', icon: Tag },
  { id: 'Home', name: 'Home & Garden', icon: Home },
  { id: 'Travel', name: 'Travel', icon: Plane },
  { id: 'Food', name: 'Food & Dining', icon: Coffee },
];

interface CategoryBarProps {
  activeCategory: string;
  onCategoryChange: (id: string) => void;
}

export default function CategoryBar({ activeCategory, onCategoryChange }: CategoryBarProps) {
  return (
    <div className="w-full overflow-x-auto no-scrollbar pb-4 flex items-center gap-3">
      {categories.map((cat) => {
        const Icon = cat.icon;
        const isActive = activeCategory === cat.id;

        return (
          <button
            key={cat.id}
            onClick={() => onCategoryChange(cat.id)}
            className={`
              flex-shrink-0 flex items-center gap-2 px-6 py-3 rounded-2xl border transition-all duration-300
              ${isActive
                ? 'bg-primary border-primary text-white shadow-xl shadow-primary/20'
                : 'bg-slate-50 border-slate-100 text-slate-500 hover:border-slate-200 hover:bg-white hover:shadow-md'}
            `}
          >
            <Icon className={`w-4 h-4 ${isActive ? 'text-white' : 'text-slate-300'}`} />
            <span className="text-[10px] font-bold uppercase tracking-widest whitespace-nowrap">{cat.name}</span>
          </button>
        );
      })}
    </div>
  );
}
