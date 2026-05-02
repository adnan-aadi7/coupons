"use client";

import { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { X, Eye, EyeOff } from 'lucide-react';
import Logo from '@/components/common/Logo';

const GoogleLogo = () => (
  <svg width="32" height="32" viewBox="0 0 48 48">
    <path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z" />
    <path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z" />
    <path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z" />
    <path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z" />
    <path fill="none" d="M0 0h48v48H0z" />
  </svg>
);

const FacebookLogo = () => (
  <svg width="32" height="32" viewBox="0 0 24 24" fill="#1877F2">
    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.469h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
  </svg>
);

const AppleLogo = () => (
  <svg width="32" height="32" viewBox="0 0 384 512" fill="currentColor">
    <path d="M318.7 268.7c-.2-36.7 16.4-64.4 50-84.8-18.8-26.9-47.2-41.7-84.7-44.6-35.5-2.8-74.3 20.7-88.5 20.7-15 0-49.4-19.7-76.4-19.7C63.3 141.2 4 184.8 4 273.5q0 39.3 14.4 81.2c12.8 36.7 59 126.7 107.2 125.2 25.2-.6 43-17.9 75.8-17.9 31.8 0 48.3 17.9 76.4 17.9 48.6-.7 90.4-82.5 102.6-119.3-65.2-30.7-61.7-90-61.7-91.9zm-56.6-164.2c27.3-32.4 24.8-61.9 24-72.5-24.1 1.4-52 16.4-67.9 34.9-17.5 19.8-27.8 44.3-25.6 71.9 26.1 2 49.9-11.4 69.5-34.3z" />
  </svg>
);

export default function SignupPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  return (
    <div className="min-h-screen bg-white mt-10 flex overflow-hidden relative z-10">

      {/* Left Side: Signup Form */}
      <div className="w-full lg:w-[55%] flex flex-col justify-center px-12 md:px-24 lg:px-32 py-20 relative">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-[480px] w-full"
        >
          <h1 className="lg:text-[56px] text-[32px] font-semibold text-black mb-12 ">Create Account</h1>

          <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
            <div className="space-y-3">
              <label className="text-[18px] font-medium text-black">Name</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full h-[64px] bg-[#F3F3F5] rounded-lg px-6 border border-slate-100 focus:border-[#FF6A13] focus:ring-0 transition-all text-black outline-none placeholder:text-slate-400"
                placeholder="Full Name"
              />
            </div>

            <div className="space-y-3">
              <label className="text-[18px] font-medium text-black">Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full h-[64px] bg-[#F3F3F5] rounded-lg px-6 border border-slate-100 focus:border-[#FF6A13] focus:ring-0 transition-all text-black outline-none placeholder:text-slate-400"
                placeholder="your.email@example.com"
              />
            </div>

            <div className="space-y-3">
              <label className="text-[18px] font-medium text-black">Password</label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full h-[64px] bg-[#F3F3F5] rounded-lg px-6 border border-slate-100 focus:border-[#FF6A13] focus:ring-0 transition-all text-black outline-none placeholder:text-slate-400"
                  placeholder="Create a password"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-6 top-1/2 -translate-y-1/2 text-slate-400 hover:text-black transition-colors"
                >
                  {showPassword ? <EyeOff className="w-6 h-6" /> : <Eye className="w-6 h-6" />}
                </button>
              </div>
            </div>

            <button className="w-full h-[64px] bg-[#FF6A13] text-white rounded-lg font-bold text-[18px] hover:bg-[#E65F11] transition-all flex items-center justify-center shadow-lg shadow-orange-500/10 mt-8">
              Sign Up
            </button>
          </form>

          {/* Social Logins Footer Style with Proper Logos - MOVED BELOW */}
          <div className="mt-12 text-center space-y-8">
            <div className="relative flex items-center justify-center">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-slate-100"></div>
              </div>
              <span className="relative bg-white px-4 text-slate-400 text-sm font-medium uppercase tracking-widest">or use your social account</span>
            </div>

            <div className="flex items-center justify-center gap-6">
              <button className="w-[74px] h-[74px] border border-slate-100 rounded-lg flex items-center justify-center bg-white hover:bg-slate-50 hover:shadow-md transition-all">
                <GoogleLogo />
              </button>
              <button className="w-[74px] h-[74px] border border-slate-100 rounded-lg flex items-center justify-center bg-white hover:bg-slate-50 hover:shadow-md transition-all">
                <FacebookLogo />
              </button>
              <button className="w-[74px] h-[74px] border border-slate-100 rounded-lg flex items-center justify-center bg-white hover:bg-slate-50 hover:shadow-md transition-all">
                <AppleLogo />
              </button>
            </div>
          </div>

          {/* Mobile-only Login Link */}
          <div className="mt-8 text-center lg:hidden">
            <p className="text-slate-500 font-medium">
              Already have an account?{' '}
              <Link href="/auth/login" className="text-[#FF6A13] font-bold hover:underline">
                Log In
              </Link>
            </p>
          </div>
        </motion.div>
      </div>

      {/* Right Side: Brand Panel */}
      <div className="hidden lg:flex lg:w-[45%] bg-gradient-to-br from-[#F65300] to-[#FF8400] relative flex-col items-center justify-center text-center p-12 text-white">
        <Link href="/" className="absolute top-15 right-10 w-12 h-12 bg-white rounded-full flex items-center justify-center text-slate-400 hover:text-black transition-all">
          <X className="w-6 h-6" />
        </Link>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="space-y-12 flex flex-col items-center"
        >
          {/* Main Logo for Brand Panel
          <Logo iconOnly className="scale-[2.5] mb-16" /> */}

          <div className="space-y-6">
            <h2 className="text-[56px] font-semibold leading-tight">Welcome Back</h2>
            <p className="text-[24px] font-medium opacity-80 max-w-[350px] mx-auto">Already part of our exclusive network?</p>
          </div>

          <Link href="/auth/login">
            <button className="mt-12 px-12 py-5 border-2 border-white rounded-lg font-bold text-[18px] hover:bg-white hover:text-[#F65300] transition-all min-w-[300px]">
              Sign In Instead
            </button>
          </Link>
        </motion.div>
      </div>
    </div>
  );
}
