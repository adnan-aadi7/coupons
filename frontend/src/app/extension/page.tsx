"use client";

import { motion } from 'framer-motion';
import { Tag, Zap, ShieldCheck, Download, CursorClick, CheckCircle2, Layout, Search, Sparkles } from 'lucide-react';
import Link from 'next/link';
import Navbar from '@/components/layout/Navbar';
import GlassContainer from '@/components/ui/GlassContainer';

export default function ExtensionPage() {
  const features = [
    {
      icon: Search,
      title: 'Auto-Detect',
      desc: 'Our extension automatically detects when you are on a checkout page of your favorite store.'
    },
    {
      icon: Zap,
      title: 'Auto-Apply',
      desc: 'With one click, we test every available coupon and apply the single best discount to your cart.'
    },
    {
      icon: ShieldCheck,
      title: 'Cashback Alerts',
      desc: 'Never miss a rewards opportunity. Get a popup to activate cashback before you pay.'
    }
  ];

  return (
    <main className="min-h-screen bg-obsidian text-white overflow-hidden pb-32">
      <Navbar />

      {/* Hero Section */}
      <section className="relative pt-40 pb-20 px-4">
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-primary/10 blur-[140px] -z-10 rounded-full" />
        <div className="max-w-6xl mx-auto flex flex-col lg:flex-row items-center gap-16">
          
          <div className="flex-1 text-center lg:text-left space-y-8">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-[10px] font-black uppercase tracking-[0.2em] text-primary mb-6">
                <Sparkles className="w-4 h-4" />
                <span>The Magic of SmartSaver</span>
              </div>
              <h1 className="text-5xl md:text-7xl font-black tracking-tighter mb-6 leading-[1.1]">
                Save More in <br />
                <span className="text-primary italic">Zero Seconds.</span>
              </h1>
              <p className="text-white/40 text-lg md:text-xl font-bold leading-relaxed max-w-xl">
                Add the SmartSaver extension to your browser and let it work its magic. We test all available coupons and apply the best one to your cart automatically.
              </p>
            </motion.div>

            <div className="flex flex-col sm:flex-row items-center gap-4">
              <motion.button 
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="w-full sm:w-auto bg-primary text-obsidian px-10 py-5 rounded-3xl font-black text-sm uppercase tracking-widest transition-all shadow-xl shadow-primary/20 flex items-center justify-center gap-3"
              >
                <Download className="w-5 h-5" />
                Add to Browser — It's Free
              </motion.button>
              <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-white/20">
                <CheckCircle2 className="w-4 h-4 text-primary" />
                Available on Chrome, Edge & Safari
              </div>
            </div>
          </div>

          <div className="flex-1 relative">
            <motion.div 
              initial={{ opacity: 0, rotate: 10, y: 40 }}
              animate={{ opacity: 1, rotate: 0, y: 0 }}
              className="relative z-10"
            >
              {/* Simulated Browser UI */}
              <div className="bg-background/80 backdrop-blur-2xl border border-white/10 rounded-[32px] p-8 shadow-[0_40px_100px_rgba(0,0,0,0.5)] border-t-white/20 relative">
                <div className="flex items-center gap-2 mb-6 border-b border-white/5 pb-4">
                  <div className="flex gap-1.5">
                    <div className="w-3 h-3 rounded-full bg-red-500/50" />
                    <div className="w-3 h-3 rounded-full bg-yellow-500/50" />
                    <div className="w-3 h-3 rounded-full bg-green-500/50" />
                  </div>
                  <div className="flex-1 bg-white/5 h-6 rounded-lg ml-4" />
                </div>
                
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="text-sm font-bold text-white/60 uppercase tracking-widest">Order Total</div>
                    <div className="text-2xl font-black text-foreground">$149.00</div>
                  </div>
                  
                  {/* Extension Popup Simulation */}
                  <motion.div 
                    initial={{ x: 20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: 0.8 }}
                    className="bg-primary text-obsidian p-6 rounded-2xl shadow-xl shadow-primary/20 relative overflow-hidden"
                  >
                    <div className="absolute top-0 right-0 w-24 h-24 bg-white/20 blur-3xl -translate-y-1/2 translate-x-1/2" />
                    <div className="flex items-center gap-3 mb-2">
                      <Zap className="w-5 h-5 fill-obsidian" />
                      <span className="font-black text-xs uppercase tracking-widest">SMARTSAVER ACTIVE</span>
                    </div>
                    <div className="text-xl font-black">Success! -$30.00 Applied</div>
                    <div className="text-[10px] font-bold opacity-70 mt-1">Found the best code: "SAVE30"</div>
                  </motion.div>
                </div>
              </div>

              {/* Decorative Pointers */}
              <motion.div 
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 3, repeat: Infinity }}
                className="absolute -top-12 -right-8 glass p-4 rounded-2xl shadow-2xl skew-x-12"
              >
                <div className="flex items-center gap-3">
                  <CursorClick className="w-6 h-6 text-primary" />
                  <div className="text-[10px] font-black uppercase text-white/60">One Click Savings</div>
                </div>
              </motion.div>
            </motion.div>
          </div>

        </div>
      </section>

      {/* Features Grid */}
      <section className="max-w-6xl mx-auto px-4 py-24">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.map((f, i) => (
            <motion.div 
              key={f.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
            >
              <GlassContainer className="p-8 h-full space-y-4 hover:border-primary/30 transition-all group">
                <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                  <f.icon className="w-6 h-6 text-primary" />
                </div>
                <h3 className="text-xl font-black text-foreground uppercase tracking-tight">{f.title}</h3>
                <p className="text-white/40 text-sm font-bold leading-relaxed">{f.desc}</p>
              </GlassContainer>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Social Proof */}
      <section className="max-w-4xl mx-auto px-4 text-center">
        <div className="space-y-4">
          <div className="flex justify-center -space-x-4 mb-4">
            {[1,2,3,4,5].map(i => (
              <div key={i} className="w-12 h-12 rounded-full border-4 border-obsidian bg-slate-200" />
            ))}
          </div>
          <h2 className="text-2xl font-black text-foreground">Everything we offer is completely free.</h2>
          <p className="text-white/40 text-sm font-bold max-w-xl mx-auto leading-loose">
            Our team is committed to verifying every deal so you save on all orders. Select the retailer you’d like to shop at and watch the SmartSaver magic happen.
          </p>
        </div>
      </section>

    </main>
  );
}
