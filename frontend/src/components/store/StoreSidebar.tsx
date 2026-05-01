"use client";

import { Zap, TrendingUp, Users, Store } from 'lucide-react';

interface StoreSidebarProps {
  storeName: string;
  logoUrl: string;
  logoError: boolean;
  onLogoError: () => void;
  onActivateCashback: () => void;
}

export default function StoreSidebar({ 
  storeName, 
  logoUrl, 
  logoError, 
  onLogoError, 
  onActivateCashback 
}: StoreSidebarProps) {
  return (
    <aside className="lg:col-span-3 space-y-10 lg:sticky lg:top-32">
      {/* Store Identity */}
      <div className="text-center space-y-4">
        <div className="w-32 h-32 mx-auto bg-white rounded-[40px] border border-slate-100 p-6 flex items-center justify-center shadow-sm overflow-hidden">
          {!logoError ? (
            <img 
              src={logoUrl} 
              alt={storeName} 
              className="max-w-full max-h-full object-contain" 
              onError={onLogoError} 
            />
          ) : (
            <Store className="w-10 h-10 text-slate-200" />
          )}
        </div>
        <div>
          <h1 className="text-3xl font-black capitalize text-[#1A1C1C]">{storeName}</h1>
          <p className="text-slate-400 font-bold text-[13px] mt-1 italic">Verified Partner Store</p>
        </div>
      </div>

      {/* SmartSaver Elite Card */}
      <div className="bg-gradient-to-br from-[#FF9800] to-[#F57C00] rounded-[40px] p-10 text-white shadow-2xl shadow-orange-100 relative overflow-hidden group">
        <div className="relative z-10 space-y-6">
          <div className="text-[11px] font-black uppercase tracking-[0.2em] opacity-80">SmartSaver Elite</div>
          <div className="text-[48px] font-black leading-none">12.5%</div>
          <p className="text-sm font-bold opacity-90">Cashback available today</p>
          <button 
            onClick={onActivateCashback} 
            className="w-full py-4 bg-white text-[#FF9800] rounded-full font-black text-[15px] hover:shadow-lg transition-all active:scale-95"
          >
            Activate Now
          </button>
        </div>
      </div>

      {/* Stats */}
      <div className="space-y-6 px-4">
        <div className="flex items-center gap-4">
          <TrendingUp className="w-5 h-5 text-[#FF9800]" />
          <span className="text-sm font-black text-[#1A1C1C]">98.4% Success Rate</span>
        </div>
        <div className="flex items-center gap-4">
          <Users className="w-5 h-5 text-slate-300" />
          <span className="text-sm font-black text-[#1A1C1C]">12.4k Active Users</span>
        </div>
      </div>
    </aside>
  );
}
