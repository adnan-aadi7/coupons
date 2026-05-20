"use client";

import { useState, useEffect } from 'react';
import { SlidersHorizontal } from 'lucide-react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '@/redux/store';
import { getMe, toggleFavoriteStore } from '@/redux/slices/authSlice';
import DealModal from '@/components/deals/DealModal';
import CashbackOverlay from '@/components/deals/CashbackOverlay';
import StoreSidebar from '@/components/store/StoreSidebar';
import StoreDealCard from '@/components/store/StoreDealCard';

interface StorePageClientProps {
  store: any;
  coupons: any[];
  storeNameFallback: string;
}

export default function StorePageClient({ store, coupons, storeNameFallback }: StorePageClientProps) {
  const storeName = store ? store.name : storeNameFallback;
  const dispatch = useDispatch<AppDispatch>();
  const { user } = useSelector((state: RootState) => state.auth);
  
  const [selectedCoupon, setSelectedCoupon] = useState<any>(null);
  const [isCashbackActive, setIsCashbackActive] = useState(false);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [activeSort, setActiveSort] = useState('Recommended');
  const [logoError, setLogoError] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);
  const [visibleCount, setVisibleCount] = useState(4);

  useEffect(() => {
    if (user && store) {
      const favorited = user.favoriteStores?.some(
        (fav: any) => (fav._id || fav) === store._id
      );
      setIsFavorite(!!favorited);
    } else {
      setIsFavorite(false);
    }
  }, [user, store]);

  const handleToggleFavorite = async () => {
    if (!user) {
      alert("Please login to save favorite stores!");
      return;
    }
    if (store?._id) {
      await dispatch(toggleFavoriteStore(store._id));
      dispatch(getMe());
    }
  };

  // Sorting logic on the client side
  const sortedCoupons = [...coupons].sort((a, b) => {
    if (activeSort === 'Highest Discount') {
      return (b.discountValue || 0) - (a.discountValue || 0);
    }
    // For Popularity or Recommended, we can just use the default order from API
    return 0; 
  });

  const getBrandDomain = (name: string) => {
    const map: Record<string, string> = {
      'nike': 'nike.com', 'apple': 'apple.com', 'prada': 'prada.com', 
      'gucci': 'gucci.com', 'adidas': 'adidas.com'
    };
    const cleanName = name.toLowerCase().trim();
    return map[cleanName] || `${cleanName.replace(/\s+/g, '')}.com`;
  };

  const domain = getBrandDomain(storeName);
  const fallbackLogoUrl = `https://www.google.com/s2/favicons?domain=${domain}&sz=128`;

  const currentLogo = (() => {
    const { getProxyLogoUrl } = require('@/utils/imageHelper');
    return getProxyLogoUrl(store?.logoUrl, domain.replace('.com', ''));
  })();

  const handleLogoError = () => {
    setLogoError(true);
  };

  const cashbackText = store?.cashbackRate ? `${store.cashbackRate}%` : "12.5%";

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
        logoUrl={logoError ? fallbackLogoUrl : currentLogo}
        cashbackRate={cashbackText}
      />

      <div className="max-w-[1300px] mx-auto px-4 sm:px-6 py-6 sm:py-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16">
          
          <StoreSidebar 
            storeName={storeName}
            logoUrl={logoError ? fallbackLogoUrl : currentLogo}
            logoError={logoError}
            onLogoError={handleLogoError}
            onActivateCashback={() => setIsCashbackActive(true)}
            cashbackRate={cashbackText}
            isFavorite={isFavorite}
            onToggleFavorite={handleToggleFavorite}
          />

          <main className="lg:col-span-9">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8 sm:mb-12 pb-6 border-b border-slate-100 relative">
              <h2 className="text-xl sm:text-2xl font-black text-[#1A1C1C] text-center sm:text-left">Exclusive Coupons & Deals</h2>
              
              <div className="flex items-center justify-between sm:justify-end gap-4 w-full sm:w-auto">
                <select 
                  className="bg-slate-50 border-none outline-none font-bold text-xs sm:text-sm text-[#475569] p-2 rounded-lg cursor-pointer"
                  value={activeSort}
                  onChange={(e) => setActiveSort(e.target.value)}
                >
                  <option value="Recommended">Recommended</option>
                  <option value="Highest Discount">Highest Discount</option>
                </select>
                <button onClick={() => setIsFilterOpen(!isFilterOpen)} className="flex items-center gap-2 font-black text-xs sm:text-[14px] text-[#8B5000]">
                  Refine Results <SlidersHorizontal className="w-4 h-4" />
                </button>
              </div>
            </div>

            <div className="space-y-6 sm:space-y-10">
              {sortedCoupons.length === 0 ? (
                <div className="text-center py-10 text-slate-500 font-medium">
                  No active coupons found for this store right now.
                </div>
              ) : (
                <>
                  <div className="space-y-6 sm:space-y-10">
                    {sortedCoupons.slice(0, visibleCount).map((coupon: any, idx: number) => (
                      <StoreDealCard 
                        key={coupon._id}
                        coupon={coupon}
                        idx={idx}
                        onOpenDeal={setSelectedCoupon}
                      />
                    ))}
                  </div>

                  {visibleCount < sortedCoupons.length && (
                    <div className="flex justify-center pt-6">
                      <button
                        onClick={() => setVisibleCount(prev => prev + 4)}
                        className="group flex items-center gap-2 px-8 py-3.5 bg-[#FF9800] hover:bg-[#F57C00] text-white font-black text-xs sm:text-sm rounded-2xl shadow-lg hover:shadow-orange-200 transition-all duration-300 hover:-translate-y-0.5 active:scale-95 cursor-pointer"
                      >
                        View More Coupons
                        <span className="w-5 h-5 rounded-full bg-white/20 flex items-center justify-center text-[10px] group-hover:bg-white/30 transition-colors">
                          +{sortedCoupons.length - visibleCount}
                        </span>
                      </button>
                    </div>
                  )}
                </>
              )}
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
                alt="Wealth Tip"
                className="w-32 h-32 object-contain mix-blend-multiply" 
              />
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}
