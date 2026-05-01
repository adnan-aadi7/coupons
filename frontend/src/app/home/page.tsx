"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { AnimatePresence } from 'framer-motion';
import { useSearchByBarcodeMutation, useGetCouponsQuery } from '@/redux/api/couponApi';
import HeroSection from '@/components/home/HeroSection';
import BrandGrid from '@/components/home/BrandGrid';
import ScanResults from '@/components/home/ScanResults';
import BarcodeScanner from '@/components/scanner/BarcodeScanner';
import DealModal from '@/components/deals/DealModal';
import CategoryExplorer from '@/components/home/CategoryExplorer';
import HotDeals from '@/components/home/HotDeals';
import TopCoupons from '@/components/home/TopCoupons';
import FAQSection from '@/components/home/FAQSection';

export default function HomePage() {
  const [isScanning, setIsScanning] = useState(false);
  const [activeCategory, setActiveCategory] = useState('all');
  const [selectedCoupon, setSelectedCoupon] = useState<any>(null);
  const router = useRouter();

  const [searchBarcode, { data: searchResults, isLoading: isSearchLoading }] =
    useSearchByBarcodeMutation();

  const { data: trendingDeals, isLoading: isTrendingLoading } = useGetCouponsQuery({
    sort: 'popularity',
    category: activeCategory !== 'all' ? activeCategory : undefined,
  });

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

      <HeroSection onOpenScanner={() => setIsScanning(true)} />

      <div id="content" className="">
        <BrandGrid />
        <CategoryExplorer />
        <HotDeals />
        <TopCoupons
          activeCategory={activeCategory}
          onCategoryChange={setActiveCategory}
          isLoading={isTrendingLoading}
          deals={trendingDeals}
          onOpenDeal={setSelectedCoupon}
        />
        <ScanResults
          isLoading={isSearchLoading}
          results={searchResults}
          onOpenDeal={setSelectedCoupon}
        />
        <FAQSection />
      </div>
    </div>
  );
}
