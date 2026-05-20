"use client";

import { motion, AnimatePresence } from 'framer-motion';
import { Scan, Tag, ArrowRight } from 'lucide-react';
import GlobalSearchBar from '../common/GlobalSearchBar';
import { useState, useEffect } from 'react';

interface HeroSectionProps {
  onOpenScanner: () => void;
  deals?: any[];
  onOpenDeal?: (deal: any) => void;
}

// Fallback high-fidelity curated deals if API hasn't loaded yet
const fallbackDeals = [
  {
    _id: 'fallback-1',
    storeName: 'Nike',
    discount: 'Up to 50% OFF',
    title: 'Running Shoes & Apparel',
    image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=1000&q=80',
    category: 'fashion'
  },
  {
    _id: 'fallback-2',
    storeName: 'Apple',
    discount: '$200 Cash Back',
    title: 'MacBook Pro & iPad Air',
    image: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=1000&q=80',
    category: 'tech'
  },
  {
    _id: 'fallback-3',
    storeName: 'Expedia',
    discount: 'Extra 20% OFF',
    title: 'Luxury Resorts & Flights',
    image: 'https://images.unsplash.com/photo-1436491865332-7a61a109cc05?auto=format&fit=crop&w=1000&q=80',
    category: 'travel'
  }
];

/**
 * Helper to dynamically resolve high-fidelity Unsplash images based on
 * the store's name, product description/title, or category.
 */
