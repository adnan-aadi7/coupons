"use client";

import { useState, useEffect, useRef } from 'react';
import { Search, Store, Tag, X, ArrowRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useRouter } from 'next/navigation';
import api from '@/redux/api';
import { getProxyLogoUrl } from '@/utils/imageHelper';

interface StoreResult { name: string; logo: string | null; slug: string; }
interface DealResult { _id: string; title: string; store: string; discountValue?: number; discountType?: string; type: string; brandLogo?: string; }

interface GlobalSearchBarProps {
  className?: string;
  inputClassName?: string;
  placeholder?: string;
}

export default function GlobalSearchBar({ className = '', inputClassName = '', placeholder = 'Search stores, deals & coupons...' }: GlobalSearchBarProps) {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<{ stores: StoreResult[]; deals: DealResult[] } | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  // Close dropdown on outside click
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setIsFocused(false);
      }
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  // Debounced search
  useEffect(() => {
    if (debounceRef.current) clearTimeout(debounceRef.current);
    if (query.trim().length < 2) {
      setResults(null);
      return;
    }
    debounceRef.current = setTimeout(async () => {
      setIsLoading(true);
      try {
        const res = await api.get(`/search/global?q=${encodeURIComponent(query)}`);
        setResults(res.data);
      } catch {
        setResults(null);
      } finally {
        setIsLoading(false);
      }
    }, 300);
  }, [query]);

  const hasResults = results && (results.stores.length > 0 || results.deals.length > 0);
  const showDropdown = isFocused && query.length >= 2;

  const handleStoreClick = (slug: string) => {
    setQuery('');
    setIsFocused(false);
    router.push(`/store/${slug}`);
  };

  const handleDealClick = () => {
    setIsFocused(false);
    router.push(`/coupons?q=${encodeURIComponent(query)}`);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && query.trim()) {
      setIsFocused(false);
      router.push(`/coupons?q=${encodeURIComponent(query)}`);
    }
  };

  return (
    <div ref={containerRef} className={`relative w-full ${className}`}>
      {/* Input */}
      <div className={`flex items-center gap-3 bg-white border-2 rounded-2xl px-4 py-3 transition-all ${
        isFocused ? 'border-[#FF9800] shadow-[0_0_0_4px_rgba(255,152,0,0.1)]' : 'border-slate-200 shadow-sm'
      } ${inputClassName}`}>
        {isLoading
          ? <div className="w-4 h-4 border-2 border-[#FF9800]/30 border-t-[#FF9800] rounded-full animate-spin shrink-0" />
          : <Search className="w-4 h-4 text-slate-400 shrink-0" />
        }
        <input
          type="text"
          value={query}
          onChange={e => setQuery(e.target.value)}
          onFocus={() => setIsFocused(true)}
          onKeyDown={handleKeyDown}
          placeholder={placeholder}
          className="flex-1 bg-transparent outline-none text-slate-800 placeholder:text-slate-400 font-medium text-xs md:text-sm min-w-0"
        />
        {query && (
          <button 
            onClick={() => { setQuery(''); setResults(null); }} 
            className="text-slate-300 hover:text-slate-500 transition-colors shrink-0 flex items-center justify-center p-0.5"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        )}
      </div>

      {/* Dropdown */}
      <AnimatePresence>
        {showDropdown && (
          <motion.div
            initial={{ opacity: 0, y: 8, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 8, scale: 0.98 }}
            transition={{ duration: 0.15 }}
            className="absolute top-full left-0 right-0 mt-2 bg-white rounded-2xl shadow-2xl shadow-slate-200/80 border border-slate-100 z-[200] overflow-hidden"
          >
            {!hasResults && !isLoading && (
              <div className="px-5 py-8 text-center text-slate-400 text-sm font-medium">
                No results for "<span className="text-slate-600 font-semibold">{query}</span>"
              </div>
            )}

            {/* Stores Section */}
            {results && results.stores.length > 0 && (
              <div className="p-2">
                <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400 px-3 pt-2 pb-1">Stores</p>
                {results.stores.map(store => (
                  <button
                    key={store.slug}
                    onClick={() => handleStoreClick(store.slug)}
                    className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-orange-50 transition-colors group"
                  >
                    {store.logo
                      ? <img src={getProxyLogoUrl(store.logo, store.slug)} alt={store.name} className="w-8 h-8 object-contain rounded-lg bg-slate-50 p-1 shrink-0" />
                      : <div className="w-8 h-8 rounded-lg bg-orange-100 flex items-center justify-center shrink-0"><Store className="w-4 h-4 text-[#FF9800]" /></div>
                    }
                    <span className="font-semibold text-slate-700 text-sm group-hover:text-[#FF9800] transition-colors">{store.name}</span>
                    <ArrowRight className="w-3.5 h-3.5 text-slate-300 group-hover:text-[#FF9800] ml-auto transition-colors" />
                  </button>
                ))}
              </div>
            )}

            {/* Deals Section */}
            {results && results.deals.length > 0 && (
              <div className="p-2 border-t border-slate-50">
                <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400 px-3 pt-2 pb-1">Deals & Coupons</p>
                {results.deals.map(deal => (
                  <button
                    key={deal._id}
                    onClick={handleDealClick}
                    className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-orange-50 transition-colors group text-left"
                  >
                    <div className="w-8 h-8 rounded-lg bg-orange-50 flex items-center justify-center shrink-0">
                      <Tag className="w-4 h-4 text-[#FF9800]" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-semibold text-slate-700 text-sm truncate group-hover:text-[#FF9800] transition-colors">{deal.title}</p>
                      <p className="text-xs text-slate-400 truncate">{deal.store}</p>
                    </div>
                    {deal.discountValue && (
                      <span className="text-xs font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full shrink-0">
                        {deal.discountType === 'percentage' ? `${deal.discountValue}% OFF` : `$${deal.discountValue} OFF`}
                      </span>
                    )}
                  </button>
                ))}
              </div>
            )}

            {/* See all results footer */}
            {hasResults && (
              <button
                onClick={handleDealClick}
                className="w-full flex items-center justify-center gap-2 py-3 bg-slate-50 hover:bg-orange-50 text-[#FF9800] font-bold text-sm transition-colors border-t border-slate-100"
              >
                See all results for "{query}" <ArrowRight className="w-4 h-4" />
              </button>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
