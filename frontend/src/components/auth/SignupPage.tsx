"use client";

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { Eye, EyeOff, Mail, Lock, User, Tag, ArrowRight, Loader2, Zap, BadgeCheck, TrendingUp } from 'lucide-react';
import { useRegisterMutation } from '@/redux/api/authApi';
import { useRouter } from 'next/navigation';

const STEPS = ['Account', 'Details', 'Done'];

const PERKS = [
  { icon: Zap, text: 'Instant barcode scanning' },
  { icon: TrendingUp, text: 'Personalised deal alerts' },
  { icon: BadgeCheck, text: 'Verified coupons only' },
];

export default function SignupPage() {
  const [step, setStep] = useState(0); // 0 = credentials, 1 = profile
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [agreed, setAgreed] = useState(false);
  const [error, setError] = useState('');
  const [form, setForm] = useState({
    name: '', email: '', password: '', confirm: '',
  });

  const router = useRouter();
  const [register, { isLoading }] = useRegisterMutation();

  const handleContinue = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    if (!form.email || !form.password) { setError('Please fill in your email and password.'); return; }
    if (form.password.length < 8) { setError('Password must be at least 8 characters.'); return; }
    setStep(1);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    if (!form.name) { setError('Please enter your name.'); return; }
    if (form.password !== form.confirm) { setError('Passwords do not match.'); return; }
    if (!agreed) { setError('Please accept the terms to continue.'); return; }

    try {
      const res = await register({
        name: form.name,
        email: form.email,
        password: form.password,
      }).unwrap();

      if (res.success) {
        setStep(2);
      }
    } catch (err: any) {
      setError(err?.data?.message || 'Registration failed. Please try again.');
    }
  };

  return (
    <div className="min-h-screen bg-obsidian text-white flex overflow-hidden relative">

      {/* Ambient blobs */}
      <div className="fixed inset-0 -z-10 pointer-events-none">
        <div className="absolute top-0 right-1/4 w-[600px] h-[600px] bg-primary/10 blur-[140px] rounded-full" />
        <div className="absolute bottom-0 left-1/3 w-[350px] h-[350px] bg-secondary/10 blur-[120px] rounded-full" />
      </div>

      {/* === Left Branding Panel === */}
      <motion.div
        initial={{ x: -80, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.7, ease: 'easeOut' }}
        className="hidden lg:flex flex-col justify-between w-[44%] min-h-screen p-12 relative overflow-hidden"
      >
        {/* Animated rings */}
        {[1, 2, 3].map(i => (
          <motion.div
            key={i}
            className="absolute rounded-full border border-primary/10"
            style={{ width: i * 250, height: i * 250, top: '50%', left: '50%', x: '-50%', y: '-50%' }}
            animate={{ rotate: i % 2 === 0 ? 360 : -360, scale: [1, 1.04, 1] }}
            transition={{ duration: 20 + i * 8, repeat: Infinity, ease: 'linear' }}
          />
        ))}

        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 group w-fit relative z-10">
          <div className="bg-primary/20 p-2 rounded-lg group-hover:bg-primary/30 transition-colors">
            <Tag className="w-6 h-6 text-primary" />
          </div>
          <span className="text-2xl font-bold tracking-tight">
            Coupon<span className="text-primary">Scan</span>
          </span>
        </Link>

        {/* Center */}
        <div className="relative z-10 space-y-8">
          <div>
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="text-5xl font-extrabold leading-tight"
            >
              Start Saving<br />
              <span className="text-gradient">Today. Free.</span>
            </motion.h1>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.45 }}
              className="text-gray-400 mt-4 text-lg max-w-sm leading-relaxed"
            >
              Create a free account and get instant access to thousands of verified deals across 10,000+ stores.
            </motion.p>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="space-y-3"
          >
            {PERKS.map(({ icon: Icon, text }) => (
              <div key={text} className="flex items-center gap-3 text-gray-300">
                <div className="w-8 h-8 bg-primary/15 rounded-lg flex items-center justify-center shrink-0">
                  <Icon className="w-4 h-4 text-primary" />
                </div>
                <span className="text-sm font-medium">{text}</span>
              </div>
            ))}
          </motion.div>
        </div>

        <p className="text-gray-600 text-sm relative z-10">© 2025 CouponScan. All rights reserved.</p>
      </motion.div>

      {/* === Right Form Panel === */}
      <div className="flex-1 flex items-center justify-center px-6 py-12">
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

            {/* Progress Steps */}
            <div className="flex items-center gap-2">
              {STEPS.map((s, i) => (
                <div key={s} className="flex items-center gap-2 flex-1 last:flex-none">
                  <div className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold shrink-0 transition-all duration-300 ${i < step ? 'bg-primary text-obsidian' :
                      i === step ? 'bg-primary/20 text-primary border border-primary' :
                        'bg-white/5 text-gray-600 border border-white/10'
                    }`}>
                    {i < step ? '✓' : i + 1}
                  </div>
                  <span className={`text-xs font-semibold ${i === step ? 'text-white' : 'text-gray-500'}`}>{s}</span>
                  {i < STEPS.length - 1 && (
                    <div className={`flex-1 h-px transition-all duration-500 ${i < step ? 'bg-primary' : 'bg-white/10'}`} />
                  )}
                </div>
              ))}
            </div>

            <AnimatePresence mode="wait">

              {/* === Step 0: Credentials === */}
              {step === 0 && (
                <motion.div key="step0" initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -30 }} className="space-y-5">
                  <div>
                    <h2 className="text-3xl font-extrabold">Create account</h2>
                    <p className="text-gray-400 mt-1">Start with your email and password</p>
                  </div>

                  <AnimatePresence>
                    {error && (
                      <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }}
                        className="bg-red-500/10 border border-red-500/30 text-red-400 text-sm px-4 py-3 rounded-xl">
                        {error}
                      </motion.div>
                    )}
                  </AnimatePresence>

                  <form onSubmit={handleContinue} className="space-y-4">
                    <div className="space-y-1.5">
                      <label className="text-sm font-semibold text-gray-300">Email address</label>
                      <div className="relative">
                        <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                        <input type="email" placeholder="you@email.com" value={form.email}
                          onChange={e => setForm(f => ({ ...f, email: e.target.value }))}
                          className="w-full bg-white/5 border border-white/10 focus:border-primary/60 focus:ring-2 focus:ring-primary/20 rounded-xl pl-10 pr-4 py-3 text-sm outline-none transition-all placeholder:text-gray-600" />
                      </div>
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-sm font-semibold text-gray-300">Password</label>
                      <div className="relative">
                        <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                        <input type={showPassword ? 'text' : 'password'} placeholder="Min. 8 characters" value={form.password}
                          onChange={e => setForm(f => ({ ...f, password: e.target.value }))}
                          className="w-full bg-white/5 border border-white/10 focus:border-primary/60 focus:ring-2 focus:ring-primary/20 rounded-xl pl-10 pr-11 py-3 text-sm outline-none transition-all placeholder:text-gray-600" />
                        <button type="button" onClick={() => setShowPassword(v => !v)}
                          className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-300 transition-colors">
                          {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                        </button>
                      </div>
                      {/* Strength bar */}
                      <div className="flex gap-1 mt-2">
                        {[8, 12, 16].map((min, i) => (
                          <div key={i} className={`h-1 flex-1 rounded-full transition-all duration-300 ${form.password.length >= min ? 'bg-primary' : 'bg-white/10'
                            }`} />
                        ))}
                        <span className="text-[10px] text-gray-500 ml-1 self-center">
                          {form.password.length === 0 ? '' : form.password.length < 8 ? 'Weak' : form.password.length < 12 ? 'Fair' : 'Strong'}
                        </span>
                      </div>
                    </div>

                    <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} type="submit"
                      className="w-full flex items-center justify-center gap-2 bg-primary hover:bg-primary/90 text-obsidian font-bold py-3.5 rounded-xl transition-all shadow-[0_0_20px_rgba(16,185,129,0.3)]">
                      Continue <ArrowRight className="w-4 h-4" />
                    </motion.button>
                  </form>

                  <div className="flex items-center gap-3">
                    <div className="flex-1 h-px bg-white/10" />
                    <span className="text-gray-500 text-xs font-medium">or sign up with</span>
                    <div className="flex-1 h-px bg-white/10" />
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    {[{ label: 'Google', icon: '🔵' }, { label: 'GitHub', icon: '⚫' }].map(p => (
                      <motion.button key={p.label} whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}
                        className="flex items-center justify-center gap-2 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl py-3 text-sm font-semibold transition-all">
                        <span>{p.icon}</span> {p.label}
                      </motion.button>
                    ))}
                  </div>
                  <p className="text-center text-sm text-gray-400">
                    Already have an account?{' '}
                    <Link href="/login" className="text-primary font-semibold hover:underline">Sign in</Link>
                  </p>
                </motion.div>
              )}

              {/* === Step 1: Profile === */}
              {step === 1 && (
                <motion.div key="step1" initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -30 }} className="space-y-5">
                  <div>
                    <h2 className="text-3xl font-extrabold">Almost there!</h2>
                    <p className="text-gray-400 mt-1">Tell us your name and confirm your password</p>
                  </div>

                  <AnimatePresence>
                    {error && (
                      <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }}
                        className="bg-red-500/10 border border-red-500/30 text-red-400 text-sm px-4 py-3 rounded-xl">
                        {error}
                      </motion.div>
                    )}
                  </AnimatePresence>

                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="space-y-1.5">
                      <label className="text-sm font-semibold text-gray-300">Full name</label>
                      <div className="relative">
                        <User className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                        <input type="text" placeholder="Your name" value={form.name}
                          onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
                          className="w-full bg-white/5 border border-white/10 focus:border-primary/60 focus:ring-2 focus:ring-primary/20 rounded-xl pl-10 pr-4 py-3 text-sm outline-none transition-all placeholder:text-gray-600" />
                      </div>
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-sm font-semibold text-gray-300">Confirm password</label>
                      <div className="relative">
                        <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                        <input type={showConfirm ? 'text' : 'password'} placeholder="Re-enter password" value={form.confirm}
                          onChange={e => setForm(f => ({ ...f, confirm: e.target.value }))}
                          className={`w-full bg-white/5 border focus:ring-2 rounded-xl pl-10 pr-11 py-3 text-sm outline-none transition-all placeholder:text-gray-600 ${form.confirm && form.confirm !== form.password
                              ? 'border-red-500/50 focus:border-red-500/60 focus:ring-red-500/20'
                              : 'border-white/10 focus:border-primary/60 focus:ring-primary/20'
                            }`} />
                        <button type="button" onClick={() => setShowConfirm(v => !v)}
                          className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-300 transition-colors">
                          {showConfirm ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                        </button>
                      </div>
                      {form.confirm && form.confirm !== form.password && (
                        <p className="text-xs text-red-400">Passwords don't match</p>
                      )}
                    </div>

                    {/* Terms */}
                    <label className="flex items-start gap-2.5 cursor-pointer select-none">
                      <div onClick={() => setAgreed(v => !v)}
                        className={`w-5 h-5 mt-0.5 rounded-md border flex items-center justify-center transition-all shrink-0 ${agreed ? 'bg-primary border-primary' : 'border-white/20 bg-white/5'}`}>
                        {agreed && (
                          <motion.svg initial={{ scale: 0 }} animate={{ scale: 1 }} viewBox="0 0 12 10" className="w-3 h-3 fill-obsidian">
                            <path d="M1 5l3 3 7-7" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" />
                          </motion.svg>
                        )}
                      </div>
                      <span className="text-sm text-gray-400">
                        I agree to the{' '}
                        <Link href="/terms" className="text-primary hover:underline">Terms of Service</Link>
                        {' '}and{' '}
                        <Link href="/privacy" className="text-primary hover:underline">Privacy Policy</Link>
                      </span>
                    </label>

                    <div className="flex gap-3">
                      <button type="button" onClick={() => { setStep(0); setError(''); }}
                        className="flex-1 py-3.5 rounded-xl bg-white/5 hover:bg-white/10 font-bold text-sm transition-all">
                        Back
                      </button>
                      <motion.button whileHover={{ scale: isLoading ? 1 : 1.02 }} whileTap={{ scale: isLoading ? 1 : 0.98 }}
                        type="submit" disabled={isLoading}
                        className="flex-[2] flex items-center justify-center gap-2 bg-primary hover:bg-primary/90 text-obsidian font-bold py-3.5 rounded-xl transition-all shadow-[0_0_20px_rgba(16,185,129,0.3)] disabled:opacity-70">
                        {isLoading ? <Loader2 className="w-5 h-5 animate-spin" /> : <>Create Account <ArrowRight className="w-4 h-4" /></>}
                      </motion.button>
                    </div>
                  </form>
                </motion.div>
              )}

              {/* === Step 2: Success === */}
              {step === 2 && (
                <motion.div key="step2" initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="py-6 text-center space-y-6">
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: 'spring', stiffness: 200, damping: 15 }}
                    className="w-20 h-20 bg-primary/20 rounded-full flex items-center justify-center mx-auto"
                  >
                    <BadgeCheck className="w-10 h-10 text-primary" />
                  </motion.div>
                  <div>
                    <h2 className="text-3xl font-extrabold">You're in! 🎉</h2>
                    <p className="text-gray-400 mt-2">Your account is ready. Start scanning barcodes to find instant deals.</p>
                  </div>
                  <Link href="/">
                    <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}
                      className="inline-flex items-center justify-center gap-2 bg-primary hover:bg-primary/90 text-obsidian font-bold px-8 py-3.5 rounded-xl transition-all shadow-[0_0_20px_rgba(16,185,129,0.3)] cursor-pointer">
                      Start Scanning <ArrowRight className="w-4 h-4" />
                    </motion.div>
                  </Link>
                </motion.div>
              )}

            </AnimatePresence>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
