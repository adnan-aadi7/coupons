"use client";

import { motion } from 'framer-motion';
import { Gift, Copy, Share2, Users, DollarSign } from 'lucide-react';
import { useState } from 'react';

export default function InviteAndEarn({ user }: { user: any }) {
  const [copied, setCopied] = useState(false);
  const inviteCode = user?._id?.substring(0, 8).toUpperCase() || 'REF2026';
  const inviteLink = `https://couponsmart.com/join/${inviteCode}`;

  const handleCopy = () => {
    navigator.clipboard.writeText(inviteLink);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="w-full space-y-8"
    >
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <h2 className="text-[32px] font-medium tracking-tight text-[#111827] font-serif" style={{ fontFamily: 'Georgia, serif' }}>
          Invite and Earn
        </h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-gradient-to-br from-[#0052cc] to-[#003d99] rounded-[24px] p-8 text-white relative overflow-hidden">
          <div className="absolute top-0 right-0 w-48 h-48 bg-white/10 rounded-full blur-2xl -mr-10 -mt-10" />
          <div className="relative z-10 space-y-4">
            <Gift className="w-10 h-10 text-white/80" />
            <h3 className="text-2xl font-bold">Give $10, Get $10</h3>
            <p className="text-blue-100 font-medium">
              Invite your friends to Coupons Mart. They get a $10 welcome bonus, and you get $10 when they earn their first cashback.
            </p>
          </div>
        </div>

        <div className="bg-white rounded-[24px] shadow-[0_2px_10px_rgba(0,0,0,0.02)] p-8 space-y-6 border border-slate-100 flex flex-col justify-center">
          <h4 className="text-slate-800 font-bold text-lg">Your Unique Invite Link</h4>
          
          <div className="flex items-center gap-2">
            <div className="flex-1 bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-slate-500 text-sm font-mono truncate">
              {inviteLink}
            </div>
            <button 
              onClick={handleCopy}
              className={`shrink-0 flex items-center justify-center w-12 h-12 rounded-xl transition-all ${
                copied ? 'bg-emerald-100 text-emerald-600' : 'bg-[#eef2fb] text-[#0052cc] hover:bg-[#e0e8f8]'
              }`}
            >
              {copied ? <span className="font-bold text-xs">OK!</span> : <Copy className="w-5 h-5" />}
            </button>
          </div>
          
          <button className="w-full bg-[#111827] hover:bg-[#1f2937] text-white rounded-xl py-3.5 font-bold flex items-center justify-center gap-2 transition-colors">
            <Share2 className="w-4 h-4" /> Share on Social Media
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4">
        <div className="bg-white rounded-[24px] p-6 flex items-center gap-6 shadow-[0_2px_10px_rgba(0,0,0,0.02)] border border-slate-100">
          <div className="w-14 h-14 bg-amber-50 rounded-2xl flex items-center justify-center text-amber-500">
            <Users className="w-6 h-6" />
          </div>
          <div>
            <div className="text-3xl font-black text-slate-800">0</div>
            <div className="text-slate-500 text-sm font-bold uppercase tracking-wider mt-1">Friends Joined</div>
          </div>
        </div>
        <div className="bg-white rounded-[24px] p-6 flex items-center gap-6 shadow-[0_2px_10px_rgba(0,0,0,0.02)] border border-slate-100">
          <div className="w-14 h-14 bg-emerald-50 rounded-2xl flex items-center justify-center text-emerald-500">
            <DollarSign className="w-6 h-6" />
          </div>
          <div>
            <div className="text-3xl font-black text-slate-800">$0.00</div>
            <div className="text-slate-500 text-sm font-bold uppercase tracking-wider mt-1">Total Earned</div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
