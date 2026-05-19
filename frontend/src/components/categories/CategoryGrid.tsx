"use client";

import { useState, useEffect } from 'react';
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
  { id: 1, name: 'Fashion', icon: Shirt, count: 0, color: 'text-orange-500', bg: 'bg-orange-50' },
  { id: 2, name: 'Electronics', icon: Smartphone, count: 0, color: 'text-blue-500', bg: 'bg-blue-50' },
  { id: 3, name: 'Travel', icon: Plane, count: 0, color: 'text-emerald-500', bg: 'bg-emerald-50' },
  { id: 4, name: 'Luxury', icon: Gem, count: 0, color: 'text-amber-500', bg: 'bg-amber-50' },
  { id: 5, name: 'Home & Living', icon: Home, count: 0, color: 'text-indigo-500', bg: 'bg-indigo-50' },
  { id: 6, name: 'Food & Dining', icon: Utensils, count: 0, color: 'text-rose-500', bg: 'bg-rose-50' },
  { id: 7, name: 'Sports', icon: Dumbbell, count: 0, color: 'text-cyan-500', bg: 'bg-cyan-50' },
  { id: 8, name: 'Kids', icon: Baby, count: 0, color: 'text-pink-500', bg: 'bg-pink-50' },
  { id: 9, name: 'Health & Beauty', icon: HeartPulse, count: 0, color: 'text-red-500', bg: 'bg-red-50' },
  { id: 10, name: 'Gaming', icon: Gamepad2, count: 0, color: 'text-violet-500', bg: 'bg-violet-50' },
  { id: 11, name: 'Automotive', icon: Car, count: 0, color: 'text-slate-500', bg: 'bg-slate-50' },
  { id: 12, name: 'Computing', icon: Laptop, count: 0, color: 'text-blue-600', bg: 'bg-blue-50' },
];

export default function CategoryGrid({ searchQuery }: { searchQuery: string }) {
  const [categories, setCategories] = useState(CATEGORIES_DATA);
  const [limit, setLimit] = useState(6);
  const [isLoading, setIsLoading] = useState(true);

  // Fetch real coupons to calculate active offers per category dynamically
  useEffect(() => {
    const fetchCouponCounts = async () => {
      try {
        const API_URL = process.env.NEXT_PUBLIC_API_URL || 'https://coupons-52jf.vercel.app/api';
        const res = await fetch(`${API_URL}/coupons?limit=1000`);
        const data = await res.json();
        if (data.success && data.data) {
          const coupons = data.data;
          const updated = CATEGORIES_DATA.map(cat => {
            const catNameLower = cat.name.toLowerCase();
            
            // Map frontend English names to the global category tags stored in DB (including Russian Admitad tags)
            const mapping: Record<string, string[]> = {
              'fashion': ['одежда', 'обувь', 'аксессуары', 'fashion', 'clothing'],
              'electronics': ['электроника', 'техника', 'electronics'],
              'travel': ['туризм', 'путешествия', 'билеты', 'отели', 'travel'],
              'luxury': ['ювелирные', 'luxury', 'premium'],
              'home & living': ['дом', 'мебель', 'home', 'living'],
              'food & dining': ['еда', 'доставка', 'продукты', 'food', 'dining'],
              'sports': ['спорт', 'фитнес', 'sports', 'fitness'],
              'kids': ['дети', 'детские', 'kids', 'baby'],
              'health & beauty': ['здоровье', 'красота', 'аптеки', 'health', 'beauty', 'косметика'],
              'gaming': ['игры', 'gaming'],
              'automotive': ['авто', 'мото', 'automotive', 'car'],
              'computing': ['программы', 'it-сервисы', 'компьютер', 'computing', 'software', 'утилиты']
            };

            const keywords = mapping[catNameLower] || [catNameLower];

            const count = coupons.filter((c: any) => {
              if (!c.category) return false;
              const dbCat = c.category.toLowerCase();
              return keywords.some(kw => dbCat.includes(kw));
            }).length;

            return { ...cat, count };
          });
          setCategories(updated);
        }
      } catch (err) {
        console.error("Failed to fetch live coupon counts for category grid:", err);
      } finally {
        setIsLoading(false);
      }
    };
    fetchCouponCounts();
  }, []);

  const filtered = categories.filter(cat => 
    cat.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const displayed = filtered.slice(0, limit);

  return (
    <div className="space-y-12">
      <div className="grid grid-cols-2 md:grid-cols-2 xl:grid-cols-3 gap-3 xs:gap-6">
        {isLoading ? (
          [1,2,3,4,5,6].map(i => (
            <div key={i} className="h-44 sm:h-64 bg-slate-50 rounded-[24px] sm:rounded-[40px] animate-pulse" />
          ))
        ) : (
          displayed.map((cat, idx) => (
            <motion.div
              key={cat.id}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: idx * 0.05 }}
            >
              <Link 
                href={`/deals?category=${cat.name.toLowerCase().replace(/\s+/g, '-')}`}
                className="group bg-white rounded-[24px] sm:rounded-[40px] p-4 sm:p-8 border border-slate-50 hover:shadow-2xl hover:shadow-slate-100 transition-all flex flex-col items-center text-center relative overflow-hidden h-full justify-between"
              >
                <div className="flex flex-col items-center">
                  <div className={`w-12 h-12 sm:w-20 sm:h-20 ${cat.bg} rounded-2xl sm:rounded-3xl flex items-center justify-center mb-3 sm:mb-6 group-hover:scale-110 transition-transform duration-500`}>
                    <cat.icon className={`w-6 h-6 sm:w-10 sm:h-10 ${cat.color}`} />
                  </div>
                  
                  <h3 className="text-xs xs:text-sm sm:text-xl font-black text-[#1A1C1C] mb-1 sm:mb-2 line-clamp-1">{cat.name}</h3>
                  <p className="text-slate-400 font-bold text-[8px] xs:text-[10px] sm:text-[12px] uppercase tracking-wider sm:tracking-widest">
                    {cat.count} Active Offers
                  </p>
                </div>
                
                <div className="absolute top-3 right-3 sm:top-6 sm:right-6 opacity-0 group-hover:opacity-100 transition-opacity hidden sm:block">
                  <div className="w-8 h-8 rounded-full bg-[#FF9800] flex items-center justify-center text-white">
                    <ArrowRight className="w-4 h-4" strokeWidth={3} />
                  </div>
                </div>
              </Link>
            </motion.div>
          ))
        )}
      </div>

      {limit < filtered.length && !isLoading && (
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
