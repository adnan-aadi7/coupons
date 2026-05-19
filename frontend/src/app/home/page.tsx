"use client";

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { AnimatePresence } from 'framer-motion';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '@/redux/store';
import { fetchCoupons } from '@/redux/slices/couponSlice';
import HeroSection from '@/components/home/HeroSection';
import BrandGrid from '@/components/home/BrandGrid';
import BarcodeScanner from '@/components/scanner/BarcodeScanner';
import DealModal from '@/components/deals/DealModal';
import CategoryExplorer from '@/components/home/CategoryExplorer';
import HotDeals from '@/components/home/HotDeals';
import TopCoupons from '@/components/home/TopCoupons';
import HowItWorksSection from '@/components/home/HowItWorksSection';

export default function HomePage() {
  const [isScanning, setIsScanning] = useState(false);
  const [activeCategory, setActiveCategory] = useState('all');
  const [selectedCoupon, setSelectedCoupon] = useState<any>(null);
  const router = useRouter();
  
  const dispatch = useDispatch<AppDispatch>();
  const { coupons: trendingDeals, loading: isTrendingLoading } = useSelector((state: RootState) => state.coupons);

  useEffect(() => {
    dispatch(fetchCoupons({
      sort: 'popularity',
      category: activeCategory !== 'all' ? activeCategory : undefined,
    }));
  }, [dispatch, activeCategory]);

  const handleScanSuccess = async (barcode: string) => {
    setIsScanning(false);
    router.push(`/scan-result/${encodeURIComponent(barcode)}`);
  };

  return (
    <div className="bg-background min-h-screen">
      <AnimatePresence>
        {isScanning && (
          <BarcodeScanner
            onScanSuccess={handleScanSuccess}
            onClose={() => setIsScanning(false)}
          />
        )}
      </AnimatePresence>

      <DealModal
        isOpen={!!selectedCoupon}
        onClose={() => setSelectedCoupon(null)}
        coupon={selectedCoupon}
      />

      {/* Dynamic Hero Section with right slider deals and interactive claim action */}
      <HeroSection 
        onOpenScanner={() => setIsScanning(true)} 
        deals={trendingDeals}
        onOpenDeal={setSelectedCoupon}
      />

      <div id="content">
        <BrandGrid />
        <CategoryExplorer />
        
        {/* Dynamic Hot Deals Spotlight with Mongoose models mapping */}
        <HotDeals 
          deals={trendingDeals} 
          isLoading={isTrendingLoading} 
          onOpenDeal={setSelectedCoupon}
        />
        
        <TopCoupons
          activeCategory={activeCategory}
          onCategoryChange={setActiveCategory}
          isLoading={isTrendingLoading}
          deals={trendingDeals}
          onOpenDeal={setSelectedCoupon}
        />
        
        <HowItWorksSection />
      </div>
    </div>
  );
}
