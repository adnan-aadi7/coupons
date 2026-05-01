"use client";

import { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Shirt, 
  Smartphone, 
  Plane, 
  Gem, 
  Home, 
  Utensils, 
  Dumbbell, 
  Baby, 
  HeartPulse,
  Gamepad2,
  Car,
  Laptop,
  ChevronDown,
  ArrowRight
} from 'lucide-react';
import Link from 'next/link';

const CATEGORIES_DATA = [
  { id: 1, name: 'Fashion', icon: Shirt, count: 124, color: 'text-orange-500', bg: 'bg-orange-50' },
  { id: 2, name: 'Electronics', icon: Smartphone, count: 86, color: 'text-blue-500', bg: 'bg-blue-50' },
  { id: 3, name: 'Travel', icon: Plane, count: 42, color: 'text-emerald-500', bg: 'bg-emerald-50' },
  { id: 4, name: 'Luxury', icon: Gem, count: 28, color: 'text-amber-500', bg: 'bg-amber-50' },
  { id: 5, name: 'Home & Living', icon: Home, count: 54, color: 'text-indigo-500', bg: 'bg-indigo-50' },
  { id: 6, name: 'Food & Dining', icon: Utensils, count: 67, color: 'text-rose-500', bg: 'bg-rose-50' },
  { id: 7, name: 'Sports', icon: Dumbbell, count: 39, color: 'text-cyan-500', bg: 'bg-cyan-50' },
  { id: 8, name: 'Kids', icon: Baby, count: 31, color: 'text-pink-500', bg: 'bg-pink-50' },
  { id: 9, name: 'Health & Beauty', icon: HeartPulse, count: 92, color: 'text-red-500', bg: 'bg-red-50' },
  { id: 10, name: 'Gaming', icon: Gamepad2, count: 24, color: 'text-violet-500', bg: 'bg-violet-50' },
  { id: 11, name: 'Automotive', icon: Car, count: 18, color: 'text-slate-500', bg: 'bg-slate-50' },
  { id: 12, name: 'Computing', icon: Laptop, count: 45, color: 'text-blue-600', bg: 'bg-blue-50' },
];

export default function CategoryGrid({ searchQuery }: { searchQuery: string }) {
  const [limit, setLimit] = useState(6);
  
  const filtered = CATEGORIES_DATA.filter(cat => 
    cat.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const displayed = filtered.slice(0, limit);

  return (
    <div className="space-y-12">
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {displayed.map((cat, idx) => (
          <motion.div
            key={cat.id}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: idx * 0.05 }}
          >
            <Link 
              href={`/deals?category=${cat.name.toLowerCase().replace(/\s+/g, '-')}`}
              className="group bg-white rounded-[40px] p-8 border border-slate-50 hover:shadow-2xl hover:shadow-slate-100 transition-all flex flex-col items-center text-center relative overflow-hidden"
            >
              <div className={`w-20 h-20 ${cat.bg} rounded-3xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-500`}>
                <cat.icon className={`w-10 h-10 ${cat.color}`} />
              </div>
              
              <h3 className="text-xl font-black text-[#1A1C1C] mb-2">{cat.name}</h3>
              <p className="text-slate-400 font-bold text-[12px] uppercase tracking-widest">
                {cat.count} Active Offers
              </p>
              
              <div className="absolute top-6 right-6 opacity-0 group-hover:opacity-100 transition-opacity">
                <div className="w-8 h-8 rounded-full bg-[#FF9800] flex items-center justify-center text-white">
                  <ArrowRight className="w-4 h-4" strokeWidth={3} />
                </div>
              </div>
            </Link>
          </motion.div>
        ))}
      </div>

      {limit < filtered.length && (
        <div className="flex justify-center">
          <button 
            onClick={() => setLimit(prev => prev + 6)}
            className="flex items-center gap-3 px-10 py-5 bg-white border border-slate-200 rounded-full font-black text-[#1A1C1C] hover:border-[#FF9800] hover:text-[#FF9800] transition-all shadow-sm group"
          >
            View More Categories
            <ChevronDown className="w-5 h-5 group-hover:translate-y-1 transition-transform" />
          </button>
        </div>
      )}
    </div>
  );
}
