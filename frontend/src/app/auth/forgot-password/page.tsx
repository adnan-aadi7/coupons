"use client";

import { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ArrowLeft, Mail, Lock, Eye, EyeOff, CheckCircle2, ShieldCheck, Key } from 'lucide-react';
import api from '@/redux/api';

type Step = 'EMAIL' | 'OTP' | 'PASSWORD' | 'SUCCESS';

export default function ForgotPasswordPage() {
  const [step, setStep] = useState<Step>('EMAIL');
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState<string[]>(Array(6).fill(''));
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  
  // Visibility toggles
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  
  // State indicators
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  // Session reset token (returned by verify-otp)
  const [resetToken, setResetToken] = useState('');

  // OTP resend timer
  const [timer, setTimer] = useState(60);
  const [canResend, setCanResend] = useState(false);

  // References for OTP input focus shifting
  const inputRefs = useRef<HTMLInputElement[]>([]);

  useEffect(() => {
    let interval: any;
    if (step === 'OTP' && timer > 0) {
      interval = setInterval(() => {
        setTimer((prev) => prev - 1);
      }, 1000);
    } else if (timer === 0) {
      setCanResend(true);
    }
    return () => clearInterval(interval);
  }, [step, timer]);

  // Handle Step 1: Send OTP
  const handleSendOTP = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) {
      setError('Please enter your email address');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const response = await api.post('/auth/forgotpassword', { email });
      if (response.data.success) {
        setStep('OTP');
        setTimer(60);
        setCanResend(false);
      }
    } catch (err: any) {
      setError(err.response?.data?.message || 'Failed to send OTP code. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  // Handle Resend OTP
  const handleResendOTP = async () => {
    if (!canResend) return;
    
    setError(null);
    setLoading(true);
    try {
      const response = await api.post('/auth/forgotpassword', { email });
      if (response.data.success) {
        setOtp(Array(6).fill(''));
        setTimer(60);
        setCanResend(false);
        if (inputRefs.current[0]) {
          inputRefs.current[0].focus();
        }
      }
    } catch (err: any) {
      setError(err.response?.data?.message || 'Failed to resend code');
    } finally {
      setLoading(false);
    }
  };

  // Handle OTP inputs typing
  const handleOtpChange = (value: string, index: number) => {
    // Only accept numbers
    if (value && !/^\d+$/.test(value)) return;

    const newOtp = [...otp];
    // Take only the last character entered
    newOtp[index] = value.substring(value.length - 1);
    setOtp(newOtp);

    // Shift focus to the next input box
    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>, index: number) => {
    if (e.key === 'Backspace') {
      if (!otp[index] && index > 0) {
        // Shift focus to the previous input box on backspace if current is empty
        const newOtp = [...otp];
        newOtp[index - 1] = '';
        setOtp(newOtp);
        inputRefs.current[index - 1]?.focus();
      } else {
        const newOtp = [...otp];
        newOtp[index] = '';
        setOtp(newOtp);
      }
    }
  };

  const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData('text').trim();
    if (!/^\d{6}$/.test(pastedData)) return;

    const digits = pastedData.split('');
    setOtp(digits);
    inputRefs.current[5]?.focus();
  };

  // Handle Step 2: Verify OTP
  const handleVerifyOTP = async (e: React.FormEvent) => {
    e.preventDefault();
    const otpCode = otp.join('');
    if (otpCode.length < 6) {
      setError('Please enter the complete 6-digit verification code');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const response = await api.post('/auth/verify-otp', { email, otp: otpCode });
      if (response.data.success) {
        setResetToken(response.data.resetToken);
        setStep('PASSWORD');
      }
    } catch (err: any) {
      setError(err.response?.data?.message || 'Invalid or expired verification code');
    } finally {
      setLoading(false);
    }
  };

  // Handle Step 3: Reset Password
  const handleResetPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    if (password.length < 6) {
      setError('Password must be at least 6 characters long');
      return;
    }

    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const response = await api.post('/auth/resetpassword', {
        resetToken,
        password
      });
      if (response.data.success) {
        setStep('SUCCESS');
      }
    } catch (err: any) {
      setError(err.response?.data?.message || 'Failed to update password. Session may have expired.');
    } finally {
      setLoading(false);
    }
  };

  // Render sub-page title and instructions dynamically
  const renderHeader = () => {
    switch (step) {
      case 'EMAIL':
        return (
          <>
            <h1 className="lg:text-[48px] text-[32px] font-semibold text-black mb-4 leading-tight">Forgot Password?</h1>
            <p className="text-slate-500 mb-12 font-medium">
              Enter your email address below and we'll send you a 6-digit verification code to reset your password.
            </p>
          </>
        );
      case 'OTP':
        return (
          <>
            <h1 className="lg:text-[48px] text-[32px] font-semibold text-black mb-4 leading-tight">Enter Code</h1>
            <p className="text-slate-500 mb-12 font-medium">
              We've sent a 6-digit verification code to <strong className="text-black">{email}</strong>. Enter the code below to verify your identity.
            </p>
          </>
        );
      case 'PASSWORD':
        return (
          <>
            <h1 className="lg:text-[48px] text-[32px] font-semibold text-black mb-4 leading-tight">New Password</h1>
            <p className="text-slate-500 mb-12 font-medium">
              Your security code is verified! Choose a strong, secure new password for your account to continue.
            </p>
          </>
        );
      default:
        return null;
    }
  };

  return (
    <div className="bg-white flex min-h-screen pt-[76px] overflow-hidden relative z-10">

      {/* Left Side: Wizard Form Panel */}
      <div className="w-full lg:w-[55%] flex flex-col justify-center px-12 md:px-24 lg:px-32 py-20 relative">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-[480px] w-full"
        >
          {/* Back Button (Only on Steps 1 & 2) */}
          {(step === 'EMAIL' || step === 'OTP') && (
            <button
              onClick={() => (step === 'OTP' ? setStep('EMAIL') : window.location.href = '/auth/login')}
              className="inline-flex items-center gap-2 text-slate-400 hover:text-black transition-colors mb-8 font-semibold text-sm"
            >
              <ArrowLeft className="w-4 h-4" />
              {step === 'OTP' ? 'Back to Email' : 'Back to Sign In'}
            </button>
          )}

          {error && (
            <div className="p-4 bg-red-50 border border-red-100 text-red-600 rounded-2xl text-sm font-bold mb-6">
              {error}
            </div>
          )}

          {renderHeader()}

          <AnimatePresence mode="wait">
            
            {/* Step 1: Email Form */}
            {step === 'EMAIL' && (
              <motion.form
                key="email"
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 10 }}
                onSubmit={handleSendOTP}
                className="space-y-8"
              >
                <div className="space-y-3">
                  <label className="text-[18px] font-medium text-black">Email Address</label>
                  <div className="relative">
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full h-[64px] bg-[#F3F3F5] rounded-xl pl-14 pr-6 border border-slate-100 focus:border-[#FF6A13] focus:ring-0 transition-all text-black outline-none placeholder:text-slate-400 font-semibold"
                      placeholder="your.email@example.com"
                      required
                    />
                    <Mail className="w-5 h-5 text-slate-400 absolute left-6 top-1/2 -translate-y-1/2" />
                  </div>
                </div>

                <button
                  disabled={loading}
                  className="w-full h-[64px] bg-[#FF6A13] text-white rounded-xl font-bold text-[18px] hover:bg-[#E65F11] transition-all flex items-center justify-center shadow-lg shadow-orange-500/10 disabled:opacity-50"
                >
                  {loading ? <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin" /> : 'Send Code'}
                </button>
              </motion.form>
            )}

            {/* Step 2: OTP Input Form */}
            {step === 'OTP' && (
              <motion.form
                key="otp"
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 10 }}
                onSubmit={handleVerifyOTP}
                className="space-y-8"
              >
                <div className="space-y-4">
                  <label className="text-[18px] font-medium text-black block text-center md:text-left">Verification Code</label>
                  
                  {/* Spaced out 6-Digit input boxes */}
                  <div className="flex items-center justify-between gap-2.5 md:gap-4">
                    {otp.map((digit, index) => (
                      <input
                        key={index}
                        type="text"
                        maxLength={1}
                        value={digit}
                        ref={(el) => { if (el) inputRefs.current[index] = el; }}
                        onChange={(e) => handleOtpChange(e.target.value, index)}
                        onKeyDown={(e) => handleKeyDown(e, index)}
                        onPaste={index === 0 ? handlePaste : undefined}
                        className="w-12 h-14 md:w-16 md:h-16 bg-[#F3F3F5] rounded-xl text-center font-bold text-[22px] text-black border border-slate-100 focus:border-[#FF6A13] focus:bg-white focus:ring-0 transition-all outline-none"
                      />
                    ))}
                  </div>
                </div>

                <button
                  disabled={loading}
                  className="w-full h-[64px] bg-[#FF6A13] text-white rounded-xl font-bold text-[18px] hover:bg-[#E65F11] transition-all flex items-center justify-center shadow-lg shadow-orange-500/10 disabled:opacity-50"
                >
                  {loading ? <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin" /> : 'Verify Code'}
                </button>

                {/* Resend Action */}
                <div className="text-center pt-2">
                  {canResend ? (
                    <button
                      type="button"
                      onClick={handleResendOTP}
                      className="text-[15px] font-bold text-[#FF6A13] hover:underline"
                    >
                      Resend Code
                    </button>
                  ) : (
                    <span className="text-[14px] text-slate-400 font-semibold">
                      Resend code in <strong className="text-slate-600">{timer}s</strong>
                    </span>
                  )}
                </div>
              </motion.form>
            )}

            {/* Step 3: Choose New Password */}
            {step === 'PASSWORD' && (
              <motion.form
                key="password"
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 10 }}
                onSubmit={handleResetPassword}
                className="space-y-6"
              >
                <div className="space-y-3">
                  <label className="text-[18px] font-medium text-black">New Password</label>
                  <div className="relative">
                    <input
                      type={showPassword ? "text" : "password"}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="w-full h-[64px] bg-[#F3F3F5] rounded-xl pl-14 pr-14 border border-slate-100 focus:border-[#FF6A13] focus:ring-0 transition-all text-black outline-none placeholder:text-slate-400 font-semibold"
                      placeholder="Enter new password (min. 6 chars)"
                      required
                    />
                    <Lock className="w-5 h-5 text-slate-400 absolute left-6 top-1/2 -translate-y-1/2" />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-6 top-1/2 -translate-y-1/2 text-slate-400 hover:text-black transition-colors"
                    >
                      {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                    </button>
                  </div>
                </div>

                <div className="space-y-3">
                  <label className="text-[18px] font-medium text-black">Confirm Password</label>
                  <div className="relative">
                    <input
                      type={showConfirmPassword ? "text" : "password"}
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      className="w-full h-[64px] bg-[#F3F3F5] rounded-xl pl-14 pr-14 border border-slate-100 focus:border-[#FF6A13] focus:ring-0 transition-all text-black outline-none placeholder:text-slate-400 font-semibold"
                      placeholder="Confirm new password"
                      required
                    />
                    <Lock className="w-5 h-5 text-slate-400 absolute left-6 top-1/2 -translate-y-1/2" />
                    <button
                      type="button"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      className="absolute right-6 top-1/2 -translate-y-1/2 text-slate-400 hover:text-black transition-colors"
                    >
                      {showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                    </button>
                  </div>
                </div>

                <button
                  disabled={loading}
                  className="w-full h-[64px] bg-[#FF6A13] text-white rounded-xl font-bold text-[18px] hover:bg-[#E65F11] transition-all flex items-center justify-center shadow-lg shadow-orange-500/10 disabled:opacity-50"
                >
                  {loading ? <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin" /> : 'Reset Password'}
                </button>
              </motion.form>
            )}

            {/* Step 4: Success Screen */}
            {step === 'SUCCESS' && (
              <motion.div
                key="success"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center md:text-left space-y-6"
              >
                <div className="w-16 h-16 bg-emerald-50 rounded-2xl flex items-center justify-center text-emerald-500 mx-auto md:mx-0">
                  <CheckCircle2 className="w-10 h-10" />
                </div>
                <div className="space-y-3">
                  <h1 className="lg:text-[36px] text-[28px] font-semibold text-black leading-tight">Password Reset Complete</h1>
                  <p className="text-slate-500 font-semibold leading-relaxed">
                    Your password has been successfully reset! You can now log into your Coupons Mart account using your new credentials.
                  </p>
                </div>
                <div className="pt-4">
                  <Link href="/auth/login">
                    <button className="w-full h-[64px] bg-[#FF6A13] hover:bg-[#E65F11] text-white rounded-xl font-bold text-[18px] transition-all flex items-center justify-center shadow-lg shadow-orange-500/10">
                      Sign In Now
                    </button>
                  </Link>
                </div>
              </motion.div>
            )}

          </AnimatePresence>

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
          <div className="space-y-6">
            <h2 className="text-[56px] font-semibold leading-tight">Secure Savings</h2>
            <p className="text-[24px] font-medium opacity-80 max-w-[350px] mx-auto">Your account safety is our priority. Verify code and continue earning cashback.</p>
          </div>

          <Link href="/auth/signup">
            <button className="mt-12 px-12 py-5 border-2 border-white rounded-lg font-bold text-[18px] hover:bg-white hover:text-[#F65300] transition-all min-w-[300px]">
              Create Account
            </button>
          </Link>
        </motion.div>
      </div>
    </div>
  );
}