function getDynamicProductImage(storeName: string = '', title: string = '', category: string = ''): string {
  const combinedText = `${storeName} ${title} ${category}`.toLowerCase();

  // 1. Tech, Electronics & Gadgets
  if (combinedText.includes('macbook') || combinedText.includes('laptop') || combinedText.includes('computer')) {
    return 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=1000&q=80'; // MacBook Pro
  }
  if (combinedText.includes('iphone') || combinedText.includes('phone') || combinedText.includes('samsung') || combinedText.includes('galaxy') || combinedText.includes('mobile') || combinedText.includes('smartphone')) {
    return 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&w=1000&q=80'; // Smartphone
  }
  if (combinedText.includes('headphone') || combinedText.includes('earphone') || combinedText.includes('airpods') || combinedText.includes('audio') || combinedText.includes('speaker')) {
    return 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=1000&q=80'; // Headphones
  }
  if (combinedText.includes('watch') || combinedText.includes('smartwatch') || combinedText.includes('apple watch') || combinedText.includes('rolex')) {
    return 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=1000&q=80'; // Smartwatch/Watch
  }
  if (combinedText.includes('camera') || combinedText.includes('lens') || combinedText.includes('canon') || combinedText.includes('sony')) {
    return 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?auto=format&fit=crop&w=1000&q=80'; // Camera
  }
  if (combinedText.includes('tv') || combinedText.includes('television') || combinedText.includes('monitor') || combinedText.includes('screen') || combinedText.includes('display')) {
    return 'https://images.unsplash.com/photo-1593305841991-05c297ba4575?auto=format&fit=crop&w=1000&q=80'; // TV Screen
  }

  // 2. Fashion, Shoes & Apparel
  if (combinedText.includes('shoe') || combinedText.includes('nike') || combinedText.includes('sneaker') || combinedText.includes('adidas') || combinedText.includes('running') || combinedText.includes('footwear')) {
    return 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=1000&q=80'; // Nike Running Shoe
  }
  if (combinedText.includes('apparel') || combinedText.includes('clothing') || combinedText.includes('jacket') || combinedText.includes('hoodie') || combinedText.includes('coat') || combinedText.includes('sweater')) {
    return 'https://images.unsplash.com/photo-1556821840-3a63f95609a7?auto=format&fit=crop&w=1000&q=80'; // Jacket/Sweater
  }
  if (combinedText.includes('dress') || combinedText.includes('skirt') || combinedText.includes('zara') || combinedText.includes('fashion') || combinedText.includes('h&m') || combinedText.includes('jeans') || combinedText.includes('denim')) {
    return 'https://images.unsplash.com/photo-1539109136881-3be0616acf4b?auto=format&fit=crop&w=1000&q=80'; // Model Fashion
  }
  if (combinedText.includes('bag') || combinedText.includes('handbag') || combinedText.includes('backpack') || combinedText.includes('purse') || combinedText.includes('luggage')) {
    return 'https://images.unsplash.com/photo-1584917865442-de89df76afd3?auto=format&fit=crop&w=1000&q=80'; // Handbag
  }
  if (combinedText.includes('glasses') || combinedText.includes('sunglasses') || combinedText.includes('eyewear')) {
    return 'https://images.unsplash.com/photo-1572635196237-14b3f281503f?auto=format&fit=crop&w=1000&q=80'; // Sunglasses
  }

  // 3. Beauty, Cosmetics & Personal Care
  if (combinedText.includes('beauty') || combinedText.includes('cosmetic') || combinedText.includes('makeup') || combinedText.includes('lipstick') || combinedText.includes('sephora')) {
    return 'https://images.unsplash.com/photo-1556228578-0d85b1a4d571?auto=format&fit=crop&w=1000&q=80'; // Makeup
  }
  if (combinedText.includes('skin') || combinedText.includes('serum') || combinedText.includes('cream') || combinedText.includes('lotion') || combinedText.includes('care') || combinedText.includes('body')) {
    return 'https://images.unsplash.com/photo-1608248597279-f99d160bfcbc?auto=format&fit=crop&w=1000&q=80'; // Skincare serum
  }
  if (combinedText.includes('perfume') || combinedText.includes('fragrance') || combinedText.includes('scent') || combinedText.includes('cologne')) {
    return 'https://images.unsplash.com/photo-1541643600914-78b084683601?auto=format&fit=crop&w=1000&q=80'; // Perfume
  }

  // 4. Travel, Hotels & Resorts
  if (combinedText.includes('travel') || combinedText.includes('booking') || combinedText.includes('hotel') || combinedText.includes('resort') || combinedText.includes('stay') || combinedText.includes('vacation') || combinedText.includes('beach') || combinedText.includes('trip')) {
    return 'https://images.unsplash.com/photo-1506929562872-bb421503ef21?auto=format&fit=crop&w=1000&q=80'; // Beach Island Resort
  }
  if (combinedText.includes('flight') || combinedText.includes('airline') || combinedText.includes('airplane') || combinedText.includes('ticket') || combinedText.includes('aviation')) {
    return 'https://images.unsplash.com/photo-1436491865332-7a61a109cc05?auto=format&fit=crop&w=1000&q=80'; // Airplane
  }

  // 5. Food, Dining & Cafes
  if (combinedText.includes('pizza') || combinedText.includes('italian')) {
    return 'https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=1000&q=80'; // Pizza
  }
  if (combinedText.includes('burger') || combinedText.includes('mcdonald') || combinedText.includes('restaurant') || combinedText.includes('dining') || combinedText.includes('food') || combinedText.includes('meal')) {
    return 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=1000&q=80'; // Burger
  }
  if (combinedText.includes('coffee') || combinedText.includes('cafe') || combinedText.includes('starbucks') || combinedText.includes('tea') || combinedText.includes('beverage')) {
    return 'https://images.unsplash.com/photo-1509042239860-f550ce710b93?auto=format&fit=crop&w=1000&q=80'; // Coffee
  }

  // 6. Home, Sanctuary & Furniture
  if (combinedText.includes('home') || combinedText.includes('living') || combinedText.includes('furniture') || combinedText.includes('sofa') || combinedText.includes('chair') || combinedText.includes('bed') || combinedText.includes('pillow')) {
    return 'https://images.unsplash.com/photo-1484154218962-a197022b5858?auto=format&fit=crop&w=1000&q=80'; // Living Room Setup
  }
  if (combinedText.includes('kitchen') || combinedText.includes('cook') || combinedText.includes('oven') || combinedText.includes('appliance')) {
    return 'https://images.unsplash.com/photo-1556911220-e15b29be8c8f?auto=format&fit=crop&w=1000&q=80'; // Modern Kitchen
  }

  // 7. Fitness, Sports & Gym
  if (combinedText.includes('fitness') || combinedText.includes('gym') || combinedText.includes('workout') || combinedText.includes('protein') || combinedText.includes('health') || combinedText.includes('exercise')) {
    return 'https://images.unsplash.com/photo-1517838277536-f5f99be501cd?auto=format&fit=crop&w=1000&q=80'; // Gym workout dumbbells
  }

  // Category fallback mappings if specific product keywords weren't found
  const cat = category.toLowerCase();
  if (cat.includes('tech') || cat.includes('electronic')) {
    return 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1000&q=80';
  }
  if (cat.includes('travel') || cat.includes('holiday')) {
    return 'https://images.unsplash.com/photo-1436491865332-7a61a109cc05?auto=format&fit=crop&w=1000&q=80';
  }
  if (cat.includes('beauty') || cat.includes('care')) {
    return 'https://images.unsplash.com/photo-1556228578-0d85b1a4d571?auto=format&fit=crop&w=1000&q=80';
  }
  if (cat.includes('dining') || cat.includes('food') || cat.includes('restaurant')) {
    return 'https://images.unsplash.com/photo-1514326640560-7d063ef2aed5?auto=format&fit=crop&w=1000&q=80';
  }
  if (cat.includes('fashion') || cat.includes('cloth') || cat.includes('apparel') || cat.includes('wear')) {
    return 'https://images.unsplash.com/photo-1539109136881-3be0616acf4b?auto=format&fit=crop&w=1000&q=80';
  }

  // Elegant default abstract shopping/sale theme
  return 'https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?auto=format&fit=crop&w=1000&q=80';
}

