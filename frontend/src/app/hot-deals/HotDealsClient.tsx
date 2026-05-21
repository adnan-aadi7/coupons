"use client";

import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '@/redux/store';
import { fetchCoupons } from '@/redux/slices/couponSlice';
import HotDealsHero from '@/components/hot-deals/HotDealsHero';
import HotDealsSidebar from '@/components/hot-deals/HotDealsSidebar';
import HotDealsGrid from '@/components/hot-deals/HotDealsGrid';
import DealModal from '@/components/deals/DealModal';

export default function HotDealsClient() {
  const [activeCategory, setActiveCategory] = useState('all');
  const [discountRange, setDiscountRange] = useState('25-50');
  const [dealType, setDealType] = useState('Promo Code');
  const [verifiedOnly, setVerifiedOnly] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCoupon, setSelectedCoupon] = useState<any>(null);

  const dispatch = useDispatch<AppDispatch>();
  const { coupons: allDeals, loading: isLoading } = useSelector((state: RootState) => state.coupons);

  useEffect(() => {
    dispatch(fetchCoupons({
      category: activeCategory !== 'all' ? activeCategory : undefined,
      sort: 'recent',
      type: 'deal'
    }));
  }, [dispatch, activeCategory]);

  const filteredDeals = allDeals.filter((d: any) => {
    return !searchQuery ||
      d.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      d.store?.toLowerCase().includes(searchQuery.toLowerCase());
  });

  return (
    <div className="bg-white  pt-10 pb-10 font-['Manrope']">
      <DealModal
        isOpen={!!selectedCoupon}
        onClose={() => setSelectedCoupon(null)}
        coupon={selectedCoupon}
      />

      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 md:px-12">
        <HotDealsHero onSearch={setSearchQuery} />

        {/* Mobile Horizontal Filter Slider */}
        <div className="lg:hidden mt-6 space-y-4">
          <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none scroll-smooth">
            {[
              { id: 'all', name: 'All Deals' },
              { id: 'fashion', name: 'Fashion' },
              { id: 'tech', name: 'Tech' },
              { id: 'beauty', name: 'Beauty' },
              { id: 'home', name: 'Home' },
              { id: 'travel', name: 'Travel' },
            ].map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`shrink-0 px-5 py-2.5 rounded-full font-black text-[10px] uppercase tracking-wider transition-all border ${activeCategory === cat.id
                  ? 'bg-[#FF9800] text-white border-transparent shadow-md'
                  : 'bg-white text-slate-500 border-slate-100 hover:bg-slate-50'
                  }`}
              >
                {cat.name === 'All Deals' ? 'All' : cat.name}
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

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 mt-8">
          {/* Left Sidebar - Sticky */}
          <div className="hidden lg:block lg:col-span-3">
            <div className="sticky top-32">
              <HotDealsSidebar
                activeCategory={activeCategory}
                onCategoryChange={setActiveCategory}
                discountRange={discountRange}
                onDiscountChange={setDiscountRange}
                dealType={dealType}
                onTypeChange={setDealType}
                verifiedOnly={verifiedOnly}
                onVerifiedToggle={() => setVerifiedOnly(!verifiedOnly)}
              />
            </div>
          </div>

          {/* Main Hot Deals List */}
          <div className="lg:col-span-9">
            <div className="flex items-center justify-between mb-8 sm:mb-12 pb-4 sm:pb-6 border-b border-slate-50">
              <div className="flex items-center gap-3">
                <h2 className="text-xl font-black text-[#1A1C1C] uppercase tracking-tight">Current Flash Offers</h2>
              </div>
              <span className="text-slate-300 text-sm font-bold uppercase tracking-widest">{filteredDeals.length} LIVE NOW</span>
            </div>

            <HotDealsGrid
              coupons={filteredDeals}
              isLoading={isLoading}
              onOpenDeal={setSelectedCoupon}
            />

            {/* <div className="mt-20 flex justify-center">
              <button className="px-14 py-5 bg-white border border-slate-100 rounded-full font-black text-[12px] uppercase tracking-widest hover:border-[#FF9800] hover:text-[#FF9800] transition-all shadow-sm">
                Unlock More Deals
              </button>
            </div> */}
          </div>
        </div>
      </div>
    </div>
  );
}
