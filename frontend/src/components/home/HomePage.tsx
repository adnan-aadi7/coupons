"use client";

import { useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import { useSearchByBarcodeMutation, useGetCouponsQuery } from '@/redux/api/couponApi';
import Navbar from '@/components/layout/Navbar';
import HeroSection from './HeroSection';
import BrandGrid from './BrandGrid';
import ScanResults from './ScanResults';
// import ScanResults from './ScanResults';
import BarcodeScanner from '@/components/scanner/BarcodeScanner';
import DealModal from '@/components/deals/DealModal';
import StatsSection from './StatsSection';
import CategoryExplorer from './CategoryExplorer';
import HotDeals from './HotDeals';
import TopCoupons from './TopCoupons';

/**
 * HomePage
 * --------
 * Owns all home-page state and wires sub-components:
 *   <HeroSection>       – hero title + scanner trigger
 *   <BrandGrid>         – top store logo grid (Coupons.com Style)
 *   <ScanResults>       – barcode search results
 *   <TrendingSection>   – category bar + deals grid
 */
export default function HomePage() {
  const [isScanning, setIsScanning] = useState(false);
  const [activeCategory, setActiveCategory] = useState('all');
  const [selectedCoupon, setSelectedCoupon] = useState<any>(null);

  const [searchBarcode, { data: searchResults, isLoading: isSearchLoading }] =
    useSearchByBarcodeMutation();

  const { data: trendingDeals, isLoading: isTrendingLoading } = useGetCouponsQuery({
    sort: 'popularity',
    category: activeCategory !== 'all' ? activeCategory : undefined,
  });

  const handleScanSuccess = async (barcode: string) => {
    setIsScanning(false);
    await searchBarcode(barcode);
    setTimeout(() => {
      document.getElementById('results')?.scrollIntoView({ behavior: 'smooth' });
    }, 100);
  };

  return (
    <>
      <div className="bg-background min-h-screen">
        {/* Overlays */}
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

        <div id="content" className="space-y-16 lg:space-y-24 pb-32">
          {/* We do not wrap full width modules in max-w-7xl here because CategoryExplorer manages its own width max constraint like BrandGrid. */}
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

          {/* <StatsSection /> */}
        </div>
      </div>

    </>
  );
}
