"use client";

import { motion, AnimatePresence } from 'framer-motion';
import { Scan, Tag, ArrowRight } from 'lucide-react';
import { useState, useEffect } from 'react';

interface HeroSectionProps {
  onOpenScanner: () => void;
}

const carouselDeals = [
  {
    id: 1,
    store: 'Nike',
    discount: 'Up to 50% OFF',
    title: 'Running Shoes & Apparel',
    image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=1000&q=80',
    tag: 'Trending'
  },
  {
    id: 2,
    store: 'Apple',
    discount: '$200 Cash Back',
    title: 'MacBook Pro & iPad Air',
    image: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=1000&q=80',
    tag: 'Exclusive'
  },
  {
    id: 3,
    store: 'Expedia',
    discount: 'Extra 20% OFF',
    title: 'Luxury Resorts & Flights',
    image: 'https://images.unsplash.com/photo-1436491865332-7a61a109cc05?auto=format&fit=crop&w=1000&q=80',
    tag: 'Limited Time'
  }
];

export default function HeroSection({ onOpenScanner }: HeroSectionProps) {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % carouselDeals.length);
    }, 4500);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="relative bg-transparent mt-20 lg:mt-21 overflow-hidden flex items-center min-h-[500px] font-['Manrope'] ">
      <div className="max-w-[1280px] w-full mx-auto px-8 relative flex flex-col lg:flex-row items-center justify-between gap-16 lg:gap-8 py-12 lg:py-0">

        {/* Left Side: Typography & Search */}
        <div className="flex flex-col items-start gap-[31px] w-full max-w-[540px] shrink-0 z-20">

          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-orange-100/50 border border-orange-200 shadow-sm mb-2">
            <Tag className="w-4 h-4 text-[#8B5000]" />
            <span className="text-xs font-bold text-[#8B5000] uppercase tracking-wider font-['Manrope']">New Deals Added Live</span>
          </div>

          {/* Heading */}
          <div className="flex flex-col items-start pb-[0.7px]">
            <h1 className="font-['Manrope'] font-bold text-[48px] md:text-[56px] leading-[1.1] tracking-[-1.2px] text-[#1A1C1C]">
              Shopping that <span className="text-[#FF9800] font-semibold drop-shadow-sm">grows</span><br />
              your wealth.
            </h1>
          </div>

          {/* Subtitle */}
          <div className="w-full">
            <p className="font-['Manrope'] font-normal text-[18px] leading-[29px] text-[#554434]">
              Experience the evolution of cashback. Join 2.5 million users earning premium rewards on luxury fashion, tech, and travel.
            </p>
          </div>

          {/* Search & Scan Widget */}
          <div className="flex flex-col sm:flex-row items-center p-3 sm:p-[16px] gap-[16px] w-full bg-white/80 border border-white/40 backdrop-blur-[10px] rounded-3xl sm:rounded-[48px] shadow-[0px_20px_25px_-5px_rgba(0,0,0,0.1),0px_8px_10px_-6px_rgba(0,0,0,0.1)] relative group">

            {/* Input Placeholder (Simulated Search) */}
            <div className="flex-1 flex items-center justify-center h-[52.8px] bg-white/50 border-[2px] border-[#8B5000]/20 rounded-full transition-all group-hover:border-[#8B5000]/40 w-full sm:w-auto">
              <input
                type="text"
                placeholder="Search for deals"
                className="w-full bg-transparent outline-none px-6 font-['Manrope'] font-semibold text-[14px] tracking-[0.7px] text-[#6B7280] placeholder:text-[#6B7280]"
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

        {/* 
        COMMENTED OUT STATIC IMAGE
        <motion.div
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="relative w-full max-w-[600px] z-10"
        >
          <div className="relative overflow-hidden p-3 group lg:mt-8">
            <img
              src="/png-05-e1755003916324.png"
              alt="Mint Elite Deals"
              className="w-full h-auto rounded-[32px] object-contain transition-transform duration-700 group-hover:scale-[1.02]"
            />
            <div className="absolute -inset-4 bg-gradient-to-tr from-[#FF9800]/10 to-transparent blur-3xl -z-10 rounded-full opacity-60" />
          </div>
        </motion.div>
        */}

        {/* Right Side: Deals Carousel */}
        <div className="relative w-full max-w-[600px] h-[380px] lg:h-[380px] z-10">
          <AnimatePresence mode="popLayout">
            {carouselDeals.map((deal, index) => {
              if (index !== currentIndex) return null;
              return (
                <motion.div
                  key={deal.id}
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

                  {/* Tag */}
                  <div className="absolute top-8 left-8 bg-black/30 backdrop-blur-md px-4 py-1.5 rounded-full border border-white/20 flex items-center gap-2 shadow-lg">
                    <span className="w-2 h-2 rounded-full bg-white animate-[pulse_2s_ease-in-out_infinite]" />
                    <span className="text-white text-xs font-bold uppercase tracking-widest font-['Manrope']">{deal.tag}</span>
                  </div>

                  {/* Content */}
                  <div className="relative z-10">
                    <div className="text-white/80 font-bold text-sm mb-1 uppercase tracking-widest font-['Manrope'] drop-shadow-md">{deal.store}</div>
                    <div className="text-white font-black text-3xl md:text-5xl mb-2 leading-tight tracking-tight font-['Manrope'] drop-shadow-lg">{deal.discount}</div>
                    <div className="text-white/90 text-sm md:text-lg mb-6 font-medium font-['Manrope'] drop-shadow-md">{deal.title}</div>

                    <button className="flex items-center gap-2 text-[#1A1C1C] font-bold bg-white/90 backdrop-blur-md hover:bg-white hover:scale-105 active:scale-95 transition-all px-6 py-3 rounded-full w-max shadow-xl font-['Manrope']">
                      Claim Reward <ArrowRight className="w-4 h-4 text-[#FF9800]" />
                    </button>
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>

          {/* Carousel Navigation Dots */}
          <div className="absolute -bottom-10 left-1/2 -translate-x-1/2 flex gap-3">
            {carouselDeals.map((_, idx) => (
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
