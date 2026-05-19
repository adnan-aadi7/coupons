import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '@/redux/store';
import { fetchStores } from '@/redux/slices/storeSlice';
import Link from 'next/link';
import { ArrowRight, Clock, Store } from 'lucide-react';
import { motion } from 'framer-motion';

// Blurred ghost brands shown while pending approval
const GHOST_BRANDS = ['Amazon', 'Nike', 'Apple', 'Adidas', 'Samsung', 'Zara', 'H&M', 'Sephora'];

export default function BrandGrid() {
  const dispatch = useDispatch<AppDispatch>();
  const { stores, loading } = useSelector((state: RootState) => state.stores);

  useEffect(() => {
    if (stores.length === 0) {
      dispatch(fetchStores({ featured: true }));
    }
  }, [dispatch, stores.length]);

  // ── LOADING STATE ──────────────────────────
  if (loading && stores.length === 0) {
    return (
      <section className="py-16 border-b border-slate-100">
        <div className="max-w-[1280px] mx-auto px-4 md:px-8 flex items-center justify-center py-20">
          <div className="w-8 h-8 border-4 border-[#FF9800] border-t-transparent rounded-full animate-spin" />
        </div>
      </section>
    );
  }

  // ── NORMAL STATE (stores exist) ───────────────────────────────────────
  return (
    <section className="py-7 border-b border-slate-100">
      <div className="max-w-[1280px] mx-auto px-4 md:px-8">

        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-12">
          <div>
            <h2 className="text-[32px] md:text-[40px] font-['Manrope'] font-semibold text-[#1A1C1C] leading-[1.1] tracking-[-0.8px] mb-2 text-center sm:text-left">
              Partner Directory
            </h2>
            <p className="text-[16px] md:text-[18px] font-['Manrope'] text-[#554434] leading-[24px] text-center sm:text-left">
              Access exclusive cashback from {stores.length}+ elite global brands.
            </p>
          </div>
          <div className="flex justify-center sm:justify-end">
            <Link
              href="/stores"
              className="group flex items-center justify-center sm:justify-start gap-2 font-['Manrope'] font-bold text-[#8B5000] text-[15px] hover:text-[#FF9800] transition-colors"
            >
              <span>View All Stores</span>
              <ArrowRight className="w-5 h-5 transform group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>

        {/* Carousel */}
        <div className="flex overflow-x-auto snap-x snap-mandatory gap-8 pb-12 hide-scrollbar px-4">
          {stores.map((store, i) => (
            <Link
              key={store._id}
              href={`/store/${store.slug}`}
              className="shrink-0 snap-start group flex flex-col items-center text-center"
            >
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ delay: i * 0.05, duration: 0.4 }}
                className="flex flex-col items-center"
              >
                {/* Circular Logo Container */}
                <div className="w-32 h-32 sm:w-40 sm:h-40 bg-[#E2E8F0]/30 rounded-full flex items-center justify-center mb-6 relative transition-all duration-500 group-hover:bg-[#E2E8F0]/60 group-hover:scale-105 group-hover:shadow-[0_20px_50px_rgba(0,0,0,0.1)] overflow-hidden">
                  <img
                    src={store.logoUrl || `https://logo.clearbit.com/${store.slug}.com`}
                    alt={store.name}
                    className="w-1/2 h-1/2 object-contain transition-all duration-500"
                    onError={(e) => { e.currentTarget.src = `https://ui-avatars.com/api/?name=${store.name}&background=cbd5e1&color=475569&bold=true` }}
                  />
                </div>

                {/* Info */}
                <div className="space-y-1">
                  <p className="text-[#8B5000] font-black text-[11px] uppercase tracking-wider">
                    {store.cashbackRate}% BACK
                  </p>
                  <h3 className="text-[17px] font-bold text-[#1A1C1C]">
                    {store.name}
                  </h3>
                  <p className="text-slate-400 font-bold text-[9px] uppercase tracking-[2px]">
                    {store.category || 'GENERAL'}
                  </p>
                </div>
              </motion.div>
            </Link>
          ))}
        </div>
      </div>

      <style dangerouslySetInnerHTML={{
        __html: `
        .hide-scrollbar::-webkit-scrollbar { display: none; }
        .hide-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
      `}} />
    </section>
  );
}
