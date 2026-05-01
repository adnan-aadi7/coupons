"use client";

import { useState } from 'react';
import { useGetCouponsQuery } from '@/redux/api/couponApi';
import HotDealsHero from '@/components/hot-deals/HotDealsHero';
import HotDealsSidebar from '@/components/hot-deals/HotDealsSidebar';
import HotDealsGrid from '@/components/hot-deals/HotDealsGrid';
import DealModal from '@/components/deals/DealModal';

export default function HotDealsPage() {
  const [activeCategory, setActiveCategory] = useState('all');
  const [discountRange, setDiscountRange] = useState('25-50');
  const [dealType, setDealType] = useState('Promo Code');
  const [verifiedOnly, setVerifiedOnly] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCoupon, setSelectedCoupon] = useState<any>(null);

  const { data: hotDealsData, isLoading } = useGetCouponsQuery({
    category: activeCategory !== 'all' ? activeCategory : undefined,
    sort: 'recent',
    limit: 20
  });

  const allDeals = (hotDealsData as any)?.data || [];

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

      <div className="max-w-[1440px] mx-auto px-6 md:px-12">
        <HotDealsHero onSearch={setSearchQuery} />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 mt-8">
          {/* Left Sidebar - Sticky */}
          <div className="lg:col-span-3">
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
            <div className="flex items-center justify-between mb-12 pb-6 border-b border-slate-50">
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

            <div className="mt-20 flex justify-center">
              <button className="px-14 py-5 bg-white border border-slate-100 rounded-full font-black text-[12px] uppercase tracking-widest hover:border-[#FF9800] hover:text-[#FF9800] transition-all shadow-sm">
                Unlock More Deals
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
