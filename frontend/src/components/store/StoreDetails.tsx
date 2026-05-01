"use client";

import { useGetCouponsQuery } from '@/redux/api/couponApi';
import { useParams } from 'next/navigation';
import { SlidersHorizontal } from 'lucide-react';
import { useState, useEffect } from 'react';
import DealModal from '@/components/deals/DealModal';
import CashbackOverlay from '@/components/deals/CashbackOverlay';
import StoreSidebar from './StoreSidebar';
import StoreDealCard from './StoreDealCard';

export default function StoreDetails() {
  const { slug } = useParams();
  const storeName = typeof slug === 'string' ? slug.replace(/-/g, ' ') : '';
  const [selectedCoupon, setSelectedCoupon] = useState<any>(null);
  const [isCashbackActive, setIsCashbackActive] = useState(false);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [activeSort, setActiveSort] = useState('Recommended');
  const [logoError, setLogoError] = useState(false);

  const { data: storeDeals, isLoading } = useGetCouponsQuery({
    store: storeName,
    sort: activeSort === 'Highest Discount' ? 'discount' : 'popularity'
  });

  const coupons = (storeDeals as any)?.data || [];
  
  const getBrandDomain = (name: string) => {
    const map: Record<string, string> = {
      'nike': 'nike.com', 'apple': 'apple.com', 'prada': 'prada.com', 
      'gucci': 'gucci.com', 'adidas': 'adidas.com'
    };
    const cleanName = name.toLowerCase().trim();
    return map[cleanName] || `${cleanName.replace(/\s+/g, '')}.com`;
  };

  const domain = getBrandDomain(storeName);
  const logoUrl = `https://logo.clearbit.com/${domain}`;
  const fallbackLogoUrl = `https://www.google.com/s2/favicons?domain=${domain}&sz=128`;

  const [currentLogo, setCurrentLogo] = useState(logoUrl);
  const [logoRetry, setLogoRetry] = useState(0);

  useEffect(() => {
    const d = getBrandDomain(storeName);
    setCurrentLogo(`https://logo.clearbit.com/${d}`);
    setLogoError(false);
    setLogoRetry(0);
  }, [storeName]);

  const handleLogoError = () => {
    if (logoRetry === 0) {
      setCurrentLogo(fallbackLogoUrl);
      setLogoRetry(1);
    } else {
      setLogoError(true);
    }
  };

  return (
    <div className="bg-[#FFFFFF] min-h-screen font-['Manrope'] pt-24 pb-24">
      <DealModal
        isOpen={!!selectedCoupon}
        onClose={() => setSelectedCoupon(null)}
        coupon={selectedCoupon}
      />

      <CashbackOverlay
        isOpen={isCashbackActive}
        onClose={() => setIsCashbackActive(false)}
        storeName={storeName}
        logoUrl={currentLogo}
        cashbackRate="12.5%"
      />

      <div className="max-w-[1300px] mx-auto px-6 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
          
          <StoreSidebar 
            storeName={storeName}
            logoUrl={currentLogo}
            logoError={logoError}
            onLogoError={handleLogoError}
            onActivateCashback={() => setIsCashbackActive(true)}
          />

          <main className="lg:col-span-9">
            <div className="flex items-center justify-between mb-12 pb-6 border-b border-slate-100 relative">
              <h2 className="text-2xl font-black text-[#1A1C1C]">Exclusive Coupons & Deals</h2>
              <button onClick={() => setIsFilterOpen(!isFilterOpen)} className="flex items-center gap-2 font-black text-[14px] text-[#8B5000]">
                Refine Results <SlidersHorizontal className="w-4 h-4" />
              </button>
            </div>

            <div className="space-y-10">
              {isLoading ? (
                [1,2,3].map(i => <div key={i} className="h-64 bg-slate-50 rounded-[48px] animate-pulse" />)
              ) : coupons.map((coupon: any, idx: number) => (
                <StoreDealCard 
                  key={coupon._id}
                  coupon={coupon}
                  idx={idx}
                  onOpenDeal={setSelectedCoupon}
                />
              ))}
            </div>

            {/* Bottom Tip */}
            <div className="mt-20 flex flex-col md:flex-row items-center gap-10 bg-[#F9F9F9] rounded-[48px] p-10">
              <div className="flex-1 space-y-4">
                <h4 className="text-xl font-black text-[#1A1C1C]">Wealth Tip</h4>
                <p className="text-slate-500 font-medium leading-relaxed">
                  Stack this store's cashback with your SmartSaver credit card to achieve up to 15.2% total returns on your purchase.
                </p>
              </div>
              <img 
                src="https://images.unsplash.com/photo-1589482238383-abb883556aa9?auto=format&fit=crop&w=200&q=80" 
                className="w-32 h-32 object-contain mix-blend-multiply" 
              />
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}
