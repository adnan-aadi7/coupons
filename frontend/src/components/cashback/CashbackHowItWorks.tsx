"use client";

import { ShoppingBag, CreditCard, Banknote } from 'lucide-react';
import { motion } from 'framer-motion';

const STEPS = [
  {
    icon: ShoppingBag,
    title: "Shop via SmartSaver",
    desc: "Click on your favorite store's cashback link and shop as you normally would.",
    color: "bg-orange-500"
  },
  {
    icon: CreditCard,
    title: "Store Pays Commission",
    desc: "After you buy, the store pays us a commission for sending you their way.",
    color: "bg-blue-500"
  },
  {
    icon: Banknote,
    title: "You Get Paid Cash",
    desc: "We share that commission with you. Transfer it to your bank or PayPal.",
    color: "bg-emerald-500"
  }
];

export default function CashbackHowItWorks() {
  return (
    <div className="py-24">
      <div className="text-center mb-16 space-y-4">
        <h2 className="text-[13px] font-black text-emerald-500 uppercase tracking-[0.3em]">The Process</h2>
        <h3 className="text-4xl md:text-5xl font-black text-[#1A1C1C]">How it Works.</h3>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {STEPS.map((step, i) => (
          <motion.div 
            key={i}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1 }}
            className="bg-white rounded-[40px] p-10 border border-slate-100 shadow-sm hover:shadow-xl transition-all group"
          >
            <div className={`w-16 h-16 ${step.color} rounded-2xl flex items-center justify-center text-white shadow-lg mb-8 transform group-hover:scale-110 transition-transform`}>
              <step.icon className="w-8 h-8" />
            </div>
            <div className="space-y-4">
              <h4 className="text-2xl font-black text-[#1A1C1C] leading-tight">{step.title}</h4>
              <p className="text-slate-400 font-medium leading-relaxed">{step.desc}</p>
            </div>
            
            {/* Step Number */}
            <div className="mt-8 text-[48px] font-black text-slate-50 opacity-0 group-hover:opacity-100 transition-opacity">
              0{i + 1}
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
