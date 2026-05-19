"use client";

import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useSearchParams, usePathname } from 'next/navigation';
import { AppDispatch, RootState } from '@/redux/store';
import { fetchCoupons } from '@/redux/slices/couponSlice';
import CouponsHero from './CouponsHero';
import CouponsSidebar from './CouponsSidebar';
import CouponsGrid from './CouponsGrid';
import DealModal from '@/components/deals/DealModal';

export default function CouponsPage() {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const categoryParam = searchParams.get('category');
  const qParam = searchParams.get('q');

  const [activeCategory, setActiveCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState(qParam || '');
  const [verifiedOnly, setVerifiedOnly] = useState(false);
  const [selectedCoupon, setSelectedCoupon] = useState<any>(null);

  const dispatch = useDispatch<AppDispatch>();
  const { coupons: allCoupons, loading: isLoading } = useSelector((state: RootState) => state.coupons);

  const isCouponsPage = pathname.includes('/coupons');
  const isDealsPage = pathname.includes('/deals') || pathname.includes('/hot-deals');

  const heroTag = isCouponsPage 
    ? "Exclusive Promo Codes & Coupons" 
    : isDealsPage 
      ? "Top Deals & Clearance Sales" 
      : "Latest Offers & Deals";

  const heroTitle = isCouponsPage
    ? "Verified Coupon Codes"
    : isDealsPage
      ? "Premium Shop Deals"
      : "Discover Super Savings";

  const heroDescription = isCouponsPage
    ? "Copy and paste verified promotional codes at checkout to save instantly on your purchases."
    : isDealsPage
      ? "Direct discount links and promotional offers automatically applied at checkout."
      : "Access thousands of verified coupon codes and exclusive discounts from top retailers around the globe.";

  // Sync category query parameter from URL to component state
  useEffect(() => {
    if (categoryParam) {
      setActiveCategory(categoryParam.toLowerCase());
    } else {
      setActiveCategory('all');
    }
  }, [categoryParam]);

  // Sync search query parameter from URL to component state
  useEffect(() => {
    if (qParam) {
      setSearchQuery(qParam);
    } else if (qParam === null) {
      setSearchQuery('');
    }
  }, [qParam]);

  useEffect(() => {
    const typeParam = isCouponsPage ? 'coupon' : isDealsPage ? 'deal' : undefined;
    dispatch(fetchCoupons({
      category: activeCategory !== 'all' ? activeCategory : undefined,
      sort: 'recent',
      type: typeParam,
      limit: 100 // fetch a healthy pool of offers to display
    }));
  }, [dispatch, activeCategory, isCouponsPage, isDealsPage]);
  
  // Client-side filtering (handles local search bar and verified filter)
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
        <CouponsHero 
          onSearch={(q) => setSearchQuery(q)} 
          value={searchQuery}
          tag={heroTag}
          title={heroTitle}
          description={heroDescription}
        />

        {/* Mobile Horizontal Filter Slider */}
        <div className="lg:hidden mt-6 space-y-4">
          <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none scroll-smooth">
            {[
              { name: 'All Categories', slug: 'all' },
              { name: 'Fashion', slug: 'fashion' },
              { name: 'Electronics', slug: 'electronics' },
              { name: 'Home & Garden', slug: 'home-garden' },
              { name: 'Beauty', slug: 'beauty' },
              { name: 'Travel', slug: 'travel' }
            ].map((cat) => (
              <button
                key={cat.slug}
                onClick={() => setActiveCategory(cat.slug)}
                className={`shrink-0 px-5 py-2.5 rounded-full font-black text-[10px] uppercase tracking-wider transition-all border ${
                  activeCategory === cat.slug 
                    ? 'bg-[#FF9800] text-white border-transparent shadow-md' 
                    : 'bg-white text-slate-500 border-slate-100 hover:bg-slate-50'
                }`}
              >
                {cat.name === 'All Categories' ? 'All' : cat.name}
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
          {/* Left Sidebar */}
          <CouponsSidebar 
            activeCategory={activeCategory}
            onCategoryChange={setActiveCategory}
            verifiedOnly={verifiedOnly}
            onVerifiedToggle={() => setVerifiedOnly(!verifiedOnly)}
          />

          {/* Main Coupons List */}
          <div className="lg:col-span-9">
            <CouponsGrid 
              coupons={filteredCoupons} 
              isLoading={isLoading} 
              onOpenDeal={setSelectedCoupon}
              itemType={isCouponsPage ? 'coupons' : 'deals'}
            />
            
            {/* Load More Mockup */}
            <div className="mt-16 flex flex-col items-center gap-4">
              <button className="px-12 py-5 bg-white border border-slate-200 rounded-full font-black text-[12px] uppercase tracking-widest hover:border-[#FF9800] hover:text-[#FF9800] transition-all shadow-sm">
                Load More Items
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
