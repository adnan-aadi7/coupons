"use client";

import { motion, AnimatePresence } from 'framer-motion';
import { Scan, Tag, ArrowRight } from 'lucide-react';
import GlobalSearchBar from '../common/GlobalSearchBar';
import { useState, useEffect } from 'react';
import { getProxyLogoUrl } from '@/utils/imageHelper';

interface HeroSectionProps {
  onOpenScanner: () => void;
  deals?: any[];
  onOpenDeal?: (deal: any) => void;
}

const premiumMeshGradients = [
  {
    bg: 'from-slate-950 via-[#1A1829] to-[#0D0B14]',
    glow1: 'bg-[#8B5CF6]/15', // Purple
    glow2: 'bg-[#FF3366]/10',  // Rose
    badge: 'bg-[#8B5CF6]/20 text-[#C084FC] border-[#8B5CF6]/30',
    badgeText: '🔥 TRENDING TODAY'
  },
  {
    bg: 'from-slate-950 via-[#0A1E29] to-[#051118]',
    glow1: 'bg-[#00D2FF]/15', // Neon Blue
    glow2: 'bg-[#00FF87]/10',  // Emerald Green
    badge: 'bg-[#00D2FF]/20 text-[#38BDF8] border-[#00D2FF]/30',
    badgeText: '⚡ HIGH-VALUE REWARD'
  },
  {
    bg: 'from-slate-950 via-[#2A1810] to-[#120A06]',
    glow1: 'bg-[#FF9800]/15', // Amber Orange
    glow2: 'bg-[#F43F5E]/10',  // Rose
    badge: 'bg-[#FF9800]/20 text-[#FDBA74] border-[#FF9800]/30',
    badgeText: '👑 EXCLUSIVE DEALS'
  },
  {
    bg: 'from-slate-950 via-[#1F112A] to-[#0E0614]',
    glow1: 'bg-[#EC4899]/15', // Pink
    glow2: 'bg-[#8B5CF6]/10',  // Purple
    badge: 'bg-[#EC4899]/20 text-[#F472B6] border-[#EC4899]/30',
    badgeText: '✨ DAILY SPECIAL OFFER'
  },
  {
    bg: 'from-slate-950 via-[#0B251B] to-[#04110C]',
    glow1: 'bg-[#10B981]/15', // Emerald
    glow2: 'bg-[#3B82F6]/10',  // Blue
    badge: 'bg-[#10B981]/20 text-[#34D399] border-[#10B981]/30',
    badgeText: '💸 CASHBACK CLIMB'
  },
  {
    bg: 'from-slate-950 via-[#2E101D] to-[#14060C]',
    glow1: 'bg-[#F43F5E]/15', // Rose
    glow2: 'bg-[#E11D48]/10',  // Crimson
    badge: 'bg-[#F43F5E]/20 text-[#FDA4AF] border-[#F43F5E]/30',
    badgeText: '🔥 HOTTEST DROP'
  }
];

