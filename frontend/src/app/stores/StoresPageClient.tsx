"use client";

import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '@/redux/store';
import { fetchStores } from '@/redux/slices/storeSlice';
import { Search, Store } from 'lucide-react';
import { motion } from 'framer-motion';
import Link from 'next/link';

export default function StoresPageClient() {
  const dispatch = useDispatch<AppDispatch>();
  const { stores, loading } = useSelector((state: RootState) => state.stores);
  const [localSearch, setLocalSearch] = useState('');

  useEffect(() => {
    dispatch(fetchStores());
  }, [dispatch]);

  const activeStores = stores.filter(s => s.slug);

  const filteredStores = activeStores.filter(store =>
    store.name.toLowerCase().includes(localSearch.toLowerCase()) ||
    store.category?.toLowerCase().includes(localSearch.toLowerCase())
  );

  return (
    <div className="bg-[#F8F9FA] min-h-screen font-['Manrope'] pt-24 sm:pt-32 pb-16 sm:pb-24 text-[#1A1C1C]">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6">

        {/* Header */}
        <motion.div
          className="text-center mb-10 sm:mb-16 space-y-4 sm:space-y-5"
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-[32px] sm:text-[48px] md:text-[64px] font-black tracking-tight leading-tight px-2">
            Browse Our <span className="text-[#FF9800]">Verified</span> Stores
          </h1>
          <p className="text-slate-500 text-sm sm:text-[18px] max-w-[700px] mx-auto leading-relaxed font-medium px-4">
            Shop at your favorite global brands and earn
            <span className="text-[#1A1C1C] font-bold"> guaranteed cashback </span>
            on every purchase.
          </p>
        </motion.div>

        {/* Search Bar Container */}
        <motion.div
          className="max-w-[750px] mx-auto mb-10 sm:mb-16 space-y-6 px-2"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15, duration: 0.5 }}
        >
          <div className="relative">
            <div className="absolute left-5 sm:left-7 top-1/2 -translate-y-1/2 text-slate-400">
              <Search className="w-5 h-5 sm:w-6 sm:h-6" />
            </div>
            <input
              type="text"
              placeholder={loading ? "Loading partner stores..." : `Search ${activeStores.length} partner stores...`}
              value={localSearch}
              onChange={(e) => setLocalSearch(e.target.value)}
              className="w-full h-[58px] sm:h-[72px] bg-white rounded-2xl sm:rounded-3xl pl-12 sm:pl-16 pr-6 shadow-xl shadow-slate-200/50 border border-slate-100 text-slate-900 font-semibold text-sm sm:text-base focus:border-[#FF9800]/50 outline-none transition-all"
            />
          </div>
        </motion.div>

        {/* Stores Grid */}
        {loading ? (
          <div className="flex justify-center py-20">
            <div className="w-10 h-10 border-4 border-[#FF9800]/20 border-t-[#FF9800] rounded-full animate-spin" />
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-y-16 gap-x-8">
            {filteredStores.map((store, i) => (
              <motion.div
                key={store._id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.01, duration: 0.3 }}
              >
                <Link href={`/store/${store.slug}`} className="group flex flex-col items-center text-center">
                  {/* Circular Logo Container */}
                  <div className="w-32 h-32 sm:w-40 sm:h-40 bg-white rounded-full flex items-center justify-center mb-6 relative transition-all duration-500 group-hover:scale-105 shadow-[0_4px_20px_rgba(0,0,0,0.05)] group-hover:shadow-[0_20px_50px_rgba(0,0,0,0.1)] overflow-hidden border border-slate-50">
                    <img
                      src={(() => {
                        const { getProxyLogoUrl } = require('@/utils/imageHelper');
                        return getProxyLogoUrl(store.logoUrl, store.slug);
                      })()}
                      alt={store.name}
                      className="w-[60%] h-[60%] object-contain transition-all duration-500"
                      onError={(e) => {
                        e.currentTarget.src = `https://ui-avatars.com/api/?name=${store.name}&background=f8fafc&color=64748b&bold=true&size=128`;
                      }}
                    />
                  </div>

                  {/* Info */}
                  <div className="space-y-1">
                    <p className="text-[#8B5000] font-black text-[12px] uppercase tracking-wider">
                      {store.cashbackRate}% BACK
                    </p>
                    <h3 className="text-[17px] font-bold text-[#1A1C1C] line-clamp-1 px-2">
                      {store.name}
                    </h3>
                    <p className="text-slate-400 font-bold text-[9px] uppercase tracking-[2px]">
                      {store.category?.split(',')[0] || 'GENERAL'}
                    </p>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        )}

        {!loading && filteredStores.length === 0 && (
          <div className="text-center py-32 bg-white rounded-[40px] border border-dashed border-slate-200">
            <Store className="w-16 h-16 text-slate-200 mx-auto mb-4" />
            <h3 className="text-xl font-bold text-slate-900">No stores found</h3>
            <p className="text-slate-500">Try searching for a different brand or category.</p>
          </div>
        )}

      </div>
    </div>
  );
}
