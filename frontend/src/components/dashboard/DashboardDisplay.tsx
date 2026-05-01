"use client";

import { useGetMeQuery, useGetHistoryQuery, useSimulateConversionMutation } from '@/redux/api/authApi';
import { motion } from 'framer-motion';
import { 
  Wallet, 
  Tag as TagIcon, 
  TrendingUp, 
  Clock, 
  ArrowUpRight, 
  ShieldCheck, 
  Settings, 
  CreditCard,
  Zap,
  CheckCircle2
} from 'lucide-react';
import GlassContainer from '@/components/ui/GlassContainer';
import Link from 'next/link';
import CouponCard from '@/components/deals/CouponCard';
import DealModal from '@/components/deals/DealModal';
import { useState } from 'react';

export default function DashboardDisplay() {
  const { data: userData, isLoading: isUserLoading } = useGetMeQuery({});
  const { data: historyData, isLoading: isHistoryLoading } = useGetHistoryQuery({});
  const [simulateConversion] = useSimulateConversionMutation();

  const [selectedCoupon, setSelectedCoupon] = useState<any>(null);
  const user = userData?.data;
  const history = historyData?.data || [];

  const handleSimulate = async (clickId: string) => {
    try {
      await simulateConversion(clickId).unwrap();
    } catch (err) {
      console.error('Simulation failed:', err);
    }
  };

  if (isUserLoading) {
    return (
      <div className="min-h-screen bg-obsidian flex items-center justify-center">
        <div className="w-10 h-10 border-4 border-primary/20 border-t-primary rounded-full animate-spin" />
      </div>
    );
  }

  const stats = [
    { label: 'Pending Cashback', value: `$${user?.wallet?.pendingCashback || '0.00'}`, icon: Clock, color: 'text-yellow-400' },
    { label: 'Available Balance', value: `$${user?.wallet?.availableCashback || '0.00'}`, icon: Wallet, color: 'text-emerald-400' },
    { label: 'Lifetime Savings', value: `$${user?.wallet?.lifetimeSavings || '0.00'}`, icon: TrendingUp, color: 'text-primary' },
  ];

  return (
    <main className="min-h-screen bg-obsidian text-white pb-24 pt-32">
      <DealModal 
        isOpen={!!selectedCoupon}
        onClose={() => setSelectedCoupon(null)}
        coupon={selectedCoupon}
      />

      <div className="max-w-7xl mx-auto px-4 md:px-6 space-y-12">
        
        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <motion.h1 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="text-4xl md:text-5xl font-black tracking-tighter"
            >
              Welcome, <span className="text-primary italic">{user?.name?.split(' ')[0]}</span>.
            </motion.h1>
            <p className="text-white/40 font-bold mt-2">Manage your savings, wallet, and active deals.</p>
          </div>
          <div className="flex items-center gap-3">
            <button className="flex items-center gap-2 bg-white/5 hover:bg-white/10 border border-white/10 px-6 py-3 rounded-2xl font-bold transition-all">
              <Settings className="w-4 h-4" />
              Settings
            </button>
            <button className="flex items-center gap-2 bg-primary text-obsidian px-6 py-3 rounded-2xl font-bold transition-all shadow-xl shadow-primary/20">
              <CreditCard className="w-4 h-4" />
              Payout
            </button>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
            >
              <GlassContainer className="p-8 group relative overflow-hidden">
                <div className="absolute top-0 right-0 w-24 h-24 bg-primary/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 group-hover:bg-primary/10 transition-colors" />
                <div className="flex items-start justify-between mb-4">
                  <div className={`w-12 h-12 bg-white/5 rounded-2xl flex items-center justify-center ${stat.color}`}>
                    <stat.icon className="w-6 h-6" />
                  </div>
                  <ArrowUpRight className="w-5 h-5 text-white/20 group-hover:text-primary transition-colors" />
                </div>
                <div className="text-[10px] font-black uppercase tracking-[0.2em] text-white/20 mb-1">{stat.label}</div>
                <div className="text-3xl font-black text-foreground">{stat.value}</div>
              </GlassContainer>
            </motion.div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 pt-8">
          
          {/* Saved Coupons Section */}
          <div className="lg:col-span-2 space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-black tracking-tight">Saved Coupons</h2>
              <Link href="/deals" className="text-[10px] font-black uppercase tracking-widest text-primary border-b border-primary/20 pb-0.5">Explore More</Link>
            </div>
            
            {user?.savedCoupons?.length > 0 ? (
              <div className="grid grid-cols-1 gap-6">
                {user.savedCoupons.map((coupon: any, idx: number) => (
                  <CouponCard 
                    key={coupon._id}
                    coupon={coupon}
                    idx={idx}
                    onOpenDeal={setSelectedCoupon}
                  />
                ))}
              </div>
            ) : (
              <GlassContainer className="p-16 border-dashed border-white/10 text-center space-y-4">
                <div className="w-16 h-16 bg-white/5 rounded-full flex items-center justify-center mx-auto opacity-20">
                  <TagIcon className="w-8 h-8" />
                </div>
                <div>
                  <h3 className="font-bold text-white/60">No saved coupons yet</h3>
                  <p className="text-sm text-white/20">Click the bookmark icon on any deal to save it here.</p>
                </div>
                <Link href="/deals" className="inline-block bg-white/5 hover:bg-white/10 px-8 py-3 rounded-2xl font-bold transition-all text-xs uppercase tracking-widest">
                  View Latest Deals
                </Link>
              </GlassContainer>
            )}
          </div>

          {/* Savings History Sidebar */}
          <div className="space-y-8">
            <div className="space-y-6">
              <h2 className="text-2xl font-black tracking-tight">Savings History</h2>
              <div className="space-y-3">
                {isHistoryLoading ? (
                  [1,2,3].map(i => (
                    <div key={i} className="h-16 bg-white/5 rounded-2xl animate-pulse" />
                  ))
                ) : history.length > 0 ? (
                  history.slice(0, 5).map((item: any) => (
                    <div key={item._id} className="relative group">
                      <GlassContainer className="p-4 border-white/5 hover:border-white/10 transition-all">
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-[10px] font-black uppercase tracking-widest text-primary">
                            {item.dealId?.store || 'Store Visit'}
                          </span>
                          <span className="text-[9px] font-bold text-white/20">
                            {new Date(item.timestamp).toLocaleDateString()}
                          </span>
                        </div>
                        <div className="flex items-center justify-between gap-4">
                          <div className="flex-1">
                            <h3 className="text-xs font-bold line-clamp-1">{item.dealId?.title || 'Click Tracked'}</h3>
                            <div className="flex items-center gap-1.5 mt-1">
                              {item.status === 'converted' ? (
                                <span className="flex items-center gap-1 text-[9px] font-black text-emerald-500 uppercase tracking-tighter">
                                  <CheckCircle2 className="w-2.5 h-2.5" /> Approved
                                </span>
                              ) : (
                                <span className="flex items-center gap-1 text-[9px] font-black text-yellow-500/80 uppercase tracking-tighter">
                                  <Clock className="w-2.5 h-2.5" /> Pending
                                </span>
                              )}
                              <span className="text-[9px] font-bold text-white/20">•</span>
                              <span className="text-[10px] font-black text-foreground">+${item.estimatedCashback || '0.50'}</span>
                            </div>
                          </div>
                          
                          {item.status === 'pending' && (
                            <button 
                              onClick={() => handleSimulate(item._id)}
                              className="bg-primary/10 hover:bg-primary text-primary hover:text-obsidian p-2 rounded-xl transition-all shadow-lg"
                              title="Simulate Affiliate Confirmation"
                            >
                              <Zap className="w-3.5 h-3.5" />
                            </button>
                          )}
                        </div>
                      </GlassContainer>
                    </div>
                  ))
                ) : (
                  <div className="py-12 text-center glass rounded-3xl border-dashed border-white/5">
                    <p className="text-[10px] font-black uppercase tracking-widest text-white/20">No activity yet</p>
                  </div>
                )}
              </div>
            </div>

            <div className="bg-emerald-500/10 border border-emerald-500/20 p-8 rounded-[32px] space-y-4 group">
              <div className="flex items-center gap-3">
                <ShieldCheck className="w-6 h-6 text-emerald-500" />
                <span className="text-xs font-black uppercase tracking-widest text-emerald-500">Savings Tip</span>
              </div>
              <p className="text-sm font-bold text-emerald-100/60 leading-relaxed">
                Connect our <span className="text-emerald-500">Browser Extension</span> to automatically stack coupons with your cashback rewards!
              </p>
              <Link href="/extension" className="inline-flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-emerald-500 group-hover:translate-x-1 transition-transform">
                Get Magic <Zap className="w-3 h-3 fill-emerald-500" />
              </Link>
            </div>
          </div>

        </div>
      </div>
    </main>
  );
}
