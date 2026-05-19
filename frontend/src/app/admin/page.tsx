"use client";

import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState, AppDispatch } from '@/redux/store';
import { getMe } from '@/redux/slices/authSlice';
import api from '@/redux/api';
import { 
  ShieldAlert, 
  RefreshCw, 
  Zap, 
  ShieldCheck, 
  Coins, 
  ChevronLeft,
  ChevronRight
} from 'lucide-react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';

export default function AdminDashboard() {
  const dispatch = useDispatch<AppDispatch>();
  const { user, isAuthenticated, loading: authLoading } = useSelector((state: RootState) => state.auth);

  const [clicks, setClicks] = useState<any[]>([]);
  const [clicksLoading, setClicksLoading] = useState(true);
  const [syncLoading, setSyncLoading] = useState(false);
  const [syncMessage, setSyncMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);
  const [simulationLoading, setSimulationLoading] = useState<string | null>(null);

  // Pagination states
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;

  // Fetch logged-in user profile on load to ensure roles are active
  useEffect(() => {
    dispatch(getMe());
  }, [dispatch]);

  // Fetch recent clicks if authenticated and is an admin
  const fetchRecentClicks = async () => {
    try {
      setClicksLoading(true);
      const res = await api.get('/admin/clicks');
      if (res.data.success) {
        setClicks(res.data.data);
        setCurrentPage(1); // Reset to page 1 on fresh load
      }
    } catch (err) {
      console.error('Failed to load click logs:', err);
    } finally {
      setClicksLoading(false);
    }
  };

  useEffect(() => {
    if (isAuthenticated && user?.role === 'admin') {
      fetchRecentClicks();
    }
  }, [isAuthenticated, user]);

  // Handle Manual Admitad Sync
  const handleSync = async () => {
    try {
      setSyncLoading(true);
      setSyncMessage(null);
      const res = await api.post('/admin/sync-admitad');
      if (res.data.success) {
        setSyncMessage({
          type: 'success',
          text: res.data.message || 'Successfully synced all stores and coupons from Admitad!'
        });
      }
    } catch (err: any) {
      setSyncMessage({
        type: 'error',
        text: err.response?.data?.message || 'Sync failed. Please check backend environment keys.'
      });
    } finally {
      setSyncLoading(false);
    }
  };

  // Simulate Payout conversion
  const handleSimulateConversion = async (clickId: string) => {
    try {
      setSimulationLoading(clickId);
      const res = await api.post(`/admin/simulate-conversion/${clickId}`);
      if (res.data.success) {
        // Update local status of conversion
        setClicks(prev => prev.map(c => c._id === clickId ? { ...c, status: 'converted' } : c));
      }
    } catch (err) {
      console.error('Conversion simulation failed:', err);
    } finally {
      setSimulationLoading(null);
    }
  };

  // Pagination Calculation
  const totalPages = Math.ceil(clicks.length / itemsPerPage);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentClicks = clicks.slice(indexOfFirstItem, indexOfLastItem);

  // Loading Screen while resolving Authentication
  if (authLoading) {
    return (
      <div className="min-h-screen bg-[#F8F9FA] pt-32 flex flex-col items-center justify-center">
        <RefreshCw className="w-12 h-12 text-[#FF9800] animate-spin mb-4" />
        <span className="font-['Manrope'] font-bold text-slate-500">Checking credentials...</span>
      </div>
    );
  }

  // Access Denied Screen if user is NOT an Admin
  if (!isAuthenticated || user?.role !== 'admin') {
    return (
      <div className="min-h-screen bg-[#F8F9FA] pt-32 px-4 flex flex-col items-center justify-center">
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-white p-12 rounded-[40px] shadow-xl border border-slate-100 max-w-[500px] text-center space-y-6"
        >
          <div className="w-20 h-20 bg-rose-50 rounded-3xl flex items-center justify-center mx-auto">
            <ShieldAlert className="w-10 h-10 text-rose-500" />
          </div>
          <h1 className="text-3xl font-black text-[#1A1C1C]">Access Denied</h1>
          <p className="text-slate-400 font-semibold leading-relaxed">
            You do not have administrative privileges to access the control panel. Please log in with an authorized admin account.
          </p>
          <div className="flex flex-col gap-3">
            <Link 
              href="/auth/login" 
              className="px-8 py-4 bg-[#1A1C1C] hover:bg-[#FF9800] text-white rounded-2xl font-black text-[13px] uppercase tracking-widest transition-colors shadow-lg shadow-black/10"
              id="admin-login-btn"
            >
              Login as Admin
            </Link>
            <Link href="/" className="text-slate-400 hover:text-[#1A1C1C] font-bold text-sm">
              Return to Home
            </Link>
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="bg-[#F8F9FA] min-h-screen pt-32 pb-24 font-['Manrope']">
      <div className="max-w-[1400px] mx-auto px-4 md:px-8 space-y-12">
        
        {/* Dashboard Title & Quick Stats */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-amber-50 border border-amber-100 rounded-full text-[#FF9800] text-[11px] font-black uppercase tracking-[2px] mb-4">
              <ShieldCheck className="w-4 h-4" />
              Secure Administration
            </div>
            <h1 className="text-[40px] font-black text-[#1A1C1C] tracking-tight leading-tight">
              Admin Control Center
            </h1>
            <p className="text-slate-500 font-bold text-[15px] mt-1">
              Synchronize affiliate networks, manage offers, and simulate payouts.
            </p>
          </div>

          <div className="flex items-center gap-4 bg-white px-8 py-5 border border-slate-100 rounded-3xl shadow-sm">
            <div className="w-12 h-12 bg-emerald-50 rounded-2xl flex items-center justify-center">
              <ShieldCheck className="w-6 h-6 text-emerald-500" />
            </div>
            <div>
              <span className="block text-[9px] font-black text-slate-300 uppercase tracking-widest leading-none mb-1">Status</span>
              <span className="block text-[15px] font-black text-[#1A1C1C]">Auto-Sync Enabled</span>
            </div>
          </div>
        </div>

        {/* Sync Operations Card */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          <div className="lg:col-span-4 bg-white rounded-[40px] p-8 border border-slate-100 shadow-sm flex flex-col justify-between space-y-8 relative overflow-hidden group">
            <div className="space-y-6">
              <div className="w-16 h-16 bg-orange-50 rounded-3xl flex items-center justify-center text-[#FF9800]">
                <RefreshCw className={`w-8 h-8 ${syncLoading ? 'animate-spin' : ''}`} />
              </div>
              <div className="space-y-2">
                <h3 className="text-2xl font-black text-[#1A1C1C]">Admitad Offers Sync</h3>
                <p className="text-slate-400 font-semibold text-[14px] leading-relaxed">
                  Triggers a complete import of campaign structures, stores, promo codes, and link-based clearance deals.
                </p>
              </div>
            </div>

            <div className="space-y-4">
              <button
                onClick={handleSync}
                disabled={syncLoading}
                className="w-full h-16 bg-[#1A1C1C] hover:bg-[#FF9800] text-white disabled:bg-slate-200 rounded-2xl font-black text-[13px] uppercase tracking-widest transition-colors flex items-center justify-center gap-3 shadow-lg shadow-black/10"
                id="admin-sync-btn"
              >
                {syncLoading ? (
                  <>
                    <RefreshCw className="w-5 h-5 animate-spin" />
                    Synchronizing...
                  </>
                ) : (
                  <>
                    <RefreshCw className="w-5 h-5" />
                    Sync Admitad Offers
                  </>
                )}
              </button>

              <AnimatePresence>
                {syncMessage && (
                  <motion.div 
                    initial={{ opacity: 0, y: 5 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    className={`p-4 rounded-2xl text-[13px] font-black uppercase tracking-wider text-center ${
                      syncMessage.type === 'success' ? 'bg-emerald-50 text-emerald-600 border border-emerald-100' : 'bg-rose-50 text-rose-600 border border-rose-100'
                    }`}
                  >
                    {syncMessage.text}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
            
            <div className="absolute -right-12 -bottom-12 w-32 h-32 bg-orange-50/20 rounded-full blur-2xl group-hover:bg-[#FF9800]/5 transition-colors" />
          </div>

          {/* Quick instructions / Help */}
          <div className="lg:col-span-8 bg-gradient-to-br from-[#1A1C1C] to-[#2B2D2E] rounded-[40px] p-10 text-white flex flex-col justify-between space-y-8">
            <div className="space-y-4">
              <div className="inline-flex px-3.5 py-1.5 bg-[#FF9800]/10 border border-[#FF9800]/20 rounded-full text-[#FF9800] text-[10px] font-black uppercase tracking-widest">
                Testing Walkthrough
              </div>
              <h2 className="text-3xl font-black leading-tight tracking-tight">How to Test Your Affiliate Flow</h2>
              <p className="text-white/50 font-bold text-[15px] leading-relaxed max-w-[650px]">
                We have separated Coupons and Deals cleanly. When a user shops through a direct Cashback Link, our system tracks their click in the background. Use the simulator below to manually credit simulated conversions and check user balances instantly!
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-white/5 border border-white/10 rounded-2xl p-6 space-y-2">
                <span className="text-[#FF9800] font-black text-lg">Step 1</span>
                <p className="text-[12px] font-bold text-white/60 leading-relaxed">Shop via any dynamic Cashback rate card on the website frontend.</p>
              </div>
              <div className="bg-white/5 border border-white/10 rounded-2xl p-6 space-y-2">
                <span className="text-[#FF9800] font-black text-lg">Step 2</span>
                <p className="text-[12px] font-bold text-white/60 leading-relaxed">Check the simulator table below. Your tracked click will appear instantly.</p>
              </div>
              <div className="bg-white/5 border border-white/10 rounded-2xl p-6 space-y-2">
                <span className="text-[#FF9800] font-black text-lg">Step 3</span>
                <p className="text-[12px] font-bold text-white/60 leading-relaxed">Click 'Simulate Payout' to instantly credit simulated cashback to your user profile!</p>
              </div>
            </div>
          </div>
        </div>

        {/* Click Simulator Table */}
        <div className="bg-white rounded-[40px] p-8 border border-slate-100 shadow-sm space-y-6">
          <div className="flex items-center justify-between border-b border-slate-50 pb-6">
            <div>
              <h3 className="text-2xl font-black text-[#1A1C1C]">Cashback Conversion Simulator</h3>
              <p className="text-slate-400 font-bold text-[14px]">
                A real-time list of all click logs generated by users visiting store affiliate offers.
              </p>
            </div>
            <button 
              onClick={fetchRecentClicks}
              className="p-3 bg-slate-50 border border-slate-100 hover:bg-slate-100 rounded-xl text-slate-500 transition-colors"
              title="Refresh logs"
              id="admin-refresh-clicks-btn"
            >
              <RefreshCw className="w-5 h-5" />
            </button>
          </div>

          {clicksLoading ? (
            <div className="py-20 flex flex-col items-center justify-center">
              <RefreshCw className="w-8 h-8 text-slate-300 animate-spin mb-3" />
              <span className="text-slate-400 text-sm font-bold">Fetching recent clicks...</span>
            </div>
          ) : clicks.length === 0 ? (
            <div className="py-20 text-center border border-dashed border-slate-100 rounded-3xl text-slate-400 font-bold">
              No recent clicks found. Try clicking a cashback link on a store page first!
            </div>
          ) : (
            <>
              <div className="overflow-x-auto">
                <table className="w-full min-w-[900px] border-collapse">
                  <thead>
                    <tr className="border-b border-slate-50 text-[10px] font-black uppercase tracking-widest text-slate-400 text-left">
                      <th className="pb-4 pl-4">Store / Campaign</th>
                      <th className="pb-4">User</th>
                      <th className="pb-4">Est. Cashback</th>
                      <th className="pb-4">Click Time</th>
                      <th className="pb-4">Status</th>
                      <th className="pb-4 pr-4 text-center">Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-50">
                    {currentClicks.map((click) => {
                      const clickDate = new Date(click.createdAt).toLocaleString();
                      const isConverted = click.status === 'converted';

                      return (
                        <tr key={click._id} className="hover:bg-slate-50/50 transition-colors">
                          {/* Store info */}
                          <td className="py-5 pl-4 flex items-center gap-3">
                            <div className="w-10 h-10 bg-slate-50 border border-slate-100 rounded-xl flex items-center justify-center font-black text-xs text-[#FF9800]">
                              {click.storeName?.substring(0,2) || 'ST'}
                            </div>
                            <div>
                              <span className="block font-black text-[14px] text-[#1A1C1C]">{click.storeName}</span>
                              <span className="block text-[10px] font-semibold text-slate-400 uppercase tracking-tight">Click ID: {click._id.substring(12)}</span>
                            </div>
                          </td>

                          {/* User email */}
                          <td className="py-5">
                            <span className="block font-bold text-[14px] text-[#1A1C1C]">{click.userId?.name || 'Anonymous User'}</span>
                            <span className="block text-[11px] text-slate-400 font-medium">{click.userId?.email || 'No Email'}</span>
                          </td>

                          {/* Estimated Cashback */}
                          <td className="py-5">
                            <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-amber-50 text-[#FF9800] rounded-full text-xs font-black">
                              <Coins className="w-3.5 h-3.5" />
                              ${click.estimatedCashback?.toFixed(2) || '1.00'}
                            </span>
                          </td>

                          {/* Click Time */}
                          <td className="py-5">
                            <span className="text-[13px] text-slate-500 font-bold">{clickDate}</span>
                          </td>

                          {/* Status */}
                          <td className="py-5">
                            {isConverted ? (
                              <span className="inline-flex items-center gap-1 bg-emerald-50 text-emerald-600 px-2.5 py-1 rounded-full text-[10px] font-black uppercase tracking-wider border border-emerald-100">
                                <ShieldCheck className="w-3.5 h-3.5" />
                                Converted
                              </span>
                            ) : (
                              <span className="inline-flex items-center gap-1 bg-orange-50 text-orange-600 px-2.5 py-1 rounded-full text-[10px] font-black uppercase tracking-wider border border-orange-100">
                                <Zap className="w-3.5 h-3.5" />
                                Pending
                              </span>
                            )}
                          </td>

                          {/* Action simulator button */}
                          <td className="py-5 pr-4 text-center">
                            {isConverted ? (
                              <div className="text-emerald-500 font-black text-[11px] uppercase tracking-widest flex items-center justify-center gap-1">
                                <ShieldCheck className="w-4 h-4" />
                                Credited
                              </div>
                            ) : (
                              <button
                                onClick={() => handleSimulateConversion(click._id)}
                                disabled={simulationLoading === click._id || !click.userId}
                                className="px-5 py-2.5 bg-orange-50 hover:bg-[#FF9800] text-[#FF9800] hover:text-white disabled:bg-slate-100 disabled:text-slate-400 rounded-xl font-black text-[11px] uppercase tracking-widest transition-all inline-flex items-center gap-2 border border-[#FF9800]/10"
                                id={`simulate-btn-${click._id}`}
                              >
                                {simulationLoading === click._id ? (
                                  <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                                ) : (
                                  <Zap className="w-3.5 h-3.5" />
                                )}
                                Simulate Payout
                              </button>
                            )}
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>

              {/* Dynamic Pagination Controls */}
              {totalPages > 1 && (
                <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-6 border-t border-slate-100 mt-6 font-['Manrope']">
                  <span className="text-[13px] font-bold text-slate-400">
                    Showing {indexOfFirstItem + 1} to {Math.min(indexOfLastItem, clicks.length)} of {clicks.length} click logs
                  </span>
                  
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                      disabled={currentPage === 1}
                      className="w-10 h-10 rounded-xl border border-slate-100 bg-white hover:bg-slate-50 disabled:bg-slate-50 disabled:opacity-50 flex items-center justify-center text-slate-500 font-bold transition-all"
                    >
                      <ChevronLeft className="w-5 h-5" />
                    </button>
                    
                    {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                      <button
                        key={page}
                        onClick={() => setCurrentPage(page)}
                        className={`w-10 h-10 rounded-xl font-black text-xs transition-all ${
                          currentPage === page
                            ? 'bg-[#FF9800] text-white shadow-lg shadow-orange-500/20'
                            : 'border border-slate-100 bg-white hover:bg-slate-50 text-slate-500'
                        }`}
                      >
                        {page}
                      </button>
                    ))}

                    <button
                      onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                      disabled={currentPage === totalPages}
                      className="w-10 h-10 rounded-xl border border-slate-100 bg-white hover:bg-slate-50 disabled:bg-slate-50 disabled:opacity-50 flex items-center justify-center text-slate-500 font-bold transition-all"
                    >
                      <ChevronRight className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              )}
            </>
          )}
        </div>

      </div>
    </div>
  );
}
