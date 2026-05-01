"use client";

import { useState } from 'react';
import { useGetCouponsQuery } from '@/redux/api/couponApi';
import CouponsHero from '@/components/coupons/CouponsHero';
import CouponsSidebar from '@/components/coupons/CouponsSidebar';
import CouponsGrid from '@/components/coupons/CouponsGrid';
import DealModal from '@/components/deals/DealModal';

export default function CouponsPage() {
  const [activeCategory, setActiveCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [verifiedOnly, setVerifiedOnly] = useState(false);
  const [selectedCoupon, setSelectedCoupon] = useState<any>(null);

  const { data: couponsData, isLoading } = useGetCouponsQuery({
    category: activeCategory !== 'all' ? activeCategory : undefined,
    sort: 'recent'
  });

  const allCoupons = (couponsData as any)?.data || [];
  
  // Client-side filtering
  const filteredCoupons = allCoupons.filter((c: any) => {
    const matchesSearch = !searchQuery || 
                         c.title?.toLowerCase().includes(searchQuery.toLowerCase()) || 
                         c.store?.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesVerified = !verifiedOnly || c.verifiedAt;
    
    return matchesSearch && matchesVerified;
  });

  return (
    <div className="bg-[#F8F9FA] min-h-screen pt-32 pb-24">
      <DealModal 
        isOpen={!!selectedCoupon} 
        onClose={() => setSelectedCoupon(null)} 
        coupon={selectedCoupon} 
      />

      <div className="max-w-[1400px] mx-auto px-4 md:px-8">
        <CouponsHero onSearch={(q) => setSearchQuery(q)} />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 mt-12">
          {/* Left Sidebar - Sticky */}
          <div className="lg:col-span-3">
            <div className="sticky top-32">
              <CouponsSidebar 
                activeCategory={activeCategory}
                onCategoryChange={setActiveCategory}
                verifiedOnly={verifiedOnly}
                onVerifiedToggle={() => setVerifiedOnly(!verifiedOnly)}
              />
            </div>
          </div>

          {/* Main Coupons List */}
          <div className="lg:col-span-9">
            <CouponsGrid 
              coupons={filteredCoupons} 
              isLoading={isLoading} 
              onOpenDeal={setSelectedCoupon}
            />
            
            {/* Load More Mockup */}
            <div className="mt-16 flex flex-col items-center gap-4">
              <button className="px-12 py-5 bg-white border border-slate-200 rounded-full font-black text-[12px] uppercase tracking-widest hover:border-[#FF9800] hover:text-[#FF9800] transition-all shadow-sm">
                Load More Coupons
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
