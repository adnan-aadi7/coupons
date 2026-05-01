"use client";

import { useState } from 'react';
import { useGetCouponsQuery } from '@/redux/api/couponApi';
import DealsHero from './DealsHero';
import DealsSidebar from './DealsSidebar';
import DealsGrid from './DealsGrid';
import DealModal from './DealModal';

export default function DealsPage() {
  const [activeCategory, setActiveCategory] = useState('All Deals');
  const [searchQuery, setSearchQuery] = useState('');
  const [verifiedOnly, setVerifiedOnly] = useState(false);
  const [selectedCoupon, setSelectedCoupon] = useState<any>(null);

  const { data: couponsData, isLoading } = useGetCouponsQuery({
    category: activeCategory !== 'All Deals' ? activeCategory.toLowerCase() : undefined,
    sort: 'popularity'
  });

  const allCoupons = (couponsData as any)?.data || [];
  
  // Client-side search filtering
  const filteredCoupons = allCoupons.filter((c: any) => {
    const matchesSearch = c.title?.toLowerCase().includes(searchQuery.toLowerCase()) || 
                         c.store?.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesSearch;
  });

  return (
    <div className="bg-[#F8F9FA] min-h-screen pt-32 pb-24 px-4 md:px-8">
      <DealModal 
        isOpen={!!selectedCoupon} 
        onClose={() => setSelectedCoupon(null)} 
        coupon={selectedCoupon} 
      />

      <div className="max-w-[1400px] mx-auto">
        <DealsHero onSearch={setSearchQuery} />

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
