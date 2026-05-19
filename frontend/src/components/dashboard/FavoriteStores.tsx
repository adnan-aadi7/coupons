"use client";

import { motion } from 'framer-motion';
import { Plus } from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function FavoriteStores({ stores }: { stores: any[] }) {
  const router = useRouter();

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2 }}
      className="space-y-6"
    >
      <h2 className="text-xl font-bold tracking-tight text-slate-800">Favorite Stores</h2>
      <div className="bg-white rounded-3xl p-6 border border-slate-100 shadow-sm">
        <div className="grid grid-cols-2 gap-4">
          {stores.map((store) => (
            <div 
              key={store.id} 
              onClick={() => store.slug && router.push(`/store/${store.slug}`)}
              className="bg-slate-50 border border-slate-100 rounded-2xl p-4 flex flex-col items-center justify-center gap-3 hover:bg-slate-100 transition-all cursor-pointer"
            >
              <div className="w-12 h-12 bg-white rounded-xl overflow-hidden flex items-center justify-center p-2 shadow-sm border border-slate-100">
                <img 
                  src={store.logo} 
                  alt={store.name} 
                  className="w-full h-full object-contain" 
                  onError={(e) => { e.currentTarget.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(store.name)}&background=FF9800&color=fff&size=128&bold=true` }} 
                />
              </div>
              <div className="text-center">
                <h4 className="text-xs font-bold text-slate-800">{store.name}</h4>
                <span className="inline-block mt-1 bg-primary text-white text-[8px] font-black px-2 py-0.5 rounded-full shadow-sm shadow-primary/20">
                  {store.cashback} CASHBACK
                </span>
              </div>
            </div>
          ))}
          
          {/* Add New */}
          <div 
            onClick={() => router.push('/stores')}
            className="border border-dashed border-slate-200 rounded-2xl p-4 flex flex-col items-center justify-center gap-3 hover:bg-slate-50 transition-all cursor-pointer"
          >
            <div className="w-10 h-10 border border-slate-200 bg-white rounded-full flex items-center justify-center text-slate-400 shadow-sm">
              <Plus className="w-5 h-5" />
            </div>
            <span className="text-[10px] font-medium text-slate-400">Add New</span>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
