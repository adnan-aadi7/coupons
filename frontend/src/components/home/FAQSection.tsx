"use client";

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus } from 'lucide-react';

const FAQS = [
  {
    question: "How do I use digital coupons from the site?",
    answer: "Simply find a deal you like, click 'Get Deal' or 'Show Code', and we will automatically redirect you to the store. If it's a code, we'll copy it to your clipboard so you can paste it during checkout."
  },
  {
    question: "Are the coupons and promo codes free to use?",
    answer: "Yes! All our coupons, promo codes, and cash back offers are 100% free to use. We earn a small commission from our partner stores when you make a purchase using our links, which helps us keep the site running."
  },
  {
    question: "How often are new coupons added?",
    answer: "Our team updates deals daily. We constantly monitor thousands of stores to bring you the latest verified promo codes, sales, and exclusive offers."
  },
  {
    question: "What does the 'Verified' badge mean?",
    answer: "A 'Verified' badge means our team or community members have recently tested the promo code or deal and confirmed it works as described. We pride ourselves on having highly accurate and working coupons."
  },
  {
    question: "Can I use multiple promo codes on one order?",
    answer: "Store policies vary. Some retailers allow you to 'stack' coupons (use more than one), while others limit you to one promo code per order. Check the specific store's policy at checkout."
  }
];

export default function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section className="py-24 lg:py-32 bg-[#F8F9FA] relative overflow-hidden">
      {/* Background Decoration */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#FF9800]/5 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-blue-500/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-[800px] mx-auto px-6 md:px-8 relative z-10">

        {/* Header */}
        <div className="text-center mb-16 space-y-4">
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#FF9800]/10 border border-[#FF9800]/20"
          >
            <span className="w-2 h-2 rounded-full bg-[#FF9800] animate-pulse" />
            <span className="text-[#FF9800] font-black text-[11px] tracking-[2px] uppercase">
              Support Center
            </span>
          </motion.div>
          <motion.h2 
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-[40px] md:text-[56px] font-['Manrope'] font-black text-[#1A1C1C] leading-[1.1] tracking-tight"
          >
            Got Questions?
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-[18px] font-['Manrope'] text-slate-500 max-w-[600px] mx-auto leading-relaxed font-medium"
          >
            Everything you need to know about finding deals, claiming cashback, and saving money on your everyday purchases.
          </motion.p>
        </div>

        {/* Accordion */}
        <div className="space-y-4">
          {FAQS.map((faq, index) => {
            const isOpen = openIndex === index;

            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.4 }}
                className={`group relative rounded-[32px] transition-all duration-500 overflow-hidden bg-white ${isOpen
                  ? 'shadow-2xl shadow-slate-200/50 border-transparent'
                  : 'shadow-sm border border-slate-100 hover:shadow-xl hover:shadow-slate-200/40 hover:border-slate-200'
                  }`}
              >
                {/* Active Indicator Line */}
                <div 
                  className={`absolute left-0 top-0 bottom-0 w-1.5 bg-[#FF9800] transition-transform duration-500 origin-top ${
                    isOpen ? 'scale-y-100' : 'scale-y-0'
                  }`}
                />

                <button
                  onClick={() => setOpenIndex(isOpen ? null : index)}
                  className="w-full flex items-center justify-between p-6 lg:px-10 lg:py-8 text-left focus:outline-none"
                >
                  <span className={`font-['Manrope'] font-black text-[18px] lg:text-[22px] pr-8 transition-colors duration-300 tracking-tight ${
                    isOpen ? 'text-[#FF9800]' : 'text-[#1A1C1C] group-hover:text-[#FF9800]'
                  }`}>
                    {faq.question}
                  </span>
                  
                  <div className={`shrink-0 flex items-center justify-center w-12 h-12 rounded-full transition-all duration-500 ${
                    isOpen 
                      ? 'bg-[#FF9800]/10 text-[#FF9800] rotate-45' 
                      : 'bg-slate-50 text-slate-400 group-hover:bg-orange-50 group-hover:text-[#FF9800]'
                  }`}>
                    <Plus className="w-6 h-6 stroke-[3]" />
                  </div>
                </button>

                <AnimatePresence>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.4, ease: [0.04, 0.62, 0.23, 0.98] }}
                    >
                      <div className="px-6 lg:px-10 pb-8 lg:pb-10 pt-2 text-slate-500 font-['Manrope'] font-medium text-[16px] lg:text-[18px] leading-relaxed">
                        {faq.answer}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
