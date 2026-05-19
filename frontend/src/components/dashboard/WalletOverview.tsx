"use client";

import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '@/redux/store';
import { requestWithdrawal, getMe } from '@/redux/slices/authSlice';
import { motion, AnimatePresence } from 'framer-motion';
import { Wallet, TrendingUp, Clock, DollarSign, ArrowRight, X, AlertCircle, CheckCircle2, Loader2, Shield } from 'lucide-react';

interface WalletOverviewProps {
  user: any;
}

export default function WalletOverview({ user }: WalletOverviewProps) {
  const dispatch = useDispatch<AppDispatch>();
  const wallet = user?.wallet || { availableCashback: 0, pendingCashback: 0, lifetimeSavings: 0 };

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [amount, setAmount] = useState<string>('');
  
  // Get primary paypal email if exists
  const defaultPaypal = user?.payoutMethods?.find((m: any) => m.provider === 'paypal')?.email || '';
  const [paypalEmail, setPaypalEmail] = useState<string>(defaultPaypal);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleWithdraw = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    const withdrawAmount = parseFloat(amount);
    if (isNaN(withdrawAmount) || withdrawAmount < 5) {
      return setError('Minimum withdrawal amount is $5.00');
    }
    if (withdrawAmount > wallet.availableCashback) {
      return setError('Insufficient available balance');
    }
    if (!paypalEmail || !paypalEmail.includes('@')) {
      return setError('Please enter a valid PayPal email address');
    }

    setLoading(true);
    try {
      const resultAction = await dispatch(requestWithdrawal({ amount: withdrawAmount, paypalEmail }));
      if (requestWithdrawal.fulfilled.match(resultAction)) {
        setSuccess(`Successfully requested $${withdrawAmount.toFixed(2)} payout to ${paypalEmail}`);
        setAmount('');
        // Refresh user to get latest wallet and history if needed
        setTimeout(() => {
          dispatch(getMe());
          setIsModalOpen(false);
          setSuccess('');
        }, 3000);
      } else {
        setError(resultAction.payload as string || 'Withdrawal failed. Please try again.');
      }
    } catch (err: any) {
      setError(err.message || 'An unexpected error occurred');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-8 font-['Manrope']">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <h2 className="text-[28px] sm:text-[32px] font-bold tracking-tight text-[#1A1C1C] font-serif" style={{ fontFamily: 'Georgia, serif' }}>
          My Wallet
        </h2>
        <button 
          onClick={() => {
            setAmount('');
            setError('');
            setSuccess('');
            setIsModalOpen(true);
          }}
          disabled={wallet.availableCashback < 5}
          className="flex items-center gap-2 px-6 py-3 bg-[#FF9800] hover:bg-[#F97316] disabled:bg-slate-300 disabled:cursor-not-allowed text-white text-sm font-bold rounded-full transition-all shadow-[0_4px_12px_rgba(255,152,0,0.3)] hover:shadow-[0_6px_16px_rgba(255,152,0,0.4)] active:scale-95"
        >
          Withdraw Funds <ArrowRight className="w-4 h-4" />
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Available Balance Card */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="relative bg-gradient-to-br from-[#1A1C1C] to-[#2D3131] rounded-3xl p-6 sm:p-8 text-white overflow-hidden shadow-xl"
        >
          {/* Decorative background elements */}
          <div className="absolute top-0 right-0 -translate-y-1/4 translate-x-1/4 w-32 h-32 bg-[#FF9800]/20 rounded-full blur-2xl pointer-events-none" />
          <div className="absolute bottom-0 left-0 translate-y-1/4 -translate-x-1/4 w-32 h-32 bg-[#FF9800]/10 rounded-full blur-2xl pointer-events-none" />
          
          <div className="relative z-10">
            <div className="flex items-center gap-3 mb-6 opacity-80">
              <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center backdrop-blur-sm">
                <Wallet className="w-5 h-5 text-[#FF9800]" />
              </div>
              <span className="font-semibold tracking-wide text-sm uppercase">Available Cashback</span>
            </div>
            
            <div className="flex items-baseline gap-2 mb-2">
              <span className="text-3xl sm:text-4xl font-black text-white">${wallet.availableCashback.toFixed(2)}</span>
              <span className="text-[#FF9800] font-bold text-sm">USD</span>
            </div>
            <p className="text-sm text-slate-300">Minimum $5 to withdraw</p>
          </div>
        </motion.div>

        {/* Pending Balance Card */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.1 }}
          className="bg-white border border-slate-100 rounded-3xl p-6 sm:p-8 hover:shadow-xl hover:shadow-slate-100/50 transition-all duration-300"
        >
          <div className="flex items-center gap-3 mb-6 text-slate-500">
            <div className="w-10 h-10 rounded-xl bg-orange-50 border border-orange-100 flex items-center justify-center">
              <Clock className="w-5 h-5 text-orange-500" />
            </div>
            <span className="font-bold tracking-wide text-sm uppercase">Pending Cashback</span>
          </div>
          
          <div className="flex items-baseline gap-2 mb-2">
            <span className="text-3xl sm:text-4xl font-black text-[#1A1C1C]">${wallet.pendingCashback.toFixed(2)}</span>
          </div>
          <p className="text-sm text-slate-500">Awaiting merchant verification</p>
        </motion.div>

        {/* Lifetime Savings Card */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.2 }}
          className="bg-white border border-slate-100 rounded-3xl p-6 sm:p-8 hover:shadow-xl hover:shadow-slate-100/50 transition-all duration-300"
        >
          <div className="flex items-center gap-3 mb-6 text-slate-500">
            <div className="w-10 h-10 rounded-xl bg-emerald-50 border border-emerald-100 flex items-center justify-center">
              <TrendingUp className="w-5 h-5 text-emerald-500" />
            </div>
            <span className="font-bold tracking-wide text-sm uppercase">Lifetime Savings</span>
          </div>
          
          <div className="flex items-baseline gap-2 mb-2">
            <span className="text-3xl sm:text-4xl font-black text-[#1A1C1C]">${wallet.lifetimeSavings.toFixed(2)}</span>
          </div>
          <p className="text-sm text-slate-500">Total money saved with us</p>
        </motion.div>
      </div>

      {/* Withdrawal Modal */}
      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-[110] flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }} 
              animate={{ opacity: 1 }} 
              exit={{ opacity: 0 }}
              onClick={() => !loading && setIsModalOpen(false)}
              className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm"
            />
            
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 20 }} 
              animate={{ opacity: 1, scale: 1, y: 0 }} 
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative w-full max-w-md bg-white rounded-[32px] shadow-2xl overflow-hidden"
            >
              <div className="p-8">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-2xl font-bold font-serif text-slate-900" style={{ fontFamily: 'Georgia, serif' }}>Secure Payout</h3>
                  <button 
                    onClick={() => !loading && setIsModalOpen(false)}
                    className="p-2 bg-slate-50 hover:bg-slate-100 rounded-full text-slate-500 transition-colors"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                {success ? (
                  <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="text-center py-6">
                    <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <CheckCircle2 className="w-8 h-8 text-emerald-600" />
                    </div>
                    <h4 className="text-xl font-bold text-slate-900 mb-2">Payout Requested!</h4>
                    <p className="text-slate-500">{success}</p>
                    <p className="text-sm text-slate-400 mt-4">Funds usually arrive within 3-5 business days.</p>
                  </motion.div>
                ) : (
                  <form onSubmit={handleWithdraw} className="space-y-6">
                    <div>
                      <div className="flex justify-between items-center mb-2">
                        <label className="text-sm font-bold text-slate-700">Withdrawal Amount (USD)</label>
                        <span className="text-xs text-slate-500 font-semibold">Max: ${wallet.availableCashback.toFixed(2)}</span>
                      </div>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                          <DollarSign className="h-5 w-5 text-slate-400" />
                        </div>
                        <input
                          type="number"
                          min="5"
                          step="0.01"
                          max={wallet.availableCashback}
                          value={amount}
                          onChange={(e) => setAmount(e.target.value)}
                          required
                          placeholder="0.00"
                          className="w-full pl-11 pr-4 py-3.5 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-2 focus:ring-[#FF9800] focus:border-transparent transition-all outline-none text-lg font-bold text-slate-900"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-bold text-slate-700 mb-2">PayPal Email Address</label>
                      <input
                        type="email"
                        value={paypalEmail}
                        onChange={(e) => setPaypalEmail(e.target.value)}
                        required
                        placeholder="your@email.com"
                        className="w-full px-4 py-3.5 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-2 focus:ring-[#FF9800] focus:border-transparent transition-all outline-none font-medium text-slate-900"
                      />
                      <p className="text-xs text-slate-500 mt-2 flex items-center gap-1">
                        <Shield className="w-3.5 h-3.5" /> 
                        Your payment is secured and encrypted.
                      </p>
                    </div>

                    {error && (
                      <div className="p-4 bg-red-50 border border-red-100 rounded-2xl flex items-start gap-3">
                        <AlertCircle className="w-5 h-5 text-red-500 shrink-0 mt-0.5" />
                        <p className="text-sm text-red-600 font-medium">{error}</p>
                      </div>
                    )}

                    <button
                      type="submit"
                      disabled={loading || !amount || !paypalEmail}
                      className="w-full flex items-center justify-center gap-2 py-4 bg-[#1A1C1C] hover:bg-black disabled:bg-slate-300 disabled:cursor-not-allowed text-white font-bold rounded-2xl transition-all shadow-xl active:scale-95"
                    >
                      {loading ? (
                        <><Loader2 className="w-5 h-5 animate-spin" /> Processing...</>
                      ) : (
                        'Request Payout'
                      )}
                    </button>
                  </form>
                )}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
      
      {/* Recent Transactions placeholder or table */}
      <div className="mt-12">
        <h3 className="text-xl font-bold text-[#1A1C1C] mb-6">Recent Cashback Earnings</h3>
        <div className="bg-white border border-slate-100 rounded-3xl p-8 text-center">
          <div className="w-16 h-16 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-4">
            <DollarSign className="w-6 h-6 text-slate-300" />
          </div>
          <p className="text-slate-500 font-medium">Your recent cashback transactions will appear here.</p>
          <p className="text-slate-400 text-sm mt-1">Start shopping to earn cashback on your purchases.</p>
        </div>
      </div>
    </div>
  );
}
