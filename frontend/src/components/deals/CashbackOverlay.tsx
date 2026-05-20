"use client";

import { motion, AnimatePresence } from 'framer-motion';
import { ShieldCheck, Zap, Loader2, CheckCircle2 } from 'lucide-react';
import { useState, useEffect } from 'react';

interface CashbackOverlayProps {
  isOpen: boolean;
  onClose: () => void;
  storeName: string;
  logoUrl: string;
  cashbackRate: string;
  redirectUrl?: string;
}

export default function CashbackOverlay({ isOpen, onClose, storeName, logoUrl, cashbackRate, redirectUrl }: CashbackOverlayProps) {
  const [step, setStep] = useState(0); // 0: Activating, 1: Success
  const [seconds, setSeconds] = useState(3);

  useEffect(() => {
    if (isOpen) {
      setStep(0);
      setSeconds(3);
      const timer = setTimeout(() => setStep(1), 1500);
      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) return;
    if (seconds <= 0) {
      if (redirectUrl) {
        window.location.href = redirectUrl;
      }
      onClose();
      return;
    }
    const timer = setTimeout(() => {
      setSeconds(prev => prev - 1);
    }, 1000);
    return () => clearTimeout(timer);
  }, [seconds, isOpen, redirectUrl, onClose]);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xl"
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 20 }}
            className="w-full max-w-sm bg-white border border-slate-100 rounded-[40px] p-8 text-center relative overflow-hidden shadow-2xl"
          >
            {/* Background Glow */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-48 h-48 bg-emerald-500/10 blur-[60px] -z-10 rounded-full" />

            <div className="space-y-6 relative z-10">
              {/* Store Icon */}
              <div className="w-20 h-20 mx-auto bg-slate-50 rounded-3xl p-4 border border-slate-100 shadow-sm flex items-center justify-center">
                <img src={logoUrl} alt={storeName} className="max-w-full max-h-full object-contain mix-blend-multiply" />
              </div>

              {/* Status Section */}
              <div className="min-h-[100px] flex flex-col items-center justify-center gap-4">
                {step === 0 ? (
                  <>
                    <div className="relative">
                      <Loader2 className="w-10 h-10 text-primary animate-spin" />
                      <Zap className="w-4 h-4 text-primary absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
                    </div>
                    <div>
                      <h3 className="text-xl font-black text-slate-800 mb-1">Activating Rewards</h3>
                      <p className="text-slate-400 text-xs font-bold uppercase tracking-widest">Securing your {cashbackRate} Cashback</p>
                    </div>
                  </>
                ) : (
                  <>
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ type: 'spring', damping: 12 }}
                    >
                      <CheckCircle2 className="w-12 h-12 text-emerald-500" />
                    </motion.div>
                    <div>
                      <h3 className="text-xl font-black text-slate-800 mb-1">Redirecting in {seconds}s...</h3>
                      <p className="text-slate-400 text-xs font-bold uppercase tracking-widest underline underline-offset-4 decoration-emerald-500/30">Tracking is Live</p>
                    </div>
                  </>
                )}
              </div>

              {/* Manual Link */}
              {redirectUrl && (
                <div className="pt-2 flex flex-col gap-2">
                  <a 
                    href={redirectUrl}
                    className="inline-block w-full py-4 bg-[#FF9800] hover:bg-[#F57C00] text-white font-bold text-xs uppercase tracking-widest rounded-2xl transition-all shadow-lg shadow-orange-500/10 active:scale-95 text-center"
                  >
                    Go to Store Manually
                  </a>
                  <button
                    onClick={onClose}
                    className="text-slate-400 hover:text-slate-700 text-xs font-bold uppercase tracking-wider py-2 transition-colors cursor-pointer"
                  >
                    Cancel
                  </button>
                </div>
              )}

              {/* Trust Footer */}
              <div className="pt-6 border-t border-slate-100 flex items-center justify-center gap-2 text-[10px] font-black uppercase tracking-[0.2em] text-slate-400/60">
                <ShieldCheck className="w-3.5 h-3.5" />
                SmartSaver Secured
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
