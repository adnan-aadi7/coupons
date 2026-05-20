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

  const handleCopy = () => {
    if (coupon.code) {
      navigator.clipboard.writeText(coupon.code);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        />

        {/* Modal */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 20 }}
          className="relative w-full max-w-xl bg-white rounded-[40px] overflow-hidden shadow-[0_32px_64px_-16px_rgba(15,23,42,0.15)] border border-slate-100"
        >
          {/* Top Branding Section */}
          <div className="bg-slate-50/60 border-b border-slate-100 p-8 flex flex-col items-center justify-center relative">
            <button
              onClick={onClose}
              className="absolute top-6 right-6 p-2 bg-slate-100 hover:bg-slate-200 rounded-full transition-colors z-10 text-slate-500 hover:text-slate-800"
            >
              <X className="w-5 h-5" />
            </button>
            
            <div className="w-20 h-20 bg-white rounded-3xl p-4 shadow-lg shadow-slate-100 border border-slate-100 mb-4 flex items-center justify-center">
              {coupon.brandLogo ? (
                <img src={getProxyLogoUrl(coupon.brandLogo, (coupon.store || coupon.brand || 'brand').toLowerCase().replace(/[^a-z0-9]/g, ''))} alt={coupon.store} className="max-w-full max-h-full object-contain" />
              ) : (
                <Tag className="w-8 h-8 text-slate-300" />
              )}
            </div>
            
            <div className="flex items-center gap-2 bg-primary/10 text-primary px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest">
              <ShieldCheck className="w-3.5 h-3.5" />
              Verified Offer
            </div>
          </div>

          {/* Content Section */}
          <div className="px-6 sm:px-10 pb-8 sm:pb-12 pt-6 sm:pt-8 text-center">
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900 leading-tight mb-3">
              {coupon.title}
            </h2>
            <p className="text-sm sm:text-base text-slate-500 font-semibold mb-8 sm:mb-10 max-w-xs mx-auto">
              Copy this code and apply it during checkout on {coupon.store}.
            </p>

            {coupon.code ? (
              <div className="space-y-6 sm:space-y-8">
                {/* Code Box */}
                <div className="relative">
                  <div className="absolute inset-0 bg-primary/10 blur-xl rounded-full" />
                  <div className="relative bg-slate-50 border-2 border-dashed border-primary p-2 rounded-[24px] sm:rounded-[32px] flex flex-col sm:flex-row items-center justify-between overflow-hidden gap-2 sm:gap-0">
                    <span className="flex-1 text-xl sm:text-2xl font-black font-mono tracking-[0.1em] sm:tracking-[0.2em] text-slate-900 pt-3 pb-1 sm:py-0 sm:pl-6 text-center sm:text-left w-full break-all px-2">
                      {coupon.code}
                    </span>
                    <button
                      onClick={handleCopy}
                      className={`
                        w-full sm:w-auto flex items-center justify-center gap-2 px-6 sm:px-8 py-3 sm:py-4 rounded-[20px] sm:rounded-[24px] font-black text-xs uppercase tracking-widest transition-all
                        ${copied ? 'bg-green-500 text-white' : 'bg-primary text-white hover:bg-emerald-600 shadow-xl shadow-primary/20'}
                      `}
                    >
                      {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                      {copied ? 'Copied' : 'Copy'}
                    </button>
                  </div>
                </div>

                <div className="space-y-4">
                  <a
                    href={coupon.link}
                    target="_blank"
                    className="flex w-full items-center justify-center gap-3 bg-slate-900 text-white py-4 sm:py-5 rounded-[20px] sm:rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-slate-800 transition-all group shadow-lg shadow-slate-900/10"
                  >
                    Go to {coupon.store} Store
                    <ExternalLink className="w-4 h-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                  </a>
                  <p className="text-[9px] sm:text-[10px] font-black text-slate-400 uppercase tracking-widest px-4">
                    Offer valid while supplies last. Exclusions apply.
                  </p>
                </div>
              </div>
            ) : (
              <div className="space-y-6 sm:space-y-8">
                <div className="bg-primary/5 border border-primary/20 p-6 sm:p-8 rounded-[24px] sm:rounded-[32px]">
                  <p className="font-black text-xl sm:text-2xl text-primary flex items-center justify-center gap-2 sm:gap-3">
                    <Zap className="w-5 h-5 sm:w-6 sm:h-6 fill-current" />
                    Deal Activated
                  </p>
                  <p className="text-xs sm:text-sm text-slate-500 font-semibold mt-2">No code required. Savings applied at checkout.</p>
                </div>
                <a
                  href={coupon.link}
                  target="_blank"
                  className="flex w-full items-center justify-center gap-3 bg-primary text-white py-4 sm:py-5 rounded-[20px] sm:rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-emerald-600 transition-all shadow-xl shadow-primary/20"
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
