"use client";

import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { useRef } from 'react';

const TOP_STORES = [
  { name: 'Apple', logo: 'https://icon.horse/icon/apple.com', yield: 'UP TO 3% YIELD', image: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=400&q=80' },
  { name: 'Sephora', logo: 'https://icon.horse/icon/sephora.com', yield: 'UP TO 8% YIELD', image: 'https://images.unsplash.com/photo-1556228578-0d85b1a4d571?auto=format&fit=crop&w=400&q=80' },
  { name: 'Nike', logo: 'https://icon.horse/icon/nike.com', yield: 'UP TO 10% YIELD', image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=400&q=80' },
  { name: 'Prada', logo: 'https://icon.horse/icon/prada.com', yield: 'UP TO 5% YIELD', image: 'https://images.unsplash.com/photo-1445205170230-053b83016050?auto=format&fit=crop&w=400&q=80' },
  { name: 'Tesla', logo: 'https://icon.horse/icon/tesla.com', yield: 'UP TO 2% YIELD', image: 'https://images.unsplash.com/photo-1560958089-b8a1929cea89?auto=format&fit=crop&w=400&q=80' },
  { name: 'Dior', logo: 'https://icon.horse/icon/dior.com', yield: 'UP TO 6% YIELD', image: 'https://images.unsplash.com/photo-1588610534246-324e9bc3cc08?auto=format&fit=crop&w=400&q=80' },
  { name: 'Amazon', logo: 'https://icon.horse/icon/amazon.com', yield: 'UP TO 5% YIELD', image: 'https://images.unsplash.com/photo-1523474253046-8cd2748b5fd2?auto=format&fit=crop&w=400&q=80' },
  { name: 'Walmart', logo: 'https://icon.horse/icon/walmart.com', yield: 'UP TO 4% YIELD', image: 'https://images.unsplash.com/photo-1534452203293-494d7ddbf7f0?auto=format&fit=crop&w=400&q=80' },
];

export default function BrandGrid() {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const { scrollLeft, clientWidth } = scrollRef.current;
      const scrollTo = direction === 'left' ? scrollLeft - clientWidth / 2 : scrollLeft + clientWidth / 2;
      scrollRef.current.scrollTo({ left: scrollTo, behavior: 'smooth' });
    }
  };

  return (
    <section className=" py-7 border-b border-slate-100 ">
      <div className="max-w-[1280px] mx-auto px-4 md:px-8">

        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-12">
          <div>
            <h2 className="text-[32px] md:text-[40px] font-['Manrope'] font-semibold text-[#1A1C1C] leading-[1.1] tracking-[-0.8px] mb-2 text-center sm:text-left">
              Partner Directory
            </h2>
            <p className="text-[16px] md:text-[18px] font-['Manrope'] text-[#554434] text-center sm:text-left">
              Access exclusive yields from over 5,000+ elite global brands.
            </p>
          </div>

          {/* View All Link instead of arrows */}
          <div className="flex sm:flex-none justify-center sm:justify-end w-full sm:w-auto">
            <Link
              href="/categories"
              className="group flex items-center justify-between sm:justify-start gap-4 font-['Manrope'] font-bold text-[#1A1C1C] text-[14px] hover:text-[#FF9800] transition-colors w-full sm:w-auto p-4 sm:p-0 rounded-2xl bg-white sm:bg-transparent border border-slate-100 sm:border-transparent shadow-sm sm:shadow-none"
            >
              <span>View All Stores</span>
              <div className="w-8 h-8 rounded-full border border-slate-200 bg-white flex items-center justify-center group-hover:border-[#FF9800] group-hover:bg-[#FF9800] transition-all shrink-0">
                <ArrowRight className="w-4 h-4 text-[#1A1C1C] group-hover:text-white transition-colors" />
              </div>
            </Link>
          </div>
        </div>

        {/* Carousel Container */}
        <div
          ref={scrollRef}
          className="flex overflow-x-auto snap-x snap-mandatory gap-6 pb-8 hide-scrollbar"
        >
          {TOP_STORES.map((store, i) => (
            <Link
              key={store.name}
              href={`/store/${store.name.toLowerCase().replace(/\s+/g, '-')}`}
              className="shrink-0 snap-start"
            >
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ delay: i * 0.05, duration: 0.4 }}
                className="w-[260px] h-[320px] bg-white rounded-[32px] shadow-[0px_10px_20px_-10px_rgba(0,0,0,0.05)] border border-slate-50 hover:shadow-[0px_20px_40px_-5px_rgba(0,0,0,0.15)] hover:-translate-y-2 transition-all duration-300 flex flex-col items-center group cursor-pointer overflow-hidden relative"
              >
                {/* Store Cover Image */}
                <div className="w-full h-[140px] relative overflow-hidden bg-slate-100 shrink-0">
                  <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors z-10" />
                  <img
                    src={store.image}
                    alt={`${store.name} lifestyle cover`}
                    className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700"
                  />
                </div>

                {/* Overlapping Logo Box */}
                <div className="absolute top-[100px] w-[80px] h-[80px] flex items-center justify-center overflow-hidden transform group-hover:-translate-y-1 transition-transform duration-300 bg-white rounded-[20px] p-3 shadow-[0px_10px_20px_rgba(0,0,0,0.1)] z-20 border border-slate-50">
                  <img
                    src={store.logo}
                    alt={store.name}
                    className="w-full h-full object-contain transition-transform duration-300 mix-blend-multiply"
                  />
                </div>

                {/* Text Details */}
                <div className="flex flex-col items-center gap-1 text-center mt-[55px] px-6 w-full pb-6">
                  <span className="font-['Manrope'] font-bold text-[20px] text-[#1A1C1C] drop-shadow-sm truncate w-full">
                    {store.name}
                  </span>
                  <span className="font-['Manrope'] font-bold text-[11px] text-[#F97316] uppercase tracking-[0.5px]">
                    {store.yield}
                  </span>

                  {/* Fake "Shop Now" label appearing on hover */}
                  <div className="mt-4 opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition-all duration-300">
                    <span className="text-[13px] font-bold text-[#1A1C1C] flex items-center gap-1">
                      Shop Now <ArrowRight className="w-3 h-3 text-[#F97316]" />
                    </span>
                  </div>
                </div>
              </motion.div>
            </Link>
          ))}
        </div>
      </div>

      {/* Global Style for hiding scrollbar cleanly */}
      <style dangerouslySetInnerHTML={{
        __html: `
        .hide-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .hide-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}} />
    </section>
  );
}
