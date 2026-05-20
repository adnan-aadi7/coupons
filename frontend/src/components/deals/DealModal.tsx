"use client";

import { motion, AnimatePresence } from 'framer-motion';
import { X, Copy, ExternalLink, Check, ShieldCheck, Zap, Tag } from 'lucide-react';
import { useState } from 'react';
import { getProxyLogoUrl } from '@/utils/imageHelper';

interface DealModalProps {
  isOpen: boolean;
  onClose: () => void;
  coupon: any;
}

export default function DealModal({ isOpen, onClose, coupon }: DealModalProps) {
  const [copied, setCopied] = useState(false);

  if (!isOpen || !coupon) return null;

  const API_URL = process.env.NEXT_PUBLIC_API_URL || 'https://coupons-52jf.vercel.app/api';
  const baseDomain = API_URL.endsWith('/api') ? API_URL.slice(0, -4) : API_URL;
  const trackingUrl = `${baseDomain}/api/track/${coupon._id}`;

  const handleCopy = () => {
    if (coupon.code) {
      navigator.clipboard.writeText(coupon.code);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 font-['Outfit']">
        {/* Premium Blur Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="absolute inset-0 bg-slate-950/60 backdrop-blur-sm"
        />

        {/* Modal Container */}
        <motion.div
          initial={{ opacity: 0, scale: 0.93, y: 30 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.93, y: 30 }}
          className="relative w-full max-w-xl bg-white text-slate-900 rounded-[40px] overflow-hidden shadow-[0_32px_64px_-16px_rgba(15,23,42,0.2)] border border-slate-100"
        >
          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-6 right-6 p-2.5 bg-slate-100 hover:bg-slate-200 rounded-full transition-colors z-20 text-slate-500 hover:text-slate-800 cursor-pointer border-0"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Top Branding Section */}
          <div className="bg-slate-50/60 border-b border-slate-100 p-8 flex flex-col items-center justify-center relative">
            
            {/* Logo Container */}
            <div className="w-22 h-22 bg-white rounded-3xl p-4.5 shadow-lg shadow-slate-100 border border-slate-100 mb-5 flex items-center justify-center transition-transform duration-300 hover:scale-105">
              {coupon.brandLogo ? (
                <img 
                  src={getProxyLogoUrl(coupon.brandLogo, (coupon.store || coupon.brand || 'brand').toLowerCase().replace(/[^a-z0-9]/g, ''))} 
                  alt={coupon.store} 
                  className="max-w-full max-h-full object-contain mix-blend-multiply" 
                />
              ) : (
                <Tag className="w-8 h-8 text-slate-300" />
              )}
            </div>
            
            <div className="flex items-center gap-2 bg-[#FF9800]/10 text-[#FF9800] border border-[#FF9800]/20 px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-[0.2em]">
              <ShieldCheck className="w-3.5 h-3.5 text-[#FF9800] animate-[pulse_2s_infinite]" />
              VERIFIED ADMITAD OFFER
            </div>
          </div>

          {/* Content Section */}
          <div className="px-6 sm:px-10 pb-10 sm:pb-12 pt-6 sm:pt-8 text-center relative z-10">
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900 leading-tight mb-3 tracking-tight font-['Outfit']">
              {coupon.title}
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 font-medium mb-8 max-w-sm mx-auto leading-relaxed">
              Copy this exclusive promo code and apply it during checkout on <span className="text-slate-950 font-bold">{coupon.store}</span>.
            </p>

            {coupon.code ? (
              <div className="space-y-6 sm:space-y-8">
                {/* Code Box */}
                <div className="relative">
                  <div className="relative bg-slate-50 border-2 border-dashed border-[#FF9800] p-2.5 rounded-[28px] sm:rounded-[36px] flex flex-col sm:flex-row items-center justify-between overflow-hidden gap-3 sm:gap-0">
                    <span className="flex-1 text-xl sm:text-2xl font-black font-mono tracking-[0.15em] sm:tracking-[0.25em] text-slate-900 pt-3 pb-1.5 sm:py-0 sm:pl-8 text-center sm:text-left w-full break-all px-2 uppercase">
                      {coupon.code}
                    </span>
                    <button
                      onClick={handleCopy}
                      className={`
                        w-full sm:w-auto flex items-center justify-center gap-2.5 px-8 sm:px-10 py-4 sm:py-4.5 rounded-[22px] sm:rounded-[28px] font-bold text-xs uppercase tracking-widest transition-all cursor-pointer border-0
                        ${copied ? 'bg-emerald-500 text-white' : 'bg-slate-900 hover:bg-slate-800 text-white shadow-xl'}
                      `}
                    >
                      {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                      {copied ? 'Copied' : 'Copy Code'}
                    </button>
                  </div>
                </div>

                <div className="space-y-4">
                  <a
                    href={trackingUrl}
                    target="_blank"
                    className="flex w-full items-center justify-center gap-3 bg-gradient-to-r from-[#FF9800] to-orange-600 text-white py-4.5 sm:py-5 rounded-[20px] sm:rounded-2xl font-bold text-xs uppercase tracking-widest hover:scale-[1.02] active:scale-[0.98] transition-all group shadow-lg shadow-orange-500/20 border-0 cursor-pointer"
                  >
                    Go to {coupon.store} Store
                    <ExternalLink className="w-4 h-4 text-white group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                  </a>
                  <p className="text-[9px] sm:text-[10px] font-black text-slate-400 uppercase tracking-[0.15em] px-4">
                    Offer valid while supplies last. Redirect secured by SmartSaver aggregate.
                  </p>
                </div>
              </div>
            ) : (
              <div className="space-y-6 sm:space-y-8">
                <div className="bg-[#FF9800]/5 border border-[#FF9800]/10 p-6 sm:p-8 rounded-[24px] sm:rounded-[32px]">
                  <p className="font-black text-xl sm:text-2xl text-[#FF9800] flex items-center justify-center gap-2 sm:gap-3 uppercase tracking-wider">
                    <Zap className="w-5 h-5 sm:w-6 sm:h-6 fill-current text-[#FF9800] animate-[pulse_2s_infinite]" />
                    Deal Activated
                  </p>
                  <p className="text-xs sm:text-sm text-slate-500 font-semibold mt-2 leading-relaxed">
                    No promo code required! Click below to shop and claim your savings directly.
                  </p>
                </div>
                <a
                  href={trackingUrl}
                  target="_blank"
                  className="flex w-full items-center justify-center gap-3 bg-gradient-to-r from-[#FF9800] to-orange-600 text-white py-4.5 sm:py-5 rounded-[20px] sm:rounded-2xl font-bold text-xs uppercase tracking-widest hover:scale-[1.02] active:scale-[0.98] transition-all shadow-xl shadow-orange-500/20 border-0 cursor-pointer"
                >
                  Shop Now at {coupon.store}
                </a>
              </div>
            )}
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
