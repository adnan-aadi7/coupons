"use client";

import { useGetCouponsQuery } from '@/redux/api/couponApi';
import { useParams } from 'next/navigation';
import CouponCard from '@/components/deals/CouponCard';
import SectionHeader from '@/components/ui/SectionHeader';
import SkeletonCard from '@/components/ui/SkeletonCard';
import { Tag, ShieldCheck, TrendingUp, Info } from 'lucide-react';
import { useState } from 'react';
import DealModal from '@/components/deals/DealModal';
import CashbackOverlay from '@/components/deals/CashbackOverlay';

export default function StorePage() {
  const { slug } = useParams();
  const storeName = typeof slug === 'string' ? slug.replace(/-/g, ' ') : '';
  const [selectedCoupon, setSelectedCoupon] = useState<any>(null);
  const [isCashbackActive, setIsCashbackActive] = useState(false);

  const { data: storeDeals, isLoading } = useGetCouponsQuery({
    store: storeName,
    sort: 'popularity'
  });

  const coupons = (storeDeals as any)?.data || [];
  const activeCount = coupons.length;
  const logoUrl = `https://logo.clearbit.com/${storeName.toLowerCase().replace(/\s+/g, '')}.com`;

  return (
    <div className="bg-background min-h-screen">
      <DealModal
        isOpen={!!selectedCoupon}
        onClose={() => setSelectedCoupon(null)}
        coupon={selectedCoupon}
      />

      <CashbackOverlay
        isOpen={isCashbackActive}
        onClose={() => setIsCashbackActive(false)}
        storeName={storeName}
        logoUrl={logoUrl}
        cashbackRate="15%"
      />

      <div className="max-w-7xl mx-auto px-4 md:px-6 pt-10 pb-24">
        <div className="flex flex-col lg:flex-row gap-12">
          
          {/* Sidebar */}
          <aside className="lg:w-80 shrink-0">
            <div className="sticky top-32 space-y-8">
              
              {/* Breadcrumbs */}
              <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-white/20 px-2">
                <Link href="/" className="hover:text-primary transition-colors">Home</Link>
                <span>/</span>
                <Link href="/categories" className="hover:text-primary transition-colors">Retailers</Link>
                <span>/</span>
                <span className="text-white/40">{storeName}</span>
              </div>

              {/* Store Identity */}
              <div className="bg-white/5 border border-white/5 rounded-[32px] p-8 text-center relative overflow-hidden group">
                <div className="absolute top-0 right-0 w-24 h-24 bg-primary/5 rounded-full blur-2xl -translate-y-1/2 translate-x-1/2 group-hover:bg-primary/10 transition-colors" />
                
                <div className="w-28 h-28 mx-auto bg-background rounded-[24px] p-5 border border-white/5 shadow-2xl shadow-primary/5 mb-6 flex items-center justify-center relative z-10 transition-transform group-hover:scale-105 duration-500">
                  <img src={logoUrl} alt={storeName} className="max-w-full max-h-full object-contain" />
                </div>
                
                <h1 className="text-3xl font-black capitalize mb-3 text-foreground tracking-tight">{storeName} Coupons</h1>
                
                <div className="flex flex-col gap-2">
                  <div className="flex items-center justify-center gap-2 text-primary font-black text-[10px] uppercase tracking-widest bg-primary/10 py-2.5 rounded-2xl border border-primary/20">
                    <ShieldCheck className="w-3.5 h-3.5" />
                    Verified Store
                  </div>
                  <div className="text-[10px] font-black text-white/20 uppercase tracking-widest">
                    Last updated {new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                  </div>
                </div>
              </div>

              {/* Cashback Highlight (NEW) */}
              <div className="bg-emerald-500 rounded-[32px] p-6 text-obsidian shadow-xl shadow-emerald-500/20 relative overflow-hidden">
                <div className="absolute -right-4 -bottom-4 w-24 h-24 bg-white/20 rounded-full blur-2xl" />
                <div className="relative z-10">
                  <div className="flex items-center gap-2 mb-2">
                    <Zap className="w-4 h-4 fill-obsidian" />
                    <span className="text-[10px] font-black uppercase tracking-widest">Rewards Program</span>
                  </div>
                  <div className="text-3xl font-black mb-1">Up to 15%</div>
                  <div className="text-xs font-bold opacity-80 mb-4">Cashback available today</div>
                  <button 
                    onClick={() => setIsCashbackActive(true)}
                    className="w-full py-3 bg-obsidian text-white rounded-2xl font-black text-[10px] uppercase tracking-widest hover:bg-obsidian/90 transition-all"
                  >
                    Activate Now
                  </button>
                </div>
              </div>

              {/* Stats Bar */}
              <div className="bg-white/5 border border-white/5 text-foreground rounded-[32px] p-7 space-y-5 shadow-xl shadow-primary/5">
                <div className="flex items-center justify-between border-b border-white/5 pb-4">
                  <div className="flex flex-col gap-1">
                    <span className="text-[9px] font-black uppercase tracking-widest text-white/30">Active Offers</span>
                    <span className="font-black text-xl text-primary">{activeCount}</span>
                  </div>
                  <div className="flex flex-col gap-1 text-right">
                    <span className="text-[9px] font-black uppercase tracking-widest text-white/30">Success Rate</span>
                    <span className="font-black text-xl text-primary">98%</span>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
                    <TrendingUp className="w-5 h-5 text-primary" />
                  </div>
                  <div className="flex flex-col">
                    <span className="text-[14px] font-black text-foreground">$1,240+</span>
                    <span className="text-[9px] font-black uppercase tracking-widest text-white/30">Saved this week</span>
                  </div>
                </div>
              </div>

              {/* About Section */}
              <div className="space-y-4 px-2">
                <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-white/30">
                  <span className="p-1.5 rounded-lg bg-white/5 border border-white/5">
                    <Info className="w-3.5 h-3.5" />
                  </span>
                  Shopping Guide
                </div>
                <p className="text-[12px] font-bold text-white/40 leading-relaxed">
                  Save instantly at {storeName} with {activeCount} verified coupons for {new Date().toLocaleString('default', { month: 'long' })}. Every code is hand-tested by the SmartSaver community to ensure you never miss a deal.
                </p>
              </div>

            </div>
          </aside>

          {/* Main Content */}
          <main className="flex-1 space-y-10">
            <div className="mb-2">
              <h2 className="text-[11px] font-black uppercase tracking-[0.3em] text-primary mb-2">Today's Top Offers</h2>
              <div className="h-1 w-20 bg-primary rounded-full mb-8" />
            </div>

            {isLoading ? (
              <div className="space-y-6">
                {[1, 2, 3].map((i) => (
                  <SkeletonCard key={i} />
                ))}
              </div>
            ) : coupons.length > 0 ? (
              <div className="space-y-6">
                {coupons.map((coupon: any, idx: number) => (
                  <CouponCard 
                    key={coupon._id} 
                    coupon={coupon} 
                    idx={idx} 
                    onOpenDeal={setSelectedCoupon}
                  />
                ))}
              </div>
            ) : (
              <div className="bg-white/5 border border-white/5 rounded-3xl p-20 text-center">
                <Tag className="w-12 h-12 text-white/10 mx-auto mb-4" />
                <h3 className="text-xl font-black text-foreground">No Active Coupons for {storeName}</h3>
                <p className="text-white/40 font-bold mt-2">Check back soon or browse our other trending deals.</p>
              </div>
            )}
          </main>

        </div>
      </div>
    </div>
  );
}
