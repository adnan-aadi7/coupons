"use client";

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown } from 'lucide-react';

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
    <section className="py-20 lg:py-32 bg-white">
      <div className="max-w-[800px] mx-auto px-4 md:px-8">

        {/* Header */}
        <div className="text-center mb-16">
          <span className="text-[#FF9800] font-black text-[13px] tracking-[2px] uppercase mb-4 block">
            Common Questions
          </span>
          <h2 className="text-[36px] md:text-[48px] font-['Manrope'] font-extrabold text-[#1A1C1C] leading-[1.1] tracking-[-1px] mb-6">
            Frequently Asked Questions
          </h2>
          <p className="text-[18px] font-['Manrope'] text-slate-500 max-w-[600px] mx-auto leading-relaxed">
            Everything you need to know about finding deals and saving money. Can't find the answer you're looking for? Feel free to contact our support team.
          </p>
        </div>

        {/* Accordion */}
        <div className="space-y-4">
          {FAQS.map((faq, index) => {
            const isOpen = openIndex === index;

            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className={`group rounded-2xl border transition-all duration-300 overflow-hidden ${isOpen
                  ? 'border-[#FF9800]/30 bg-orange-50/30'
                  : 'border-slate-200 hover:border-slate-300 bg-white'
                  }`}
              >
                <button
                  onClick={() => setOpenIndex(isOpen ? null : index)}
                  className="w-full flex items-center justify-between p-6 lg:p-8 text-left focus:outline-none"
                >
                  <span className={`font-['Manrope'] font-bold text-[18px] lg:text-[20px] pr-8 transition-colors ${isOpen ? 'text-[#1A1C1C]' : 'text-[#1A1C1C] group-hover:text-[#FF9800]'
                    }`}>
                    {faq.question}
                  </span>
                  <div className={`shrink-0 flex items-center justify-center w-10 h-10 rounded-full transition-transform duration-300 ${isOpen ? 'bg-[#FF9800] text-white rotate-180' : 'bg-slate-50 text-slate-400 group-hover:bg-slate-100'
                    }`}>
                    <ChevronDown className="w-5 h-5" />
                  </div>
                </button>

                <AnimatePresence>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: "easeInOut" }}
                    >
                      <div className="px-6 lg:px-8 pb-6 lg:pb-8 text-slate-600 font-['Manrope'] text-[16px] leading-[28px]">
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
