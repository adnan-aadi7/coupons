"use client";

import { motion } from 'framer-motion';

export default function DashboardHeader({ user }: { user: any }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
    >
      <div className="bg-white rounded-[32px] p-8 md:p-10 border border-slate-100 shadow-sm relative overflow-hidden flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
        
        {/* Left Side: Welcome */}
        <div className="relative z-10 flex-1 space-y-2">
          <h1 className="text-2xl text-slate-700 font-medium">Welcome back, <span className="text-primary font-bold italic">{user?.name?.split(' ')[0] || 'User'}</span>!</h1>
          <p className="text-sm text-slate-500">Your wealth-generation journey is thriving.</p>
        </div>
        
        {/* Right Side: Cashback and Buttons */}
        <div className="relative z-10 flex flex-col md:items-end space-y-5">
          <div className="space-y-1 md:text-right">
            <div className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">Total Cashback Earned</div>
            <div className="text-4xl md:text-5xl font-black text-slate-900 flex items-end md:justify-end gap-1">
              ${user?.wallet?.lifetimeSavings?.toFixed(2)?.split('.')[0] || '0'}
              <span className="text-2xl md:text-3xl text-primary">.{user?.wallet?.lifetimeSavings?.toFixed(2)?.split('.')[1] || '00'}</span>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-3 pt-2">
            <button className="bg-primary text-white px-6 py-3 rounded-2xl font-bold hover:bg-primary/90 transition-all shadow-lg shadow-primary/20 text-sm">
              Withdraw Funds
            </button>
            <button className="bg-white hover:bg-slate-50 border border-slate-200 px-6 py-3 rounded-2xl font-bold transition-all text-slate-700 text-sm">
              View Analytics
            </button>
          </div>
        </div>

      </div>
    </motion.div>
  );
}