export default function HeroSection({ onOpenScanner, deals = [], onOpenDeal }: HeroSectionProps) {
  const [currentIndex, setCurrentIndex] = useState(0);

  // Dynamic slides combining synced deals and fallbacks
  const dynamicDeals = deals.length > 0 
    ? deals.slice(0, 4).map((d, index) => {
        const cat = d.category?.toLowerCase() || '';
        const storeName = d.store || d.storeName || '';
        const title = d.title || '';
        const bgImg = getDynamicProductImage(storeName, title, cat);

        // Standardize the discount text dynamically
        const discountText = d.discountValue 
          ? `${d.discountType === 'percentage' ? '' : '$'}${d.discountValue}${d.discountType === 'percentage' ? '% OFF' : ' OFF'}` 
          : (d.discount || 'Special Offer');

        return {
          _id: d._id,
          storeName: storeName,
          discount: discountText,
          title: title || 'Exclusive Promo Offer',
          image: bgImg,
          rawDeal: d
        };
      })
    : fallbackDeals;

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
          <AnimatePresence mode="popLayout">
            {dynamicDeals.map((deal, index) => {
              if (index !== currentIndex) return null;
              return (
                <motion.div
                  key={deal._id}
                  initial={{ opacity: 0, x: 60, scale: 0.95 }}
                  animate={{ opacity: 1, x: 0, scale: 1 }}
                  exit={{ opacity: 0, x: -60, scale: 0.95 }}
                  transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                  className="absolute inset-0 rounded-[40px] shadow-[0_20px_50px_-12px_rgba(0,0,0,0.3)] p-6 md:p-8 flex flex-col justify-end overflow-hidden bg-slate-900 group"
                >
                  {/* Background Image Layer */}
                  <div
                    className="absolute inset-0 bg-cover bg-center transition-transform duration-[10s] group-hover:scale-105"
                    style={{ backgroundImage: `url('${deal.image}')` }}
                  />
                  {/* Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent pointer-events-none" />

                  {/* Dynamic Tag */}
                  <div className="absolute top-8 left-8 bg-black/30 backdrop-blur-md px-4 py-1.5 rounded-full border border-white/20 flex items-center gap-2 shadow-lg">
                    <span className="w-2 h-2 rounded-full bg-white animate-[pulse_2s_ease-in-out_infinite]" />
                    <span className="text-white text-xs font-bold uppercase tracking-widest font-['Manrope']">
                      {deals.length > 0 ? 'DYNAMIC VERIFIED' : 'FEATURED EXCLUSIVE'}
                    </span>
                  </div>

                  {/* Content */}
                  <div className="relative z-10">
                    <div className="text-white/80 font-bold text-sm mb-1 uppercase tracking-widest font-['Manrope'] drop-shadow-md">
                      {deal.storeName}
                    </div>
                    <div className="text-white font-black text-3xl md:text-5xl mb-2 leading-tight tracking-tight font-['Manrope'] drop-shadow-lg line-clamp-1">
                      {deal.discount}
                    </div>
                    <div className="text-white/90 text-sm md:text-lg mb-6 font-medium font-['Manrope'] drop-shadow-md line-clamp-1">
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
                            storeLogo: deal.image
                          });
                        }
                      }}
                      className="flex items-center gap-2 text-[#1A1C1C] font-bold bg-white/90 backdrop-blur-md hover:bg-white hover:scale-105 active:scale-95 transition-all px-6 py-3 rounded-full w-max shadow-xl font-['Manrope'] cursor-pointer"
                    >
                      Claim Reward <ArrowRight className="w-4 h-4 text-[#FF9800]" />
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
        </div>

      </div>
    </section>
  );
}
