import { Store } from '@/redux/slices/storeSlice';
import Link from 'next/link';
import { motion } from 'framer-motion';

interface StoreCardProps {
  store: Store;
  idx: number;
}

export default function StoreCard({ store, idx }: StoreCardProps) {
  // Use slug for logo if logoUrl is missing
  const logoSource = (() => {
    const { getProxyLogoUrl } = require('@/utils/imageHelper');
    return getProxyLogoUrl(store.logoUrl, store.slug);
  })();

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: idx * 0.05 }}
      className="flex flex-col items-center justify-center"
    >
      <Link 
        href={`/store/${store.slug}`}
        className="group relative flex flex-col items-center w-full"
      >
        {/* The Floating Bubble */}
        <div className="relative">
          <div className="w-28 h-28 md:w-32 md:h-32 bg-white rounded-full flex items-center justify-center shadow-xl shadow-slate-200 border border-slate-50 group-hover:-translate-y-3 transition-all duration-500 p-6 z-10 overflow-hidden">
            <img 
              src={logoSource} 
              alt={store.name} 
              className="max-w-full max-h-full object-contain grayscale-[0.3] group-hover:grayscale-0 transition-all duration-500"
              onError={(e: any) => {
                if (e.target.src.includes('ui-avatars.com')) return;
                e.target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(store.name)}&background=FF9800&color=fff&size=128&bold=true&font-size=0.4`;
              }}
            />
          </div>
          
          {/* Animated Background Ring */}
          <div className="absolute inset-0 bg-[#FF9800] rounded-full blur-2xl opacity-0 group-hover:opacity-25 transition-opacity duration-500 scale-110" />
        </div>

        {/* Store Info & Discount (Outside the Bubble) */}
        <div className="mt-6 text-center">
          <div className="text-[14px] font-black text-[#FF9800] tracking-widest mb-1">
            {store.cashbackRate}% CASHBACK
          </div>
          <h3 className="text-lg font-black text-[#1A1C1C] tracking-tight group-hover:text-[#FF9800] transition-colors truncate max-w-[180px]">
            {store.name}
          </h3>
          <p className="text-slate-400 font-bold text-[10px] uppercase tracking-widest mt-1">
            {store.category || 'Retailer'}
          </p>
        </div>
      </Link>
    </motion.div>
  );
}
