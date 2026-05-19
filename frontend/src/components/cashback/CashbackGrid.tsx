"use client";

import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import { Zap, ShieldCheck } from 'lucide-react';

function CashbackRow({ store, idx }: { store: any, idx: number }) {
  const cleanLogoUrl = store.logoUrl 
    ? store.logoUrl.replace(/^http:\/\//i, 'https://') 
    : `https://logo.clearbit.com/${store.slug}.com`;
    
  const [logoUrl, setLogoUrl] = useState(cleanLogoUrl);
  const fallbackLogoUrl = `https://www.google.com/s2/favicons?domain=${store.slug}.com&sz=128`;

  const getCategoryImage = (category: string) => {
    const cat = (category || '').toLowerCase();
    if (cat.includes('electr') || cat.includes('smart') || cat.includes('mobile')) {
      return 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&q=80&w=800';
    }
    if (cat.includes('fash') || cat.includes('cloth') || cat.includes('apparel') || cat.includes('shoes')) {
      return 'https://images.unsplash.com/photo-1594932224036-9c67192f9bc2?auto=format&fit=crop&q=80&w=800';
    }
    if (cat.includes('travel') || cat.includes('flight') || cat.includes('hotel') || cat.includes('tour')) {
      return 'https://images.unsplash.com/photo-1436491865332-7a61a109cc05?auto=format&fit=crop&q=80&w=800';
    }
    return 'https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?auto=format&fit=crop&q=80&w=800';
  };

  const displayDesc = `Shop at ${store.name} and claim premium cashback rewards. Save big on your entire order with exclusive active coupons!`;

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: idx * 0.1, duration: 0.6 }}
      className="group relative flex flex-col lg:flex-row items-stretch gap-6 mb-6 lg:mb-8 h-auto lg:h-[310px]"
    >
      {/* Left Info Box */}
      <div className="flex-1 bg-white rounded-[32px] p-6 md:p-8 shadow-[0px_16px_36px_rgba(0,0,0,0.03)] border border-slate-50 flex flex-col justify-between z-10">
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <div className="w-16 h-16 md:w-20 md:h-20 bg-white border border-slate-100 rounded-2xl flex items-center justify-center p-2 shadow-sm shrink-0">
              <img 
                src={logoUrl} 
                alt={store.name} 
                className="max-w-full max-h-full object-contain mix-blend-multiply" 
                onError={() => setLogoUrl(fallbackLogoUrl)}
              />
            </div>
            <div className="flex items-center gap-1.5 bg-orange-50 text-[#FF9800] px-2.5 py-1 rounded-full border border-orange-100 text-[8px] md:text-[9px] font-black uppercase tracking-widest">
              <Zap className="w-3 h-3 fill-current" />
              Boosted
            </div>
          </div>

          <div>
            <div className="text-slate-400 font-bold text-[10px] uppercase tracking-widest mb-0.5">{store.category || "Verified Brand"}</div>
            <h3 className="text-[22px] md:text-[30px] font-black text-[#1A1C1C] leading-none tracking-tight">
              {store.cashbackRate}% Cashback
            </h3>
            <div className="text-emerald-500 font-black text-[9px] uppercase tracking-widest mt-0.5">
               Instead of {Math.max(1, Math.floor(store.cashbackRate * 0.4))}%
            </div>
            <p className="mt-2 text-slate-500 font-medium text-[12px] md:text-[13px] leading-relaxed max-w-[420px] line-clamp-2">
              {displayDesc}
            </p>
          </div>
        </div>

        {/* Footer Area with Avatars and Button */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-4 border-t border-slate-50">
           <div className="flex items-center gap-2">
              <div className="flex -space-x-2.5">
                  {[1,2,3].map(i => (
                    <div key={i} className="w-7 h-7 rounded-full border-2 border-white bg-slate-100 overflow-hidden">
                      <img src={`https://i.pravatar.cc/100?u=${i + 50 + idx}`} alt="user" />
                    </div>
                  ))}
              </div>
              <span className="text-[8px] md:text-[9px] font-black text-slate-300 uppercase tracking-widest">
                  {Math.floor(Math.random() * 500 + 100)} redeemed
              </span>
           </div>

           <a 
             href={`/store/${store.slug}`}
             className="w-full sm:w-auto px-6 py-2.5 bg-[#1A1C1C] text-white rounded-full font-black text-[10px] uppercase tracking-widest hover:bg-[#FF9800] text-center transition-all shadow-md active:scale-95 whitespace-nowrap"
           >
             Activate Cashback
           </a>
        </div>
      </div>

      {/* Right Visual Area */}
      <a 
        href={`/store/${store.slug}`}
        className="flex-1 md:flex-[1.1] min-h-[200px] lg:min-h-0 rounded-[32px] overflow-hidden relative group-hover:shadow-lg transition-all duration-700 block"
      >
        <img 
          src={getCategoryImage(store.category)} 
          alt={store.name} 
          className="w-full h-full object-cover group-hover:scale-103 transition-transform duration-1000"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#1A1C1C]/40 to-transparent opacity-60" />
        
        <div className="absolute top-4 right-4">
           <div className="flex items-center gap-1.5 bg-white/20 backdrop-blur-md px-3 py-1.5 rounded-full border border-white/20 text-white">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span className="text-[8px] md:text-[9px] font-black uppercase tracking-widest">Verified Partner</span>
           </div>
        </div>
      </a>
    </motion.div>
  );
}

