"use client";

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { Eye, EyeOff, Mail, Lock, Tag, ArrowRight, Loader2, Zap, ShieldCheck } from 'lucide-react';
import { useLoginMutation } from '@/redux/api/authApi';
import { useRouter } from 'next/navigation';

const FLOATING_COUPONS = [
  { label: '50% OFF', top: '15%', left: '8%', delay: 0 },
  { label: 'BOGO', top: '70%', left: '5%', delay: 0.4 },
  { label: '$20 OFF', top: '40%', left: '12%', delay: 0.8 },
  { label: 'FREE', top: '85%', left: '15%', delay: 1.2 },
  { label: '30% OFF', top: '25%', right: '8%', delay: 0.2 },
  { label: 'DEAL', top: '60%', right: '5%', delay: 0.6 },
  { label: '$5 OFF', top: '80%', right: '12%', delay: 1.0 },
];

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [form, setForm] = useState({ email: '', password: '', remember: false });
  const [error, setError] = useState('');
  const router = useRouter();

  const [login, { isLoading }] = useLoginMutation();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    
    if (!form.email || !form.password) {
      setError('Please fill in all fields.');
      return;
    }

    try {
      const res = await login({ email: form.email, password: form.password }).unwrap();
      if (res.success) {
        router.push('/dashboard');
      }
    } catch (err: any) {
      setError(err?.data?.message || 'Login failed. Please check your credentials.');
    }
  };

  return (
    <div className="min-h-screen bg-obsidian text-white flex overflow-hidden relative">

      {/* === Ambient Background === */}
      <div className="fixed inset-0 -z-10 pointer-events-none">
        <div className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-primary/10 blur-[140px] rounded-full" />
        <div className="absolute bottom-0 right-1/4 w-[400px] h-[400px] bg-secondary/10 blur-[120px] rounded-full" />
      </div>

      {/* === Left Branding Panel === */}
      <motion.div
        initial={{ x: -80, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.7, ease: 'easeOut' }}
        className="hidden lg:flex flex-col justify-between w-[48%] min-h-screen p-12 relative"
      >
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 group w-fit">
          <div className="bg-primary/20 p-2 rounded-lg group-hover:bg-primary/30 transition-colors">
            <Tag className="w-6 h-6 text-primary" />
          </div>
          <span className="text-2xl font-bold tracking-tight">
            Coupon<span className="text-primary">Scan</span>
          </span>
        </Link>

        {/* Center Content */}
        <div className="space-y-8 relative">
          {/* Floating coupon badges */}
          {FLOATING_COUPONS.map((c, i) => (
            <motion.div
              key={i}
              style={{ position: 'absolute', top: c.top, left: c.left, right: (c as any).right }}
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1, y: [0, -10, 0] }}
              transition={{ delay: c.delay + 0.5, duration: 3, repeat: Infinity, repeatType: 'loop', ease: 'easeInOut' }}
            >
              <span className="px-3 py-1.5 rounded-full text-[10px] font-extrabold tracking-widest glass text-primary border border-primary/30 shadow-[0_0_12px_rgba(16,185,129,0.15)]">
                {c.label}
              </span>
            </motion.div>
          ))}

          <div className="relative z-10 pl-4">
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="text-5xl font-extrabold leading-tight tracking-tight"
            >
              Scan, Save,<br />
              <span className="text-gradient">Repeat.</span>
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.45 }}
              className="text-gray-400 mt-4 text-lg max-w-sm leading-relaxed"
            >
              Join thousands who save money every day by scanning barcodes and instantly finding the best deals.
            </motion.p>
          </div>

          {/* Stat pills */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="flex flex-wrap gap-4 relative z-10 pl-4"
          >
            {[
              { icon: Zap, label: '10,000+ Stores' },
              { icon: ShieldCheck, label: 'Verified Daily' },
            ].map(({ icon: Icon, label }) => (
              <div key={label} className="flex items-center gap-2 px-4 py-2 glass rounded-full text-sm font-semibold text-gray-300">
                <Icon className="w-4 h-4 text-primary" />
                {label}
              </div>
            ))}
          </motion.div>
        </div>

        {/* Footer */}
        <p className="text-gray-600 text-sm">© 2025 CouponScan. All rights reserved.</p>
      </motion.div>

      {/* === Right Form Panel === */}
      <div className="flex-1 flex items-center justify-center px-6 py-12 lg:py-0">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="w-full max-w-md"
        >
          {/* Mobile Logo */}
          <Link href="/" className="flex lg:hidden items-center gap-2 mb-8">
            <div className="bg-primary/20 p-2 rounded-lg">
              <Tag className="w-5 h-5 text-primary" />
            </div>
            <span className="text-xl font-bold">Coupon<span className="text-primary">Scan</span></span>
          </Link>

          <div className="glass p-8 md:p-10 space-y-6">
            {/* Heading */}
            <div>
              <motion.h2
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.35 }}
                className="text-3xl font-extrabold"
              >
                Welcome back
              </motion.h2>
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.45 }}
                className="text-gray-400 mt-1"
              >
                Sign in to your CouponScan account
              </motion.p>
            </div>

            {/* Error */}
            <AnimatePresence>
              {error && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className="bg-red-500/10 border border-red-500/30 text-red-400 text-sm px-4 py-3 rounded-xl"
                >
                  {error}
                </motion.div>
              )}
            </AnimatePresence>

            <form onSubmit={handleSubmit} className="space-y-5">
              {/* Email */}
              <div className="space-y-1.5">
                <label className="text-sm font-semibold text-gray-300">Email address</label>
                <div className="relative">
                  <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                  <input
                    type="email"
                    placeholder="you@email.com"
                    value={form.email}
                    onChange={e => setForm(f => ({ ...f, email: e.target.value }))}
                    className="w-full bg-white/5 border border-white/10 focus:border-primary/60 focus:ring-2 focus:ring-primary/20 rounded-xl pl-10 pr-4 py-3 text-sm outline-none transition-all placeholder:text-gray-600"
                  />
                </div>
              </div>

              {/* Password */}
              <div className="space-y-1.5">
                <div className="flex items-center justify-between">
                  <label className="text-sm font-semibold text-gray-300">Password</label>
                  <Link href="/forgot-password" className="text-xs text-primary hover:underline font-medium">
                    Forgot password?
                  </Link>
                </div>
                <div className="relative">
                  <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    placeholder="••••••••"
                    value={form.password}
                    onChange={e => setForm(f => ({ ...f, password: e.target.value }))}
                    className="w-full bg-white/5 border border-white/10 focus:border-primary/60 focus:ring-2 focus:ring-primary/20 rounded-xl pl-10 pr-11 py-3 text-sm outline-none transition-all placeholder:text-gray-600"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(v => !v)}
                    className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-300 transition-colors"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              {/* Remember me */}
              <label className="flex items-center gap-2.5 cursor-pointer select-none">
                <div
                  onClick={() => setForm(f => ({ ...f, remember: !f.remember }))}
                  className={`w-5 h-5 rounded-md border flex items-center justify-center transition-all shrink-0 ${form.remember ? 'bg-primary border-primary' : 'border-white/20 bg-white/5'}`}
                >
                  {form.remember && (
                    <motion.svg initial={{ scale: 0 }} animate={{ scale: 1 }} viewBox="0 0 12 10" className="w-3 h-3 fill-obsidian">
                      <path d="M1 5l3 3 7-7" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" />
                    </motion.svg>
                  )}
                </div>
                <span className="text-sm text-gray-400">Remember me for 30 days</span>
              </label>

              {/* Submit */}
              <motion.button
                whileHover={{ scale: isLoading ? 1 : 1.02 }}
                whileTap={{ scale: isLoading ? 1 : 0.98 }}
                type="submit"
                disabled={isLoading}
                className="w-full flex items-center justify-center gap-2 bg-primary hover:bg-primary/90 text-obsidian font-bold py-3.5 rounded-xl transition-all shadow-[0_0_20px_rgba(16,185,129,0.3)] disabled:opacity-70 disabled:cursor-not-allowed"
              >
                {isLoading ? (
                  <Loader2 className="w-5 h-5 animate-spin" />
                ) : (
                  <>
                    Sign In <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </motion.button>
            </form>

            {/* Divider */}
            <div className="flex items-center gap-3">
              <div className="flex-1 h-px bg-white/10" />
              <span className="text-gray-500 text-xs font-medium">or continue with</span>
              <div className="flex-1 h-px bg-white/10" />
            </div>

            {/* Social Buttons */}
            <div className="grid grid-cols-2 gap-3">
              {[
                { label: 'Google', icon: '🔵' },
                { label: 'GitHub', icon: '⚫' },
              ].map(p => (
                <motion.button
                  key={p.label}
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  className="flex items-center justify-center gap-2 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl py-3 text-sm font-semibold transition-all"
                >
                  <span>{p.icon}</span> {p.label}
                </motion.button>
              ))}
            </div>

            {/* Signup Link */}
            <p className="text-center text-sm text-gray-400">
              Don't have an account?{' '}
              <Link href="/signup" className="text-primary font-semibold hover:underline">
                Create one free
              </Link>
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
