"use client";

import CashbackHero from '@/components/cashback/CashbackHero';
// import CashbackHowItWorks from '@/components/cashback/CashbackHowItWorks';
import CashbackGrid from '@/components/cashback/CashbackGrid';

export default function CashbackPageClient() {
  return (
    <div className="bg-white min-h-screen pt-32 pb-24 font-['Manrope']">
      <div className="max-w-[1400px] mx-auto px-6 md:px-12">
        {/* Hero Section */}
        <CashbackHero />

        {/* Grid of Stores (Selection of the Day) - MOVED UP */}
        <CashbackGrid />

        <div className="w-full h-px bg-slate-100 my-12" />

        {/* How it Works - Steps - MOVED DOWN */}
        {/* <CashbackHowItWorks /> */}

        {/* Call to Action */}
        <div className="mt-24 bg-white border border-slate-100 rounded-[50px] sm:rounded-[64px] p-12 sm:p-20 md:p-24 text-center space-y-8 relative overflow-hidden shadow-xl shadow-slate-100/40">
          <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_top_right,_#FF980008,_transparent)] pointer-events-none" />
          <h2 className="text-4xl md:text-6xl font-black text-[#1A1C1C] relative z-10 leading-tight">
            Ready to Start <br /> <span className="text-[#FF9800]">Saving Like a Pro?</span>
          </h2>
          <p className="text-slate-500 text-base md:text-xl max-w-[600px] mx-auto relative z-10 font-medium leading-relaxed">
            Join 12k+ members who never pay full price. Create your account in 30 seconds.
          </p>
          <div className="relative z-10 pt-4">
            <button className="px-14 py-6 bg-[#1A1C1C] text-white rounded-full font-black text-[12px] sm:text-[14px] uppercase tracking-widest hover:bg-[#FF9800] transition-all shadow-xl shadow-slate-200 active:scale-95">
              Create Free Account
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
