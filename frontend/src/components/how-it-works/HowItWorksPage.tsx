import { motion } from 'framer-motion';
import { Tag, Sparkles, Smartphone, ShieldCheck, Zap, ArrowRight, MousePointer2 } from 'lucide-react';
import Link from 'next/link';
import Navbar from '@/components/layout/Navbar';
import GlassContainer from '@/components/ui/GlassContainer';

/**
 * HowItWorksPage - Coupons.com Edition
 * ------------------------------------
 * High-end presentation of the SmartSaver ecosystem.
 */
const SAVINGS_PILLARS = [
  {
    icon: MousePointer2,
    title: 'Online Coupons',
    desc: 'Select the retailer you’d like to shop at and click on the offer that looks best to you. Sitewide codes, free shipping, and seasonal sales are all at your fingertips.',
    color: 'text-primary',
    bg: 'bg-primary/10',
    type: 'FREE FOR ALL'
  },
  {
    icon: Sparkles,
    title: 'Cashback Rewards',
    desc: 'Get rewarded every time you shop with us. Activate your cashback before you check out, and we’ll share the commission we secure from retailers directly with you.',
    color: 'text-emerald-400',
    bg: 'bg-emerald-400/10',
    type: 'ACCOUNT REQUIRED'
  },
  {
    icon: Smartphone,
    title: 'In-Store & Groceries',
    desc: 'Provide your phone number and we’ll text you offer details, including a QR code to show the cashier. smarter shopping decisions made easy at the register.',
    color: 'text-blue-400',
    bg: 'bg-blue-400/10',
    type: 'PHONE VERIFIED'
  },
];

export default function HowItWorksPage() {
  return (
    <main className="min-h-screen bg-obsidian text-white overflow-hidden pb-24">
      <Navbar />

      {/* Hero Section */}
      <section className="relative pt-40 pb-20 px-4">
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-primary/10 blur-[140px] -z-10 rounded-full" />
        <div className="max-w-4xl mx-auto text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/5 border border-white/10 text-[10px] font-black uppercase tracking-[0.2em] text-primary mb-8">
              <ShieldCheck className="w-4 h-4" />
              <span>100% Free Savings Destination</span>
            </div>
            <h1 className="text-5xl md:text-8xl font-black tracking-tighter mb-6 leading-[0.9]">
              Smart Saver: <br />
              <span className="text-gradient">Universal Savings.</span>
            </h1>
            <p className="text-white/40 text-lg md:text-xl max-w-2xl mx-auto font-bold leading-relaxed mb-10">
              Your go-to destination for all things savings. We provide shoppers with the best ways to save, from digital promo codes to instant cashback.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Savings Pillars */}
      <section className="max-w-7xl mx-auto px-4 mb-32">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {SAVINGS_PILLARS.map((pillar, idx) => {
            const Icon = pillar.icon;
            return (
              <motion.div
                key={pillar.title}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.15 }}
              >
                <div className="group bg-white/5 border border-white/10 p-8 rounded-[40px] h-full hover:bg-white/10 transition-all hover:border-primary/20 relative overflow-hidden">
                  <div className={`absolute top-0 right-0 w-24 h-24 ${pillar.bg} blur-3xl opacity-50 group-hover:opacity-100 transition-opacity`} />
                  
                  <div className={`w-14 h-14 ${pillar.bg} rounded-2xl flex items-center justify-center mb-6`}>
                    <Icon className={`w-7 h-7 ${pillar.color}`} />
                  </div>
                  
                  <div className="text-[10px] font-black tracking-widest text-primary mb-2">{pillar.type}</div>
                  <h3 className="text-2xl font-black mb-4 text-foreground tracking-tight">{pillar.title}</h3>
                  <p className="text-white/40 text-sm leading-relaxed font-bold mb-6 italic">
                    "{pillar.desc}"
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </section>

      {/* Core Philosophy Section */}
      <section className="max-w-5xl mx-auto px-4 mb-32">
        <GlassContainer className="p-12 md:p-20 relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-full bg-primary/5 pointer-events-none" />
          <div className="relative z-10 grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-black mb-6 tracking-tight">Smart Decisions, <br/>Biggest Savings.</h2>
              <div className="space-y-4 text-white/50 text-sm font-bold leading-loose">
                <p>Everything we offer on Smart Saver is completely free. We partner with thousands of your favorite retailers who pay us a commission that we then share directly with you.</p>
                <p>Registering is easy! All you need to do is click on the “Sign Up” button, enter your email, and create a password. Once you're in, activate your cashback before you check out and watch your balance grow.</p>
              </div>
            </div>
            <div className="bg-background/50 border border-white/10 p-8 rounded-3xl space-y-6 shadow-2xl">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center shrink-0">
                  <Tag className="w-5 h-5 text-obsidian" />
                </div>
                <div className="text-sm font-black">Online & In-Store Coupons</div>
              </div>
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 bg-emerald-500 rounded-full flex items-center justify-center shrink-0">
                  <Sparkles className="w-5 h-5 text-obsidian" />
                </div>
                <div className="text-sm font-black">Cashback Rewards</div>
              </div>
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center shrink-0">
                  <Zap className="w-5 h-5 text-obsidian" />
                </div>
                <div className="text-sm font-black">Auto-Apply Extension</div>
              </div>
            </div>
          </div>
        </GlassContainer>
      </section>

      {/* Final CTA */}
      <section className="max-w-4xl mx-auto px-4 text-center">
        <h2 className="text-4xl font-black mb-6 tracking-tight">Ready to Start Saving?</h2>
        <p className="text-white/40 font-bold mb-10 text-lg">Join 40,000+ shoppers making smarter decisions every time they check out.</p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            href="/signup"
            className="w-full sm:w-auto bg-primary hover:bg-emerald-400 text-obsidian px-10 py-5 rounded-2xl font-black text-sm uppercase tracking-widest transition-all shadow-xl shadow-primary/20"
          >
            Create Free Account
          </Link>
          <Link
            href="/"
            className="w-full sm:w-auto bg-white/5 hover:bg-white/10 text-white px-10 py-5 rounded-2xl font-black text-sm uppercase tracking-widest border border-white/10 transition-all"
          >
            Browse Today's Deals
          </Link>
        </div>
      </section>
    </main>
  );
}
