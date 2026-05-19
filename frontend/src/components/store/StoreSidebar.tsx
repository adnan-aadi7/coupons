"use client";

import { Zap, TrendingUp, Users, Store, Heart } from 'lucide-react';

interface StoreSidebarProps {
  storeName: string;
  logoUrl: string;
  logoError: boolean;
  onLogoError: () => void;
  onActivateCashback: () => void;
  cashbackRate?: string;
  isFavorite?: boolean;
  onToggleFavorite?: () => void;
}

export default function StoreSidebar({ 
  storeName, 
  logoUrl, 
  logoError, 
  onLogoError, 
  onActivateCashback,
  cashbackRate,
  isFavorite,
  onToggleFavorite
}: StoreSidebarProps) {
  return (
    <aside className="lg:col-span-3 space-y-6 sm:space-y-10 lg:sticky lg:top-32 self-start">
      {/* Store Identity */}
      <div className="text-center space-y-4">
        <div className="w-24 h-24 sm:w-32 sm:h-32 mx-auto bg-white rounded-3xl sm:rounded-[40px] border border-slate-100 p-4 sm:p-6 flex items-center justify-center shadow-sm overflow-hidden">
          {!logoError ? (
            <img 
              src={logoUrl} 
              alt={storeName} 
              className="max-w-full max-h-full object-contain" 
              onError={onLogoError} 
            />
          ) : (
            <img 
              src={`https://ui-avatars.com/api/?name=${encodeURIComponent(storeName)}&background=FF9800&color=fff&size=128&bold=true&font-size=0.4`} 
              alt={storeName} 
              className="w-full h-full rounded-full object-cover" 
            />
          )}
        </div>
        <div>
          <div className="flex items-center justify-center gap-3">
            <h1 className="text-2xl sm:text-3xl font-black capitalize text-[#1A1C1C]">{storeName}</h1>
            <button
              onClick={onToggleFavorite}
              className="p-2 hover:bg-slate-50 rounded-full transition-all active:scale-95 group/fav cursor-pointer"
              title={isFavorite ? "Remove from Favorites" : "Add to Favorites"}
            >
              <Heart 
                className={`w-5 h-5 sm:w-6 sm:h-6 transition-all duration-300 ${
                  isFavorite 
                    ? 'fill-[#FF9800] text-[#FF9800] scale-110' 
                    : 'text-slate-300 group-hover/fav:text-[#FF9800]/60 group-hover/fav:scale-105'
                }`} 
              />
            </button>
          </div>
          <p className="text-slate-400 font-bold text-[11px] sm:text-[13px] mt-1 italic">Verified Partner Store</p>
        </div>
      </div>

      {/* SmartSaver Elite Card */}
      <div className="bg-gradient-to-br from-[#FF9800] to-[#F57C00] rounded-3xl sm:rounded-[40px] p-6 sm:p-10 text-white shadow-2xl shadow-orange-100 relative overflow-hidden group">
        <div className="relative z-10 space-y-4 sm:space-y-6">
          <div className="text-[9px] sm:text-[11px] font-black uppercase tracking-[0.2em] opacity-80">SmartSaver Elite</div>
          <div className="text-3xl sm:text-[48px] font-black leading-none">{cashbackRate || "12.5%"}</div>
          <p className="text-xs sm:text-sm font-bold opacity-90">Cashback available today</p>
          <button 
            onClick={onActivateCashback} 
            className="w-full py-3 sm:py-4 bg-white text-[#FF9800] rounded-full font-black text-xs sm:text-[15px] hover:shadow-lg transition-all active:scale-95"
          >
            Activate Now
          </button>
        </div>
      </div>

      {/* Stats */}
      <div className="flex flex-row lg:flex-col items-center lg:items-start justify-center lg:justify-start gap-4 xs:gap-6 lg:gap-6 px-4 py-3 sm:py-0 border-y sm:border-y-0 border-slate-100 sm:border-none">
        <div className="flex items-center gap-2">
          <TrendingUp className="w-4 h-4 sm:w-5 sm:h-5 text-[#FF9800]" />
          <span className="text-[11px] sm:text-sm font-black text-[#1A1C1C] whitespace-nowrap">98.4% Success</span>
        </div>
        <div className="h-4 w-px bg-slate-200 lg:hidden" />
        <div className="flex items-center gap-2">
          <Users className="w-4 h-4 sm:w-5 sm:h-5 text-slate-300" />
          <span className="text-[11px] sm:text-sm font-black text-[#1A1C1C] whitespace-nowrap">12.4k Active</span>
        </div>
      </div>
    </aside>
  );
}
