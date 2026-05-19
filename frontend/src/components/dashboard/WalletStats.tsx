"use client";

import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '@/redux/store';
import { requestWithdrawal } from '@/redux/slices/authSlice';
import { motion, AnimatePresence } from 'framer-motion';
import { Wallet, Clock, TrendingUp, ArrowUpRight, Loader2, X } from 'lucide-react';

interface WalletStatsProps {
  user: any;
}

export default function WalletStats({ user }: WalletStatsProps) {
  const dispatch = useDispatch<AppDispatch>();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [amount, setAmount] = useState<string>('');
  const [error, setError] = useState<string | null>(null);

  const wallet = user?.wallet || {
    pendingCashback: 0,
    availableCashback: 0,
    lifetimeSavings: 0
  };

  const primaryPayout = user?.payoutMethods?.find((p: any) => p.isPrimary) || user?.payoutMethods?.[0];

  const handleWithdraw = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    const numAmount = parseFloat(amount);

    if (isNaN(numAmount) || numAmount < 5) {
      setError("Minimum withdrawal is $5.00");
      return;
    }
    if (numAmount > wallet.availableCashback) {
      setError("Insufficient available balance");
      return;
    }
    if (!primaryPayout?.email) {
      setError("Please connect a PayPal account first in the section below.");
      return;
    }

    setIsSubmitting(true);
    const resultAction = await dispatch(requestWithdrawal({ amount: numAmount, paypalEmail: primaryPayout.email }));
    setIsSubmitting(false);

    if (requestWithdrawal.fulfilled.match(resultAction)) {
      setIsModalOpen(false);
      setAmount('');
    } else {
      setError(resultAction.payload as string || 'Withdrawal failed');
    }
  };

  const stats = [
    {
      label: 'Available Balance',
      value: `$${wallet.availableCashback.toFixed(2)}`,
      icon: Wallet,
      color: 'text-emerald-600',
      bg: 'bg-emerald-50',
      description: 'Ready to withdraw',
      action: wallet.availableCashback >= 5 ? (
        <button 
          onClick={() => setIsModalOpen(true)}
          className="mt-4 w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs py-2 rounded-xl transition-colors shadow-sm"
        >
          Withdraw Funds
        </button>
      ) : (
        <div className="mt-4 text-[10px] font-bold text-slate-400 text-center uppercase tracking-widest bg-slate-50 py-2 rounded-xl border border-slate-100">
          Min $5 to Withdraw
        </div>
      )
    },
    {
      label: 'Pending Cashback',
      value: `$${wallet.pendingCashback.toFixed(2)}`,
      icon: Clock,
      color: 'text-amber-600',
      bg: 'bg-amber-50',
      description: 'Processing by brand'
    },
    {
      label: 'Lifetime Savings',
      value: `$${wallet.lifetimeSavings.toFixed(2)}`,
      icon: TrendingUp,
      color: 'text-primary',
      bg: 'bg-primary/5',
      description: 'Total earned to date'
    }
  ];

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {stats.map((stat, index) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="bg-white rounded-[32px] p-6 border border-slate-100 shadow-sm hover:shadow-md transition-all group flex flex-col justify-between"
          >
            <div>
              <div className="flex items-start justify-between mb-4">
                <div className={`p-3 rounded-2xl ${stat.bg} ${stat.color}`}>
                  <stat.icon size={24} />
                </div>
                <div className="opacity-0 group-hover:opacity-100 transition-opacity">
                  <ArrowUpRight size={20} className="text-slate-400" />
                </div>
              </div>
              
              <div className="space-y-1">
                <p className="text-sm font-medium text-slate-500">{stat.label}</p>
                <h3 className="text-2xl font-bold text-slate-900">{stat.value}</h3>
                <p className="text-xs text-slate-400">{stat.description}</p>
              </div>
            </div>
            {stat.action && <div>{stat.action}</div>}
          </motion.div>
        ))}
      </div>

      {/* Withdrawal Modal */}
      <AnimatePresence>
        {isModalOpen && (
          <>
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-50"
              onClick={() => setIsModalOpen(false)}
            />
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[90%] max-w-md bg-white rounded-[32px] shadow-2xl p-8 z-50"
            >
              <div className="flex items-center justify-between mb-8">
                <h3 className="text-xl font-black text-slate-800 tracking-tight">Withdraw Funds</h3>
                <button 
                  onClick={() => setIsModalOpen(false)}
                  className="w-8 h-8 bg-slate-100 rounded-full flex items-center justify-center text-slate-500 hover:bg-slate-200 hover:text-slate-700 transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {!primaryPayout?.email ? (
                <div className="bg-amber-50 text-amber-800 p-4 rounded-2xl text-sm font-medium border border-amber-200">
                  Please scroll down to the <strong>Withdrawal Methods</strong> section and connect a PayPal account before requesting a withdrawal.
                </div>
              ) : (
                <form onSubmit={handleWithdraw} className="space-y-6">
                  
                  <div className="bg-slate-50 rounded-2xl p-4 border border-slate-100">
                    <div className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-1">Sending to</div>
                    <div className="font-bold text-slate-800">{primaryPayout.email}</div>
                    <div className="text-xs font-bold text-primary mt-1">PayPal</div>
                  </div>

                  <div>
                    <label className="block text-[11px] font-black uppercase tracking-widest text-slate-400 mb-2 flex justify-between">
                      <span>Amount</span>
                      <span className="text-emerald-600">Max: ${wallet.availableCashback.toFixed(2)}</span>
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-5 flex items-center pointer-events-none">
                        <span className="text-slate-400 font-bold">$</span>
                      </div>
                      <input 
                        type="number" 
                        step="0.01"
                        placeholder="0.00"
                        value={amount}
                        onChange={(e) => setAmount(e.target.value)}
                        className="w-full bg-slate-50 border border-slate-200 rounded-2xl pl-10 pr-5 py-4 text-lg font-black text-slate-800 focus:outline-none focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/10 transition-all placeholder:font-medium placeholder:text-slate-300"
                        required
                      />
                      <button
                        type="button"
                        onClick={() => setAmount(wallet.availableCashback.toString())}
                        className="absolute inset-y-0 right-3 flex items-center"
                      >
                        <span className="bg-emerald-100 text-emerald-700 text-[10px] font-black uppercase px-2 py-1 rounded-lg hover:bg-emerald-200 transition-colors">Max</span>
                      </button>
                    </div>
                    {error && (
                      <p className="text-red-500 text-xs font-bold mt-2">{error}</p>
                    )}
                  </div>

                  <button 
                    type="submit" 
                    disabled={isSubmitting || !amount}
                    className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-black text-sm py-4 rounded-2xl shadow-lg shadow-emerald-600/30 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 mt-4"
                  >
                    {isSubmitting ? <Loader2 className="w-5 h-5 animate-spin" /> : 'Confirm Withdrawal'}
                  </button>
                </form>
              )}
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
