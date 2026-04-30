"use client";

import { useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import HeroSection from '@/components/home/HeroSection';
import ScanResults from '@/components/home/ScanResults';
import TrendingSection from '@/components/home/TrendingSection';
import BarcodeScanner from '@/components/scanner/BarcodeScanner';
import DealModal from '@/components/deals/DealModal';
import { useSearchByBarcodeMutation, useGetCouponsQuery } from '@/redux/api/couponApi';

export default function HomeView() {
    const [isScanning, setIsScanning] = useState(false);
    const [activeCategory, setActiveCategory] = useState('all');
    const [selectedCoupon, setSelectedCoupon] = useState<any>(null);

    const [searchBarcode, { data: searchResults, isLoading: isSearchLoading }] = useSearchByBarcodeMutation();

    const { data: trendingDeals, isLoading: isTrendingLoading } = useGetCouponsQuery({
        sort: 'popularity',
        category: activeCategory !== 'all' ? activeCategory : undefined
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

            <section id="content" className="max-w-6xl mx-auto px-4 space-y-20 pt-10">
                <ScanResults
                    isLoading={isSearchLoading}
                    results={searchResults}
                    onOpenDeal={setSelectedCoupon}
                />

                <TrendingSection
                    activeCategory={activeCategory}
                    onCategoryChange={setActiveCategory}
                    isLoading={isTrendingLoading}
                    deals={trendingDeals}
                    onOpenDeal={setSelectedCoupon}
                />
            </section>
        </>
    );
}
