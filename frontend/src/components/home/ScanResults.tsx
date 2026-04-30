"use client";

import { motion } from 'framer-motion';
import { Zap, Loader2 } from 'lucide-react';
import CouponCard from '@/components/deals/CouponCard';
import SectionHeader from '@/components/ui/SectionHeader';
import GlassContainer from '@/components/ui/GlassContainer';

interface ScanResultsProps {
  isLoading: boolean;
  results: any;
  onOpenDeal: (coupon: any) => void;
}

export default function ScanResults({ isLoading, results, onOpenDeal }: ScanResultsProps) {
  if (!isLoading && !results) return null;

  return (
    <div className="space-y-8 scroll-mt-32" id="results">
      <SectionHeader title="Scan Result" icon={Zap} />

      {isLoading ? (
        <div className="flex flex-col items-center justify-center py-24 gap-4 bg-slate-50 border border-slate-100 rounded-[40px]">
          <Loader2 className="w-10 h-10 text-primary animate-spin" />
          <p className="text-slate-400 font-bold tracking-tight">Finding best deals for your product...</p>
        </div>
      ) : results?.success && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-8"
        >
          <div className="flex items-center gap-6 p-6 bg-emerald-50 border border-emerald-100 rounded-[32px]">
            <div className="w-24 h-24 bg-white rounded-2xl flex items-center justify-center overflow-hidden border border-emerald-100 shadow-sm shrink-0">
              {results.product.imageUrl ? (
                <img src={results.product.imageUrl} alt={results.product.title} className="w-full h-full object-contain p-2" />
              ) : (
                <Zap className="text-emerald-500 w-8 h-8" />
              )}
            </div>
            <div>
              <h3 className="font-extrabold text-2xl mb-1 text-slate-900 tracking-tight">{results.product.title}</h3>
              <p className="text-sm text-slate-400 font-bold uppercase tracking-widest">
                Brand: <span className="text-emerald-600">{results.product.brand}</span> •
                Category: <span className="text-emerald-600">{results.product.category}</span>
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {results.coupons.length > 0 ? (
              results.coupons.map((coupon: any, idx: number) => (
                <CouponCard key={coupon._id} coupon={coupon} idx={idx} onOpenDeal={onOpenDeal} />
              ))
            ) : (
              <div className="col-span-full py-24 text-center border-2 border-dashed border-slate-100 rounded-[40px] text-slate-400 font-bold">
                No exact coupons found for this product. See global deals below!
              </div>
            )}
          </div>
        </motion.div>
      )}
    </div>
  );
}
