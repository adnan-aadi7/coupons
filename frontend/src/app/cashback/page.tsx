"use client";

import CashbackHero from '@/components/cashback/CashbackHero';
import CashbackHowItWorks from '@/components/cashback/CashbackHowItWorks';
import CashbackGrid from '@/components/cashback/CashbackGrid';

export default function CashbackPage() {
  return (
    <div className="bg-white min-h-screen pt-32 pb-24 font-['Manrope']">
      <div className="max-w-[1400px] mx-auto px-6 md:px-12">
        {/* Hero Section */}
        <CashbackHero />

        {/* Grid of Stores (Selection of the Day) - MOVED UP */}
        <CashbackGrid />

        <div className="w-full h-px bg-slate-100 my-12" />

        {/* How it Works - Steps - MOVED DOWN */}
        <CashbackHowItWorks />

        {/* Call to Action */}
        <div className="mt-24 bg-[#1A1C1C] rounded-[64px] p-16 md:p-24 text-center space-y-8 relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_top_right,_#FF980020,_transparent)] pointer-events-none" />
          <h2 className="text-4xl md:text-6xl font-black text-white relative z-10 leading-tight">
            Ready to Start <br /> <span className="text-[#FF9800]">Saving Like a Pro?</span>
          </h2>
          <p className="text-white/40 text-xl max-w-[600px] mx-auto relative z-10">
            Join 12k+ members who never pay full price. Create your account in 30 seconds.
          </p>
          <div className="relative z-10 pt-4">
            <button className="px-14 py-6 bg-white text-[#1A1C1C] rounded-full font-black text-[14px] uppercase tracking-widest hover:bg-[#FF9800] hover:text-white transition-all shadow-2xl">
              Create Free Account
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
