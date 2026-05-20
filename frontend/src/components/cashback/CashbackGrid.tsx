"use client";

import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import { Zap, ShieldCheck, Loader2 } from 'lucide-react';
import { getProxyLogoUrl } from '@/utils/imageHelper';

function CashbackRow({ store, idx, onActivate }: { store: any; idx: number; onActivate: (store: any) => void }) {
  const [logoUrl, setLogoUrl] = useState(getProxyLogoUrl(store.logoUrl, store.slug));
  const fallbackLogoUrl = `https://www.google.com/s2/favicons?domain=${store.slug}.com&sz=128`;

  // Curated Unsplash photo IDs mapped to store categories for always-relevant images
  const getCuratedBanner = (): string => {
    const cat = ((store.category || '') + ' ' + store.name).toLowerCase();
    if (cat.match(/food|restaurant|delivery|eat|meal|chef|grocer|pizza|burger|coffee/))
      return 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=800&q=80';
    if (cat.match(/fashion|cloth|apparel|dress|shoe|wear|style|outfit|bag|jewelry/))
      return 'https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&w=800&q=80';
    if (cat.match(/electr|gadget|tech|phone|laptop|computer|camera|samsung|apple|xiaomi/))
      return 'https://images.unsplash.com/photo-1531297484001-80022131f5a1?auto=format&fit=crop&w=800&q=80';
    if (cat.match(/travel|hotel|flight|tour|booking|holiday|trip|vacation|resort/))
      return 'https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?auto=format&fit=crop&w=800&q=80';
    if (cat.match(/health|beauty|skin|cosmetic|pharma|wellness|fitness|gym|yoga/))
      return 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&w=800&q=80';
    if (cat.match(/sport|outdoor|bike|hiking|running|football|soccer|nike|adidas/))
      return 'https://images.unsplash.com/photo-1461896836934-ffe607ba8211?auto=format&fit=crop&w=800&q=80';
    if (cat.match(/home|garden|furniture|decor|interior|kitchen|living|bed|bath/))
      return 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?auto=format&fit=crop&w=800&q=80';
    if (cat.match(/book|education|course|learn|study|school|online|e-learn|skill/))
      return 'https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?auto=format&fit=crop&w=800&q=80';
    if (cat.match(/host|vpn|cloud|server|domain|software|saas|security|kaspersky|nord/))
      return 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=800&q=80';
    if (cat.match(/toy|kid|child|baby|game|play|lego/))
      return 'https://images.unsplash.com/photo-1618842676088-c4d48a6a7c9d?auto=format&fit=crop&w=800&q=80';
    if (cat.match(/pet|dog|cat|animal|vet|paw/))
      return 'https://images.unsplash.com/photo-1587300003388-59208cc962cb?auto=format&fit=crop&w=800&q=80';
    if (cat.match(/auto|car|vehicle|motor|tire|drive/))
      return 'https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?auto=format&fit=crop&w=800&q=80';
    if (cat.match(/flower|gift|bouquet|flora|plant/))
      return 'https://images.unsplash.com/photo-1490750967868-88df5691cc71?auto=format&fit=crop&w=800&q=80';
    return 'https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?auto=format&fit=crop&w=800&q=80';
  };

  const [bannerUrl, setBannerUrl] = useState(store.bannerImage || getCuratedBanner());

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: idx * 0.1, duration: 0.6 }}
      onClick={() => onActivate(store)}
      className="w-full bg-white rounded-3xl sm:rounded-[32px] p-3.5 sm:p-6 shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-slate-100 flex flex-row sm:flex-row items-center sm:items-stretch gap-3 sm:gap-0 mb-4 sm:mb-6 lg:mb-8 hover:shadow-[0_15px_40px_rgb(0,0,0,0.08)] transition-all h-[110px] sm:h-[260px] cursor-pointer group relative overflow-hidden"
    >
      {/* Left Info Box */}
      <div className="w-full sm:w-[45%] flex flex-row sm:flex-col items-center sm:items-stretch justify-between py-1 sm:py-2 px-1 sm:px-6 z-10 relative sm:pr-14 text-left gap-3 sm:gap-0 flex-1 min-w-0">
        <div className="flex flex-row sm:flex-col items-center sm:items-start gap-3 sm:gap-0 flex-1 min-w-0">
          {/* Mobile-only Logo */}
          <div className="w-16 h-16 bg-white border border-slate-100 rounded-2xl shadow-sm flex items-center justify-center p-2.5 sm:hidden shrink-0">
            <img
              src={logoUrl}
              alt={store.name}
              className="max-w-full max-h-full object-contain mix-blend-multiply"
              onError={() => setLogoUrl(fallbackLogoUrl)}
            />
          </div>

          <div className="min-w-0 flex-1 sm:flex-none">
            <h4 className="text-slate-500 font-bold text-[11px] sm:text-[14px] mb-0.5 sm:mb-2 truncate">{store.name}</h4>
            <h3 className="text-xl sm:text-[38px] font-black text-[#1A1C1C] leading-none mb-0.5 sm:mb-3 tracking-tight">
              {store.cashbackRate}% Cashback
            </h3>
            <p className="text-slate-500 font-medium text-[11px] sm:text-[15px] hidden sm:block">
              Instead of {Math.max(1, Math.floor(store.cashbackRate * 0.7))}%
            </p>
          </div>
        </div>

        <div className="shrink-0 sm:mt-0">
          <button
            className="inline-block px-5 py-2.5 sm:px-10 sm:py-4 bg-[#1e2338] text-white rounded-full font-bold text-[11px] sm:text-[14px] hover:bg-[#111424] transition-all shadow-md active:scale-95 group-hover:bg-[#FF9800]"
          >
            Activate
          </button>
        </div>
      </div>

      {/* Right Visual Area (Hidden on mobile for maximum responsiveness) */}
      <div className="hidden sm:block flex-1 w-full h-[220px] sm:h-full relative mt-8 sm:mt-0">
        {/* Image Wrapper */}
        <div className="w-full h-full rounded-[24px] overflow-hidden">
          <img
            src={bannerUrl}
            alt={store.name}
            className="w-full h-full object-cover transition-transform duration-1000 hover:scale-105"
            onError={() => setBannerUrl(getCuratedBanner())}
          />
        </div>

        {/* Overlapping Logo */}
        <div className="absolute top-[-30px] left-6 sm:top-1/2 sm:-translate-y-1/2 sm:left-[-30px] w-24 h-24 sm:w-[110px] sm:h-[110px] bg-white border border-slate-100 rounded-2xl sm:rounded-3xl shadow-[0_20px_40px_rgba(0,0,0,0.1)] flex items-center justify-center p-3 z-20 bg-clip-padding">
          <img
            src={logoUrl}
            alt={store.name}
            className="max-w-full max-h-full object-contain mix-blend-multiply"
            onError={() => setLogoUrl(fallbackLogoUrl)}
          />
        </div>
      </div>
    </motion.div>
  );
}

