"use client";

import { motion } from 'framer-motion';
import { ShieldCheck, Key, LogOut } from 'lucide-react';

export default function AccountSecurity() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="w-full space-y-8"
    >
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <h2 className="text-[32px] font-medium tracking-tight text-[#111827] font-serif" style={{ fontFamily: 'Georgia, serif' }}>
          Account and Security
        </h2>
      </div>

      <div className="bg-white rounded-[24px] shadow-[0_2px_10px_rgba(0,0,0,0.02)] p-8 space-y-8">
        
        <div>
          <h3 className="text-lg font-bold text-slate-800 mb-6 flex items-center gap-2">
            <Key className="w-5 h-5 text-slate-400" /> Password Settings
          </h3>
          <form className="max-w-md space-y-4">
            <div className="space-y-2">
              <label className="text-sm font-bold text-slate-700">Current Password</label>
              <input 
                type="password" 
                placeholder="••••••••"
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-slate-700 focus:outline-none"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-bold text-slate-700">New Password</label>
              <input 
                type="password" 
                placeholder="••••••••"
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-slate-700 focus:outline-none"
              />
            </div>
            <button className="bg-[#111827] hover:bg-[#1f2937] text-white px-6 py-3 rounded-xl text-sm font-bold transition-all w-full md:w-auto mt-2">
              Update Password
            </button>
          </form>
        </div>

        <hr className="border-slate-100" />

        <div>
          <h3 className="text-lg font-bold text-slate-800 mb-6 flex items-center gap-2">
            <ShieldCheck className="w-5 h-5 text-emerald-500" /> Two-Factor Authentication
          </h3>
          <p className="text-slate-500 text-sm max-w-xl mb-6">
            Add an extra layer of security to your account. When enabled, you'll need to enter a verification code in addition to your password.
          </p>
          <button className="bg-emerald-50 hover:bg-emerald-100 text-emerald-700 border border-emerald-200 px-6 py-3 rounded-xl text-sm font-bold transition-all">
            Enable 2FA
          </button>
        </div>

        <hr className="border-slate-100" />

        <div>
          <h3 className="text-lg font-bold text-red-600 mb-4 flex items-center gap-2">
            <LogOut className="w-5 h-5" /> Danger Zone
          </h3>
          <p className="text-slate-500 text-sm max-w-xl mb-6">
            Once you delete your account, there is no going back. All your pending cashback and wallet balance will be permanently lost.
          </p>
          <button className="bg-white hover:bg-red-50 text-red-600 border border-red-200 px-6 py-3 rounded-xl text-sm font-bold transition-all">
            Deactivate Account
          </button>
        </div>

      </div>
    </motion.div>
  );
}
