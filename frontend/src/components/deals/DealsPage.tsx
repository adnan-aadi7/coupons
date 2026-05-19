"use client";

import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '@/redux/store';
import { fetchCoupons } from '@/redux/slices/couponSlice';
import DealsHero from './DealsHero';
import DealsSidebar from './DealsSidebar';
import DealsGrid from './DealsGrid';
import DealModal from './DealModal';

export default function DealsPage() {
  const [activeCategory, setActiveCategory] = useState('All Deals');
  const [searchQuery, setSearchQuery] = useState('');
  const [verifiedOnly, setVerifiedOnly] = useState(false);
  const [selectedCoupon, setSelectedCoupon] = useState<any>(null);

  const dispatch = useDispatch<AppDispatch>();
  const { coupons: allCoupons, loading: isLoading } = useSelector((state: RootState) => state.coupons);

  useEffect(() => {
    dispatch(fetchCoupons({
      category: activeCategory !== 'All Deals' ? activeCategory.toLowerCase() : undefined,
      sort: 'popularity'
    }));
  }, [dispatch, activeCategory]);
  
  // Client-side search filtering
  const filteredCoupons = allCoupons.filter((c: any) => {
    const matchesSearch = c.title?.toLowerCase().includes(searchQuery.toLowerCase()) || 
                         c.store?.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesSearch;
  });

  return (
    <div className="bg-[#F8F9FA] min-h-screen pt-24 sm:pt-32 pb-16 sm:pb-24 px-4 md:px-8">
      <DealModal 
        isOpen={!!selectedCoupon} 
        onClose={() => setSelectedCoupon(null)} 
        coupon={selectedCoupon} 
      />

      <div className="max-w-[1400px] mx-auto">
        <DealsHero onSearch={setSearchQuery} />

        {/* Mobile Horizontal Filter Slider */}
        <div className="lg:hidden mt-6 space-y-4">
          <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none scroll-smooth">
            {['All Deals', 'Fashion', 'Electronics', 'Luxury', 'Travel', 'Food'].map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`shrink-0 px-5 py-2.5 rounded-full font-black text-[10px] uppercase tracking-wider transition-all border ${
                  activeCategory === cat 
                    ? 'bg-[#FF9800] text-white border-transparent shadow-md' 
                    : 'bg-white text-slate-500 border-slate-100 hover:bg-slate-50'
                }`}
              >
                {cat === 'All Deals' ? 'All' : cat}
              </button>
            ))}
          </div>

          <div className="flex items-center justify-between bg-white px-5 py-4 rounded-2xl border border-slate-100 shadow-sm">
            <span className="font-black text-[11px] uppercase tracking-widest text-slate-600">Verified Only</span>
            <button 
              onClick={() => setVerifiedOnly(!verifiedOnly)}
              className={`w-10 h-5 rounded-full relative transition-colors ${verifiedOnly ? 'bg-[#FF9800]' : 'bg-slate-200'}`}
            >
              <div className={`absolute top-0.5 w-4 h-4 bg-white rounded-full transition-all ${verifiedOnly ? 'left-5.5' : 'left-0.5'}`} />
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 mt-12">
          {/* Left Filters */}
          <DealsSidebar 
            activeCategory={activeCategory}
            onCategoryChange={setActiveCategory}
            verificationFilter={verifiedOnly}
            onVerificationToggle={() => setVerifiedOnly(!verifiedOnly)}
          />

          {/* Main Coupons List */}
          <div className="lg:col-span-9">
            <DealsGrid 
              coupons={filteredCoupons} 
              isLoading={isLoading} 
              onOpenDeal={setSelectedCoupon}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
