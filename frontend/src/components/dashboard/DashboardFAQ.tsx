"use client";

import { motion } from 'framer-motion';
import { useState } from 'react';
import { Plus, X } from 'lucide-react';

const FAQS = [
  {
    q: "How does cashback tracking work?",
    a: "When you click on a store link from Coupons Mart, we use affiliate tracking cookies to monitor your purchase. Once the store confirms the purchase, the cashback is credited to your pending balance."
  },
  {
    q: "Why is my cashback taking so long to confirm?",
    a: "Stores usually wait until their return period has expired before confirming the cashback to ensure the purchase wasn't returned or cancelled. This can take anywhere from 30 to 90 days."
  },
  {
    q: "How do I withdraw my earnings?",
    a: "Once your confirmed cashback balance reaches the minimum threshold ($20), you can request a withdrawal via PayPal from the 'Payments' section."
  },
  {
    q: "Can I use ad-blockers?",
    a: "No. Ad-blockers prevent tracking cookies from being placed on your browser, which means the store won't know you came from us, and you won't receive cashback. Please disable them while shopping."
  }
];

export default function DashboardFAQ() {
  const [openIdx, setOpenIdx] = useState<number | null>(0);

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="w-full space-y-8"
    >
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <h2 className="text-[32px] font-medium tracking-tight text-[#111827] font-serif" style={{ fontFamily: 'Georgia, serif' }}>
          Frequently Asked Questions
        </h2>
      </div>

      <div className="bg-white rounded-[24px] shadow-[0_2px_10px_rgba(0,0,0,0.02)] p-6 md:p-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Custom Generated 3D Support Illustration */}
          <div className="hidden lg:flex lg:col-span-5 flex-col items-center justify-center p-8 bg-slate-50/50 rounded-3xl border border-slate-100/60 shadow-sm relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-[#FF9800]/10 to-transparent rounded-full blur-xl" />
            <div className="absolute bottom-0 left-0 w-32 h-32 bg-gradient-to-tr from-blue-50/20 to-transparent rounded-full blur-2xl" />
            
            <div className="relative w-full flex items-center justify-center">
              <img 
                src="/faq_illustration.png" 
                alt="FAQ Assistance Illustration" 
                className="w-full max-w-[260px] object-contain drop-shadow-2xl transform group-hover:scale-105 transition-transform duration-500 ease-out"
              />
            </div>
            
            <div className="mt-8 text-center relative z-10">
              <h3 className="font-bold text-slate-800 text-[17px]">Need Instant Support?</h3>
              <p className="text-slate-400 text-xs mt-2 max-w-[240px] mx-auto leading-relaxed">
                Our support agents are always online to guide you with any cashback tracking, store claims, or payment issues.
              </p>
            </div>
          </div>

          {/* Right Column: FAQ Accordion Stack */}
          <div className="lg:col-span-7 space-y-4">
            {FAQS.map((faq, idx) => {
              const isOpen = openIdx === idx;
              return (
                <div 
                  key={idx} 
                  className={`border border-slate-100 rounded-2xl overflow-hidden transition-all duration-300 ${
                    isOpen ? 'bg-[#f8fafd] border-[#FF9800]/20 shadow-sm' : 'hover:bg-slate-50 hover:border-slate-200/60'
                  }`}
                >
                  <button
                    onClick={() => setOpenIdx(isOpen ? null : idx)}
                    className="w-full flex items-center justify-between p-5 md:p-6 text-left"
                  >
                    <h3 className="font-bold text-[#111827] pr-6 text-[14.5px] leading-snug">{faq.q}</h3>
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 transition-transform duration-300 ${isOpen ? 'bg-[#FF9800] text-white rotate-90' : 'bg-slate-100 text-slate-500'}`}>
                      {isOpen ? <X className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
                    </div>
                  </button>
                  <motion.div
                    initial={false}
                    animate={{ height: isOpen ? 'auto' : 0, opacity: isOpen ? 1 : 0 }}
                    className="overflow-hidden"
                  >
                    <div className="px-6 pb-6 text-slate-600 text-[13px] leading-relaxed border-t border-slate-100 pt-4 mt-2 mx-6">
                      {faq.a}
                    </div>
                  </motion.div>
                </div>
              );
            })}
          </div>

        </div>

        {/* Support CTA Banner */}
        <div className="mt-8 text-center bg-blue-50/50 rounded-2xl p-6 border border-blue-100">
          <p className="font-medium text-slate-700 text-sm mb-4">Still need help? Our support team is here for you.</p>
          <button className="bg-[#0052cc] hover:bg-[#003d99] text-white px-8 py-2.5 rounded-[24px] text-[14px] font-bold transition-all shadow-sm">
            Contact Support
          </button>
        </div>
      </div>
    </motion.div>
  );
}
