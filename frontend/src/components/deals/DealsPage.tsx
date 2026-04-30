"use client";

import { useState } from 'react';
import { useGetCouponsQuery } from '@/redux/api/couponApi';
import { motion } from 'framer-motion';
import { TrendingUp, ArrowRight, Tag, Search } from 'lucide-react';
import DealModal from '@/components/deals/DealModal';
import CategoryBar from '@/components/deals/CategoryBar';
import CouponCard from '@/components/deals/CouponCard';
import SectionHeader from '@/components/ui/SectionHeader';
import SkeletonCard from '@/components/ui/SkeletonCard';

const SORT_OPTIONS = [
  { label: 'Popular', value: 'popularity' },
  { label: 'Newest', value: 'newest' },
  { label: 'Expiring', value: 'expiry' },
];

export default function DealsPage() {
  const [activeCategory, setActiveCategory] = useState('all');
  const [sortBy, setSortBy] = useState('popularity');
  const [selectedCoupon, setSelectedCoupon] = useState<any>(null);

  const { data, isLoading } = useGetCouponsQuery({
    sort: sortBy,
    category: activeCategory !== 'all' ? activeCategory : undefined,
  });

  return (
    <div className="min-h-screen bg-background pb-24">
      <DealModal
        isOpen={!!selectedCoupon}
        onClose={() => setSelectedCoupon(null)}
        coupon={selectedCoupon}
      />

      {/* Page Hero */}
      <section className="relative pt-12 pb-12 px-4 border-b border-white/5">
        <div className="absolute top-0 right-0 w-[600px] h-[300px] bg-emerald-500/5 -z-10 rounded-full blur-[120px]" />
        <div className="absolute bottom-0 left-0 w-[400px] h-[200px] bg-indigo-500/5 -z-10 rounded-full blur-[100px]" />
        
        <div className="max-w-7xl mx-auto px-2">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <div className="flex items-center gap-2 mb-2">
              <div className="bg-primary/10 p-1.5 rounded-lg">
                <TrendingUp className="w-4 h-4 text-primary" />
              </div>
              <span className="text-[10px] font-black text-primary uppercase tracking-[0.2em]">Verified Savings Feed</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-black tracking-tighter text-foreground mb-4">
              All <span className="text-primary italic">Promo Codes.</span>
            </h1>
            <p className="text-foreground/40 font-bold text-lg max-w-2xl">
              Browse thousands of hand-tested coupons and deals from top retailers. Filter by category or sort by popularity to find the best savings.
            </p>
          </motion.div>

          {/* Filters Area */}
          <div className="mt-12 space-y-6">
            <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
              <CategoryBar activeCategory={activeCategory} onCategoryChange={setActiveCategory} />
              
              <div className="flex items-center gap-2 bg-white/5 p-1.5 rounded-2xl border border-white/5 shrink-0">
                <span className="text-[10px] font-black uppercase tracking-widest text-white/30 px-3">Sort by</span>
                {SORT_OPTIONS.map(opt => (
                  <button
                    key={opt.value}
                    onClick={() => setSortBy(opt.value)}
                    className={`px-5 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${sortBy === opt.value
                        ? 'bg-primary text-white shadow-xl shadow-primary/20 scale-105'
                        : 'text-white/40 hover:text-white hover:bg-white/5'
                      }`}
                  >
                    {opt.label}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Deals List */}
      <section className="max-w-7xl mx-auto px-4 md:px-6 pt-12">
        <div className="mb-10 flex items-center justify-between">
          <SectionHeader
            title={activeCategory !== 'all' ? `${activeCategory} Offers` : 'Recommended Offers'}
          />
          {activeCategory !== 'all' && (
            <button
              onClick={() => setActiveCategory('all')}
              className="text-[10px] font-black uppercase tracking-widest text-primary hover:underline flex items-center gap-2"
            >
              Clear Filters <ArrowRight className="w-4 h-4" />
            </button>
          )}
        </div>

        <div className="space-y-6">
          {isLoading
            ? [1, 2, 3, 4, 5, 6].map(i => <div key={i} className="h-48 w-full bg-white/5 animate-pulse rounded-3xl" />)
            : data?.data?.length > 0
              ? data.data.map((coupon: any, idx: number) => (
                <CouponCard key={coupon._id} coupon={coupon} idx={idx} onOpenDeal={setSelectedCoupon} />
              ))
              : (
                <div className="py-32 text-center bg-white/5 rounded-[40px] border border-white/5 border-dashed">
                  <Search className="w-16 h-16 text-white/10 mx-auto mb-6" />
                  <h3 className="text-2xl font-black text-foreground">No matching deals found</h3>
                  <p className="text-white/40 font-bold mt-2">Try adjusting your filters or category selection.</p>
                  <button 
                    onClick={() => { setActiveCategory('all'); setSortBy('popularity'); }}
                    className="mt-8 bg-primary text-white px-8 py-4 rounded-full font-black text-xs uppercase tracking-widest hover:bg-emerald-400 transition-all"
                  >
                    Reset All Filters
                  </button>
                </div>
              )
          }
        </div>
      </section>
    </div>
  );
}
