"use client";

import { motion } from 'framer-motion';
import { Layers, Tag, Utensils, Shirt, Laptop, Home, Baby, Pill, Car, Gamepad2, ArrowRight } from 'lucide-react';
import Link from 'next/link';

const CATEGORIES = [
  { name: 'Food & Grocery', icon: Utensils, color: 'text-green-600', bg: 'bg-green-500/10', count: '2.4k+ deals' },
  { name: 'Fashion', icon: Shirt, color: 'text-pink-600', bg: 'bg-pink-500/10', count: '1.8k+ deals' },
  { name: 'Electronics', icon: Laptop, color: 'text-blue-600', bg: 'bg-blue-500/10', count: '940+ deals' },
  { name: 'Home & Garden', icon: Home, color: 'text-yellow-600', bg: 'bg-yellow-500/10', count: '1.2k+ deals' },
  { name: 'Baby & Kids', icon: Baby, color: 'text-purple-600', bg: 'bg-purple-500/10', count: '760+ deals' },
  { name: 'Health', icon: Pill, color: 'text-red-600', bg: 'bg-red-500/10', count: '430+ deals' },
  { name: 'Automotive', icon: Car, color: 'text-orange-600', bg: 'bg-orange-500/10', count: '210+ deals' },
  { name: 'Gaming', icon: Gamepad2, color: 'text-indigo-600', bg: 'bg-indigo-500/10', count: '380+ deals' },
];

export default function CategoriesPage() {
  return (
    <div className="bg-background min-h-screen">
      {/* Hero */}
      <section className="relative pt-16 pb-12 px-4">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-emerald-500/5 -z-10 rounded-full blur-[120px]" />
        
        <div className="max-w-6xl mx-auto text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-[10px] font-black text-primary uppercase tracking-[0.2em] mb-8">
              <Layers className="w-4 h-4" />
              <span>Browse by Department</span>
            </div>
            <h1 className="text-4xl md:text-7xl font-black tracking-tighter text-foreground mb-6 leading-tight">
              Organized for your <br />
              <span className="text-primary italic">Shopping Needs.</span>
            </h1>
            <p className="max-w-xl mx-auto text-lg font-bold text-white/40">
              Find the perfect code by exploring our curated categories. Updated 24/7 with the latest brand savings.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Category Grid */}
      <section className="max-w-7xl mx-auto px-4 md:px-6 pb-24">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {CATEGORIES.map((cat, idx) => {
            const Icon = cat.icon;
            return (
              <motion.div
                key={cat.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.05 }}
              >
                <Link href={`/deals?category=${encodeURIComponent(cat.name)}`} className="group block h-full">
                  <div className="h-full bg-white/5 border border-white/5 rounded-3xl p-8 hover:shadow-2xl hover:shadow-primary/5 transition-all duration-500 relative overflow-hidden">
                    <div className={`w-14 h-14 ${cat.bg} rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-500`}>
                      <Icon className={`w-7 h-7 ${cat.color}`} />
                    </div>
                    
                    <div className="flex-grow">
                      <h3 className="text-xl font-black text-foreground group-hover:text-primary transition-colors mb-2">{cat.name}</h3>
                      <div className="flex items-center gap-1.5">
                        <Tag className="w-3.5 h-3.5 text-white/20" />
                        <span className="text-[11px] text-white/40 font-black uppercase tracking-widest">{cat.count}</span>
                      </div>
                    </div>

                    <div className="mt-8 flex items-center gap-2 text-xs font-black uppercase tracking-widest text-primary opacity-0 group-hover:opacity-100 -translate-x-4 group-hover:translate-x-0 transition-all duration-300">
                      Browse Deals <ArrowRight className="w-4 h-4" />
                    </div>
                  </div>
                </Link>
              </motion.div>
            );
          })}
        </div>
      </section>

      {/* CTA Footer */}
      <section className="max-w-7xl mx-auto px-4 md:px-6 pb-24">
        <div className="bg-primary/10 border border-primary/20 rounded-3xl p-12 text-center text-foreground relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-primary/20 blur-[100px] -z-0" />
          <div className="relative z-10">
            <h2 className="text-3xl font-black mb-4">Don't see your favorite category?</h2>
            <p className="text-white/60 font-bold mb-8">Search for specific stores using the search bar in the header.</p>
            <div className="flex justify-center gap-4">
              <Link href="/">
                <button className="bg-primary text-white px-8 py-4 rounded-full font-black text-xs uppercase tracking-widest hover:bg-emerald-400 transition-all shadow-xl shadow-primary/20">
                  Back to Home
                </button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
