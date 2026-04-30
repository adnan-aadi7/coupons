"use client";

import { motion, AnimatePresence } from 'framer-motion';
import { X, Copy, ExternalLink, Check, ShieldCheck, Zap, Tag } from 'lucide-react';
import { useState } from 'react';

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
          className="relative w-full max-w-xl bg-background rounded-[40px] overflow-hidden shadow-[0_32px_64px_-16px_rgba(0,0,0,0.5)] border border-white/10"
        >
          {/* Top Branding Section */}
          <div className="bg-white/5 border-b border-white/10 p-8 flex flex-col items-center justify-center relative">
            <button
              onClick={onClose}
              className="absolute top-6 right-6 p-2 bg-white/5 hover:bg-white/10 rounded-full transition-colors z-10"
            >
              <X className="w-5 h-5 text-foreground" />
            </button>
            
            <div className="w-20 h-20 bg-white rounded-3xl p-4 shadow-xl shadow-black/5 mb-4 flex items-center justify-center">
              {coupon.brandLogo ? (
                <img src={coupon.brandLogo} alt={coupon.brand} className="max-w-full max-h-full object-contain" />
              ) : (
                <Tag className="w-8 h-8 text-black/10" />
              )}
            </div>
            
            <div className="flex items-center gap-2 bg-primary/10 text-primary px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest">
              <ShieldCheck className="w-3.5 h-3.5" />
              Verified Offer
            </div>
          </div>

          {/* Content Section */}
          <div className="px-10 pb-12 pt-8 text-center">
            <h2 className="text-3xl font-black text-foreground leading-tight mb-3">
              {coupon.title}
            </h2>
            <p className="text-white/40 font-bold mb-10 max-w-xs mx-auto">
              Copy this code and apply it during checkout on {coupon.store}.
            </p>

            {coupon.code ? (
              <div className="space-y-8">
                {/* Code Box */}
                <div className="relative">
                  <div className="absolute inset-0 bg-primary/20 blur-2xl rounded-full" />
                  <div className="relative bg-white/5 border-2 border-dashed border-primary p-2 rounded-[32px] flex items-center justify-between overflow-hidden">
                    <span className="flex-1 text-2xl font-black font-mono tracking-[0.2em] text-foreground pl-6">
                      {coupon.code}
                    </span>
                    <button
                      onClick={handleCopy}
                      className={`
                        flex items-center gap-2 px-8 py-4 rounded-[24px] font-black text-xs uppercase tracking-widest transition-all
                        ${copied ? 'bg-green-500 text-white' : 'bg-primary text-white hover:bg-emerald-400 shadow-xl shadow-primary/20'}
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
                    className="flex w-full items-center justify-center gap-3 bg-white/10 text-white py-5 rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-white/20 transition-all group"
                  >
                    Go to {coupon.store} Store
                    <ExternalLink className="w-4 h-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                  </a>
                  <p className="text-[10px] font-black text-white/20 uppercase tracking-widest">
                    Offer valid while supplies last. Exclusions apply.
                  </p>
                </div>
              </div>
            ) : (
              <div className="space-y-8">
                <div className="bg-primary/5 border border-primary/20 p-8 rounded-[32px]">
                  <p className="font-black text-2xl text-primary flex items-center justify-center gap-3">
                    <Zap className="w-6 h-6 fill-current" />
                    Deal Activated
                  </p>
                  <p className="text-sm text-black/40 font-bold mt-2">No code required. Savings applied at checkout.</p>
                </div>
                <a
                  href={coupon.link}
                  target="_blank"
                  className="flex w-full items-center justify-center gap-3 bg-primary text-white py-5 rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-emerald-400 transition-all shadow-xl shadow-primary/20"
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