export default function CashbackGrid() {
  const [stores, setStores] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [visibleCount, setVisibleCount] = useState(5);

  useEffect(() => {
    const fetchTopStores = async () => {
      try {
        const API_URL = process.env.NEXT_PUBLIC_API_URL || 'https://coupons-52jf.vercel.app/api';
        const res = await fetch(`${API_URL}/stores`);
        const data = await res.json();
        if (data.success && data.data) {
          // Only show stores with cashback > 0, sorted by highest rate
          const withCashback = data.data.filter((s: any) => s.cashbackRate > 0);
          const sorted = [...withCashback].sort((a: any, b: any) => b.cashbackRate - a.cashbackRate);
          setStores(sorted);
        }
      } catch (err) {
        console.error("Failed to load stores for cashback grid:", err);
      } finally {
        setIsLoading(false);
      }
    };
    fetchTopStores();
  }, []);

  const visibleStores = stores.slice(0, visibleCount);
  const hasMore = stores.length > visibleCount;

  return (
    <div id="cashback-grid-section" className="max-w-[1200px] mx-auto py-12 md:py-24  sm:px-0">
      <div className="flex flex-col sm:flex-row items-center justify-between mb-12 md:mb-16 border-b border-slate-100 pb-10 gap-6">
        <div className="text-center sm:text-left space-y-2">
          <h2 className="text-[11px] md:text-[13px] font-black text-[#FF9800] uppercase tracking-[0.3em]">Curated Offers</h2>
          <h3 className="text-3xl md:text-4xl font-black text-[#1A1C1C]">
            Selection of the Day.
            {!isLoading && stores.length > 0 && (
              <span className="ml-3 text-base font-bold text-slate-300">({stores.length} stores)</span>
            )}
          </h3>
        </div>
        <div className="flex items-center gap-4 text-slate-400 text-xs md:text-sm font-bold">
          Updated Live
        </div>
      </div>

      <div className="space-y-8 lg:space-y-12">
        {isLoading ? (
          [1, 2, 3].map(i => (
            <div key={i} className="h-64 bg-slate-50 rounded-[40px] animate-pulse" />
          ))
        ) : (
          visibleStores.map((store, i) => (
            <CashbackRow
              key={store._id}
              store={store}
              idx={i}
              onActivate={(s) => window.location.href = `/store/${s.slug}?activate=true`}
            />
          ))
        )}

        {!isLoading && stores.length === 0 && (
          <div className="py-20 text-center bg-slate-50 rounded-[40px] border border-dashed border-slate-200">
            <p className="text-slate-400 font-bold italic">No cashback stores verified yet.</p>
          </div>
        )}
      </div>



      {/* Load More */}
      {!isLoading && hasMore && (
        <div className="flex flex-col items-center justify-center mt-16">
          <p className="text-sm font-bold text-slate-400 mb-4">
            Showing {visibleStores.length} of {stores.length} cashback stores
          </p>
          <button
            onClick={() => setVisibleCount(prev => prev + 5)}
            className="flex items-center gap-2 px-5 py-4 bg-white border-2 border-slate-200 rounded-full font-bold text-[#1A1C1C] hover:border-[#FF9800] hover:text-[#FF9800] transition-colors shadow-sm cursor-pointer"
          >
            Load 5 More Stores
          </button>
        </div>
      )}

      {!isLoading && !hasMore && stores.length > 0 && (
        <div className="mt-16 flex justify-center">
          <a
            href="/stores"
            className="w-full sm:w-auto px-14 py-6 bg-white border border-slate-100 rounded-full font-black text-[12px] uppercase tracking-widest hover:border-[#FF9800] hover:text-[#FF9800] transition-all text-center shadow-sm"
          >
            Explore All Stores
          </a>
        </div>
      )}
    </div>
  );
}