export default function HeroSection({ onOpenScanner, deals = [], onOpenDeal }: HeroSectionProps) {
  const [currentIndex, setCurrentIndex] = useState(0);

  // Dynamic slides solely from DB deals, filtered by unique store and sorted by daily trending priority
  const dynamicDeals = (() => {
    if (!deals || deals.length === 0) return [];
    
    // 1. Sort by highest discount value first
    const sortedDeals = [...deals].sort((a, b) => {
      const valA = a.discountValue || 0;
      const valB = b.discountValue || 0;
      return valB - valA;
    });

    // 2. Keep only one best coupon per unique store
    const uniqueDealsMap = new Map();
    for (const deal of sortedDeals) {
      const storeKey = (deal.store || deal.storeName || '').toLowerCase().trim();
      if (storeKey && !uniqueDealsMap.has(storeKey)) {
        uniqueDealsMap.set(storeKey, deal);
      }
    }

    // 3. Return the top 6 unique stores' deals mapped into carousel slides
    return Array.from(uniqueDealsMap.values())
      .slice(0, 6)
      .map((d: any) => {
        const storeName = d.store || d.storeName || '';
        const title = d.title || '';
        const brandLogo = d.brandLogo;

        // Standardize the discount text dynamically
        const discountText = d.discountValue 
          ? `${d.discountType === 'percentage' ? '' : '$'}${d.discountValue}${d.discountType === 'percentage' ? '% OFF' : ' OFF'}` 
          : (d.discount || 'Special Offer');

        return {
          _id: d._id,
          storeName: storeName,
          discount: discountText,
          title: title || 'Exclusive Promo Offer',
          brandLogo: brandLogo,
          bannerImage: d.bannerImage,
          rawDeal: d
        };
      });
  })();

  useEffect(() => {
    if (dynamicDeals.length <= 1) return;
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % dynamicDeals.length);
    }, 4500);
    return () => clearInterval(timer);
  }, [dynamicDeals.length]);

  return (
    <section className="relative bg-transparent mt-20 lg:mt-21 overflow-visible flex items-center min-h-[500px] font-['Manrope'] ">
      <div className="max-w-[1280px] w-full mx-auto px-4 sm:px-8 relative flex flex-col lg:flex-row items-center justify-between gap-12 lg:gap-8 py-8 lg:py-0">

        {/* Left Side: Typography & Search */}
        <div className="flex flex-col items-center lg:items-start text-center lg:text-left gap-6 sm:gap-[31px] w-full max-w-[540px] shrink-0 z-20">

          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-orange-100/50 border border-orange-200 shadow-sm mb-1 sm:mb-2 mx-auto lg:mx-0">
            <Tag className="w-4 h-4 text-[#8B5000]" />
            <span className="text-xs font-bold text-[#8B5000] uppercase tracking-wider font-['Manrope']">New Deals Added Live</span>
          </div>

          {/* Heading */}
          <div className="flex flex-col items-center lg:items-start pb-[0.7px] w-full">
            <h1 className="font-['Manrope'] font-bold text-[32px] xs:text-[40px] sm:text-[48px] md:text-[56px] leading-[1.1] tracking-[-1.2px] text-[#1A1C1C] text-center lg:text-left">
              Shopping that <span className="text-[#FF9800] font-semibold drop-shadow-sm">grows</span><br />
              your wealth.
            </h1>
          </div>

          {/* Subtitle */}
          <div className="w-full">
            <p className="font-['Manrope'] font-normal text-sm xs:text-[18px] leading-relaxed xs:leading-[29px] text-[#554434] text-center lg:text-left">
              Experience the evolution of cashback. Join 2.5 million users earning premium rewards on luxury fashion, tech, and travel.
            </p>
          </div>

          {/* Search & Scan Widget */}
          <div className="flex flex-col sm:flex-row items-center p-2 sm:p-[16px] gap-3 sm:gap-[16px] w-full bg-white/80 border border-white/40 backdrop-blur-[10px] rounded-3xl sm:rounded-[48px] shadow-[0px_20px_25px_-5px_rgba(0,0,0,0.1),0px_8px_10px_-6px_rgba(0,0,0,0.1)] relative">

            {/* Live Global Search */}
            <div className="flex-1 w-full">
              <GlobalSearchBar
                placeholder="Search stores & deals..."
                inputClassName="!border-0 !shadow-none !rounded-full !py-2 bg-white/50"
              />
            </div>

            {/* Scan Button */}
            <button
              onClick={onOpenScanner}
              className="w-full sm:w-[179px] h-[52.8px] bg-[#1A1C1C] rounded-full flex items-center justify-center relative hover:bg-black transition-all cursor-pointer shrink-0 shadow-lg shadow-black/20"
            >
              <div className="absolute left-[24px]">
                <Scan className="w-5 h-5 text-white" />
              </div>
              <span className="font-['Manrope'] font-semibold text-[14px] leading-[17px] tracking-[0.7px] text-white ml-[16px]">
                Scan Barcode
              </span>
            </button>
          </div>
        </div>

        {/* Right Side: Dynamic Deals Carousel */}
        <div className="relative w-full max-w-[600px] h-[380px] lg:h-[380px] z-10">
          {dynamicDeals.length === 0 ? (
            <div className="absolute inset-0 rounded-[40px] shadow-[0_30px_60px_-15px_rgba(15,23,42,0.3)] p-6 md:p-8 flex flex-col justify-end overflow-hidden bg-slate-950 border border-slate-800/50">
              {/* Premium Glowing Mesh Gradients */}
              <div className="absolute inset-0 bg-gradient-to-br from-slate-900/60 via-[#1E2338]/60 to-slate-950/60" />
              
              {/* Skeleton logo card */}
              <div className="absolute top-8 right-8 w-16 h-16 bg-slate-800/60 rounded-2xl animate-pulse" />
              
              {/* Skeleton verified savings badge */}
              <div className="absolute top-8 left-8 w-32 h-6 bg-slate-800/60 rounded-full animate-pulse" />

              {/* Skeleton Content */}
              <div className="space-y-4 relative z-10 w-[80%] text-left">
                <div className="h-3 bg-slate-800/60 rounded-full w-[35%] animate-pulse" />
                <div className="h-10 bg-slate-800/60 rounded-xl w-[90%] animate-pulse" />
                <div className="h-4 bg-slate-800/60 rounded-full w-[70%] animate-pulse" />
                <div className="h-10 bg-slate-800/60 rounded-full w-[45%] animate-pulse mt-6" />
              </div>
            </div>
          ) : (
            <>
              <AnimatePresence mode="popLayout">
                {dynamicDeals.map((deal, index) => {
                  if (index !== currentIndex) return null;
                  const grad = premiumMeshGradients[index % premiumMeshGradients.length];
                  return (
                    <motion.div
                      key={deal._id}
                      initial={{ opacity: 0, x: 60, scale: 0.95 }}
                      animate={{ opacity: 1, x: 0, scale: 1 }}
                      exit={{ opacity: 0, x: -60, scale: 0.95 }}
                      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                      className="absolute inset-0 rounded-[40px] shadow-[0_30px_70px_-15px_rgba(0,0,0,0.7)] p-6 md:p-8 flex flex-col justify-end overflow-hidden bg-slate-950/90 backdrop-blur-md border border-slate-800/80 group"
                    >
                       {/* Premium Glowing Mesh Gradients */}
                      <div className={`absolute inset-0 bg-gradient-to-br ${grad.bg} transition-all duration-500 group-hover:scale-[1.01]`} />
                      <div className={`absolute -top-24 -right-24 w-76 h-76 rounded-full ${grad.glow1} blur-[85px] group-hover:scale-125 transition-all duration-700`} />
                      <div className={`absolute -bottom-24 -left-24 w-76 h-76 rounded-full ${grad.glow2} blur-[85px]`} />

                      {/* Real Dynamic Admitad Creative Banner Image Background */}
                      {deal.bannerImage && (
                        <div className="absolute inset-0 w-full h-full overflow-hidden pointer-events-none z-10">
                          <img 
                            src={deal.bannerImage} 
                            alt={deal.storeName}
                            className="absolute inset-0 w-full h-full object-cover opacity-100 group-hover:scale-105 transition-all duration-700"
                          />
                          {/* Radial overlay to keep text highly legible */}
                          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/80 to-transparent" />
                        </div>
                      )}

                      {/* Real Synced Store Brand Logo Container */}
                      <div className="absolute top-8 right-8 w-16 h-16 bg-white rounded-2xl p-3 shadow-2xl shadow-black/40 flex items-center justify-center border border-slate-200 z-20 transition-all duration-500 group-hover:scale-110 group-hover:rotate-3 ring-4 ring-slate-900/40">
                        {deal.brandLogo ? (
                          <img 
                            src={getProxyLogoUrl(deal.brandLogo, (deal.storeName || 'brand').toLowerCase().replace(/[^a-z0-9]/g, ''))} 
                            alt={deal.storeName} 
                            className="max-w-full max-h-full object-contain mix-blend-multiply" 
                          />
                        ) : (
                          <Tag className="w-8 h-8 text-slate-300" />
                        )}
                      </div>

                      {/* Clean Premium Verified Badge */}
                      <div className={`absolute top-8 left-8 ${grad.badge} backdrop-blur-md px-4 py-1.5 rounded-full border flex items-center gap-2 shadow-lg z-20`}>
                        <span className="w-2 h-2 rounded-full bg-[#FF9800] animate-[pulse_2s_ease-in-out_infinite]" />
                        <span className="text-[10px] font-black uppercase tracking-[0.2em] font-['Outfit']">
                          {grad.badgeText}
                        </span>
                      </div>

                      {/* Content */}
                      <div className="relative z-20 text-left">
                        <div className="text-white/65 font-black text-[11px] mb-1.5 uppercase tracking-[0.25em] font-['Outfit']">
                          {deal.storeName}
                        </div>
                        <div className="text-white font-black text-3xl md:text-5xl mb-2.5 leading-tight tracking-tight font-['Outfit'] drop-shadow-[0_4px_12px_rgba(0,0,0,0.5)] line-clamp-1">
                          {deal.discount}
                        </div>
                        <div className="text-slate-400 text-sm md:text-base mb-6 font-medium leading-relaxed line-clamp-2 max-w-[90%]">
                          {deal.title}
                        </div>

                        <button 
                          onClick={() => {
                            if (onOpenDeal && 'rawDeal' in deal) {
                              onOpenDeal(deal.rawDeal);
                            } else if (onOpenDeal) {
                              // Trigger with custom structured payload for fallback items
                              onOpenDeal({
                                storeName: deal.storeName,
                                title: deal.title,
                                discount: deal.discount,
                                promoCode: 'NOT REQUIRED',
                                link: 'https://admitad.com',
                                storeLogo: deal.brandLogo
                              });
                            }
                          }}
                          className="flex items-center gap-2 text-white font-bold bg-gradient-to-r from-[#FF9800] to-orange-600 hover:scale-105 active:scale-95 transition-all px-8 py-4 rounded-full w-max shadow-lg shadow-orange-500/20 font-['Outfit'] cursor-pointer border-0 text-xs uppercase tracking-widest"
                        >
                          Claim Reward <ArrowRight className="w-4 h-4 text-white" />
                        </button>
                      </div>
                    </motion.div>
                  );
                })}
              </AnimatePresence>

              {/* Carousel Navigation Dots */}
              <div className="absolute -bottom-10 left-1/2 -translate-x-1/2 flex gap-3">
                {dynamicDeals.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => setCurrentIndex(idx)}
                    className={`h-2.5 rounded-full transition-all duration-300 ${idx === currentIndex ? 'bg-[#FF9800] w-8' : 'bg-slate-300 hover:bg-slate-400 w-2.5'
                      }`}
                    aria-label={`Go to slide ${idx + 1}`}
                  />
                ))}
              </div>
            </>
          )}
        </div>

      </div>
    </section>
  );
}