export default function CashbackGrid() {
  const [stores, setStores] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchTopStores = async () => {
      try {
        const res = await fetch('http://localhost:5000/api/stores');
        const data = await res.json();
        if (data.success && data.data) {
          // Sort by highest cashback rate and take top 4 stores
          const sorted = [...data.data].sort((a, b) => b.cashbackRate - a.cashbackRate);
          setStores(sorted.slice(0, 4));
        }
      } catch (err) {
        console.error("Failed to load stores for cashback grid:", err);
      } finally {
        setIsLoading(false);
      }
    };
    fetchTopStores();
  }, []);

  return (
    <div className="max-w-[1200px] mx-auto py-12 md:py-24 px-4 sm:px-0">
      <div className="flex flex-col sm:flex-row items-center justify-between mb-12 md:mb-16 border-b border-slate-100 pb-10 gap-6">
        <div className="text-center sm:text-left space-y-2">
          <h2 className="text-[11px] md:text-[13px] font-black text-[#FF9800] uppercase tracking-[0.3em]">Curated Offers</h2>
          <h3 className="text-3xl md:text-4xl font-black text-[#1A1C1C]">Selection of the Day.</h3>
        </div>
        <div className="flex items-center gap-4 text-slate-400 text-xs md:text-sm font-bold">
           Updated Live
        </div>
      </div>

      <div className="space-y-8 lg:space-y-12">
        {isLoading ? (
          [1,2,3].map(i => (
            <div key={i} className="h-96 bg-slate-50 rounded-[40px] animate-pulse" />
          ))
        ) : (
          stores.map((store, i) => (
            <CashbackRow key={store._id} store={store} idx={i} />
          ))
        )}
        
        {!isLoading && stores.length === 0 && (
          <div className="py-20 text-center bg-slate-50 rounded-[40px] border border-dashed border-slate-200">
            <p className="text-slate-400 font-bold italic">No cashback stores verified yet.</p>
          </div>
        )}
      </div>
      
      <div className="mt-16 md:mt-20 flex justify-center">
        <a 
          href="/stores" 
          className="w-full sm:w-auto px-14 py-6 bg-white border border-slate-100 rounded-full font-black text-[12px] uppercase tracking-widest hover:border-[#FF9800] hover:text-[#FF9800] transition-all text-center shadow-sm"
        >
           Explore More Rewards
        </a>
      </div>
    </div>
  );
}
