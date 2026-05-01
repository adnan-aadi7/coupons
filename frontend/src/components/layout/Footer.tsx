"use client";

import Link from 'next/link';
import { Tag, Mail, Globe, Share2 } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-[#121A26] pt-16 pb-8 border-t border-slate-800 font-['Manrope']">
      <div className="max-w-[1280px] mx-auto px-4 md:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">

          {/* Brand Info */}
          <div className="space-y-6 lg:col-span-1">
            <Link href="/" className="flex items-center gap-2 group">
              <div className="relative w-10 h-10 bg-[#1A1C1C] rounded-xl flex items-center justify-center shadow-lg overflow-hidden border border-slate-700">
                <Tag className="w-6 h-6 text-white rotate-[-15deg] z-10" />
                <div className="absolute bottom-2 left-2 w-3 h-3 bg-[#FF9800] rounded-full border-2 border-[#1A1C1C]" />
              </div>
              <span className="font-['Manrope'] font-black text-[24px] text-white tracking-tight leading-none">
                Mint <span className="text-white border-b-2 border-[#FF9800] pb-1">Elite</span>
              </span>
            </Link>
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

          {/* Quick Links */}
          <div>
            <h3 className="font-['Manrope'] font-bold text-white text-[18px] mb-6">Explore</h3>
            <ul className="space-y-4">
              <li><Link href="/deals" className="text-slate-400 hover:text-[#FF9800] transition-colors font-['Manrope']">Top Deals</Link></li>
              <li><Link href="/categories" className="text-slate-400 hover:text-[#FF9800] transition-colors font-['Manrope']">Categories</Link></li>
              <li><Link href="/stores" className="text-slate-400 hover:text-[#FF9800] transition-colors font-['Manrope']">Stores</Link></li>
              <li><Link href="/extension" className="text-slate-400 hover:text-[#FF9800] transition-colors font-['Manrope']">Browser Extension</Link></li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h3 className="font-['Manrope'] font-bold text-white text-[18px] mb-6">Legal</h3>
            <ul className="space-y-4">
              <li><Link href="/terms" className="text-slate-400 hover:text-[#FF9800] transition-colors font-['Manrope']">Terms of Service</Link></li>
              <li><Link href="/privacy" className="text-slate-400 hover:text-[#FF9800] transition-colors font-['Manrope']">Privacy Policy</Link></li>
              <li><Link href="/cookies" className="text-slate-400 hover:text-[#FF9800] transition-colors font-['Manrope']">Cookie Policy</Link></li>
              <li><Link href="/disclosure" className="text-slate-400 hover:text-[#FF9800] transition-colors font-['Manrope']">Affiliate Disclosure</Link></li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h3 className="font-['Manrope'] font-bold text-white text-[18px] mb-6">Never Miss a Deal</h3>
            <p className="text-slate-400 font-['Manrope'] text-[14px] mb-4">
              Get the best offers delivered straight to your inbox weekly.
            </p>
            <form className="flex flex-col gap-3" onSubmit={(e) => e.preventDefault()}>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500" />
                <input
                  type="email"
                  placeholder="Email address"
                  className="w-full bg-slate-800 border border-slate-700 text-white rounded-xl pl-12 pr-4 py-3 focus:outline-none focus:border-[#FF9800] font-['Manrope']"
                />
              </div>
              <button
                type="submit"
                className="w-full bg-[#FF9800] hover:bg-[#F97316] text-white font-bold py-3 rounded-xl transition-colors font-['Manrope']"
              >
                Subscribe
              </button>
            </form>
          </div>

        </div>

        {/* Bottom */}
        <div className="pt-8 border-t border-slate-800 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-slate-500 font-['Manrope'] text-[14px]">
            &copy; {new Date().getFullYear()} Mint Elite. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
