"use client";

import Link from 'next/link';
import { Tag, Mail, Globe, Share2 } from 'lucide-react';
import Logo from '../common/Logo';

export default function Footer() {
  return (
    <footer className="bg-[#121A26] pt-16 pb-8 border-t border-slate-800 font-['Manrope']">
      <div className="max-w-[1280px] mx-auto px-4 md:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 md:gap-12 mb-12 sm:mb-16">

          {/* Brand Info */}
          <div className="space-y-6">
            <Logo lightText={true} />
            <p className="text-slate-400 font-['Manrope'] text-[15px] leading-relaxed">
              Your ultimate destination for verified promo codes, exclusive deals, and cash back offers from top brands.
            </p>
            <div className="flex flex-wrap gap-4">
              <a href="#" className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center text-slate-400 hover:bg-[#FF9800] hover:text-white transition-colors">
                <Globe className="w-5 h-5" />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center text-slate-400 hover:bg-[#FF9800] hover:text-white transition-colors">
                <Share2 className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Quick Links & Legal - side-by-side 2-column layout on mobile */}
          <div className="grid grid-cols-2 gap-8 sm:col-span-2 lg:col-span-2">
            {/* Quick Links */}
            <div>
              <h3 className="font-['Manrope'] font-bold text-white text-[16px] sm:text-[18px] mb-4 sm:mb-6">Explore</h3>
              <ul className="space-y-3 sm:space-y-4">
                <li><Link href="/deals" className="text-slate-400 hover:text-[#FF9800] transition-colors font-['Manrope'] text-[14px]">Top Deals</Link></li>
                <li><Link href="/stores" className="text-slate-400 hover:text-[#FF9800] transition-colors font-['Manrope'] text-[14px]">Stores</Link></li>
                <li><Link href="/about" className="text-slate-400 hover:text-[#FF9800] transition-colors font-['Manrope'] text-[14px]">About Us</Link></li>
                <li><Link href="/contact" className="text-slate-400 hover:text-[#FF9800] transition-colors font-['Manrope'] text-[14px]">Contact Us</Link></li>
              </ul>
            </div>

            {/* Legal */}
            <div>
              <h3 className="font-['Manrope'] font-bold text-white text-[16px] sm:text-[18px] mb-4 sm:mb-6">Legal</h3>
              <ul className="space-y-3 sm:space-y-4">
                <li><Link href="/terms" className="text-slate-400 hover:text-[#FF9800] transition-colors font-['Manrope'] text-[14px]">Terms of Service</Link></li>
                <li><Link href="/privacy" className="text-slate-400 hover:text-[#FF9800] transition-colors font-['Manrope'] text-[14px]">Privacy Policy</Link></li>
                <li><Link href="/cookies" className="text-slate-400 hover:text-[#FF9800] transition-colors font-['Manrope'] text-[14px]">Cookie Policy</Link></li>
                <li><Link href="/disclosure" className="text-slate-400 hover:text-[#FF9800] transition-colors font-['Manrope'] text-[14px]">Affiliate Disclosure</Link></li>
              </ul>
            </div>
          </div>

          {/* Newsletter */}
          <div className="space-y-4 sm:col-span-2 lg:col-span-1">
            <h3 className="font-['Manrope'] font-bold text-white text-[16px] sm:text-[18px] mb-2 sm:mb-6">Never Miss a Deal</h3>
            <p className="text-slate-400 font-['Manrope'] text-[14px] leading-relaxed">
              Get the best offers delivered straight to your inbox weekly.
            </p>
            <form className="flex flex-col gap-3" onSubmit={(e) => e.preventDefault()}>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500" />
                <input
                  type="email"
                  placeholder="Email address"
                  className="w-full bg-slate-800 border border-slate-700 text-white rounded-xl pl-12 pr-4 py-3 focus:outline-none focus:border-[#FF9800] font-['Manrope'] text-[14px]"
                />
              </div>
              <button
                type="submit"
                className="w-full bg-[#FF9800] hover:bg-[#F97316] text-white font-bold py-3 rounded-xl transition-all shadow-md active:scale-95 text-[14px]"
              >
                Subscribe
              </button>
            </form>
          </div>

        </div>

        {/* Bottom */}
        <div className="pt-8 border-t border-slate-800 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-slate-500 font-['Manrope'] text-[14px]">
            &copy; {new Date().getFullYear()} Coupons Mart. All rights reserved.
          </p>
        </div>
      </div>
    </footer >
  );
}
