"use client";

import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '@/redux/store';
import { addPayoutMethod } from '@/redux/slices/authSlice';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, X, Loader2, CheckCircle2 } from 'lucide-react';

export default function PaymentMethods({ user }: { user: any }) {
  const dispatch = useDispatch<AppDispatch>();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [email, setEmail] = useState('');

  const handleSavePayout = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.includes('@')) return;
    
    setIsSaving(true);
    await dispatch(addPayoutMethod({ email }));
    setIsSaving(false);
    setIsModalOpen(false);
    setEmail(''); // reset
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3 }}
      className="pt-8 space-y-6"
    >
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold tracking-tight text-slate-800">Withdrawal Methods</h2>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        
        {user?.payoutMethods && user.payoutMethods.length > 0 ? (
          user.payoutMethods.slice(0, 1).map((method: any, idx: number) => {
            return (
              <div 
                key={method._id || idx} 
                className="p-6 rounded-3xl shadow-xl relative overflow-hidden h-[180px] flex flex-col justify-between border bg-[#003087] border-[#001c52] text-white"
              >
                <div className="absolute top-0 right-0 w-48 h-48 rounded-full blur-3xl -translate-y-1/2 translate-x-1/4 bg-[#0079C1]/30" />
                <div className="flex items-center justify-between relative z-10">
                  <div className="flex items-center gap-2">
                    <svg viewBox="0 0 124 33" className="h-6 w-auto fill-white" xmlns="http://www.w3.org/2000/svg">
                      <path d="M46.211 6.749h-6.839a.95.95 0 00-.939.802l-2.766 17.537a.57.57 0 00.564.658h3.265a.95.95 0 00.939-.803l.746-4.73a.95.95 0 01.938-.803h2.165c4.505 0 7.105-2.18 7.784-6.5.306-1.89.013-3.375-.872-4.415-1.132-1.326-3.113-1.746-5.02-1.746zM47.07 14.999c-.416 2.641-2.783 2.641-4.637 2.641h-1.032l1.096-6.953h.842c1.455 0 3.013.23 3.447 1.258.261.616.425 1.701.284 3.054zM66.264 6.749h-3.722a.95.95 0 00-.901.65l-1.637 5.258-2.617-5.385a.95.95 0 00-.853-.523h-3.834a.57.57 0 00-.472.887l4.887 7.025-2.827 8.04a.57.57 0 00.538.759h3.69a.95.95 0 00.895-.623l7.301-15.197a.57.57 0 00-.448-.891zM84.218 6.749h-6.84a.95.95 0 00-.938.802l-2.766 17.537a.57.57 0 00.564.658h3.265a.95.95 0 00.939-.803l.746-4.73a.95.95 0 01.938-.803h2.164c4.506 0 7.105-2.18 7.785-6.5.306-1.89.012-3.375-.873-4.415-1.132-1.326-3.113-1.746-5.02-1.746zM85.077 14.999c-.416 2.641-2.783 2.641-4.637 2.641h-1.031l1.095-6.953h.842c1.456 0 3.014.23 3.447 1.258.262.616.425 1.701.284 3.054zM102.775 6.749h-3.66a.95.95 0 00-.92.709l-1.076 4.14-1.684-4.225a.95.95 0 00-.885-.624h-3.793a.57.57 0 00-.475.9l3.522 6.845-2.029 9.69a.57.57 0 00.557.687h3.364a.95.95 0 00.923-.728l5.632-16.516a.57.57 0 00-.476-.878zM120.457 6.749h-3.414a.95.95 0 00-.939.803l-2.61 16.552a.95.95 0 01-.938.803h-1.921a.57.57 0 00-.564.658l.192 1.222a.57.57 0 00.563.481h2.951a.95.95 0 00.939-.803l2.802-17.77a.57.57 0 00-.564-.658z"/>
                      <path d="M22.024 11.53c-.314-2.027-1.666-3.454-4.004-3.454h-7.6a1.14 1.14 0 00-1.127.962L6.155 28.97a.68.68 0 00.676.79h5.116a1.14 1.14 0 001.127-.962l.704-4.468a1.14 1.14 0 011.127-.963h2.368c3.957 0 6.643-1.68 7.375-5.328.322-1.603.18-3.047-.532-4.285-.56-1.026-1.6-1.745-2.731-2.091z" fill="#003087"/>
                      <path d="M25.048 6.136C24.321 2.302 21.054.49 16.27.49H7.669A1.14 1.14 0 006.542 1.45l-3.376 21.41a.68.68 0 00.676.79h4.382l1.624-10.297a1.14 1.14 0 011.127-.962h3.332c5.034 0 8.455-2.145 9.388-6.796.347-1.724.168-3.32-.472-4.664a7.11 7.11 0 00-.181-.365c-.244-.452-.56-.848-.946-1.18-.769-.64-1.782-1.03-2.936-1.181a4.23 4.23 0 00-.063-.008z" fill="#0079C1"/>
                    </svg>
                  </div>
                  <div className="flex flex-col items-end">
                    <div className="flex items-center gap-1.5 bg-emerald-500/20 text-emerald-300 text-[10px] font-black uppercase px-2 py-1 rounded-full border border-emerald-500/30">
                      <CheckCircle2 className="w-3 h-3" /> Connected
                    </div>
                  </div>
                </div>
                <div className="space-y-4 relative z-10">
                  <div className="text-lg font-bold text-white/90 truncate">
                    {method.email}
                  </div>
                  <div className="flex items-end justify-between">
                    <div>
                      <div className="text-[9px] uppercase tracking-widest text-white/50">Verified Account</div>
                      <div className="text-sm font-bold mt-0.5 text-white">{user?.name}</div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })
        ) : (
          <div 
            onClick={() => setIsModalOpen(true)}
            className="group border-2 border-dashed border-slate-300 bg-slate-50/50 rounded-3xl p-6 h-[180px] flex flex-col items-center justify-center gap-4 hover:border-primary hover:bg-primary/5 transition-all cursor-pointer"
          >
            <div className="w-14 h-14 bg-white rounded-full flex items-center justify-center text-slate-400 group-hover:text-primary group-hover:scale-110 transition-all shadow-sm border border-slate-200 group-hover:border-primary/30">
              <Plus className="w-6 h-6" />
            </div>
            <span className="text-sm font-bold text-slate-500 group-hover:text-primary transition-colors">Connect PayPal</span>
          </div>
        )}

      </div>

      {/* Connect PayPal Modal */}
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
                <h3 className="text-xl font-black text-slate-800 tracking-tight">Connect PayPal</h3>
                <button 
                  onClick={() => setIsModalOpen(false)}
                  className="w-8 h-8 bg-slate-100 rounded-full flex items-center justify-center text-slate-500 hover:bg-slate-200 hover:text-slate-700 transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              <div className="text-sm text-slate-500 font-medium mb-6">
                Enter your PayPal email address. We will send your approved cashback directly to this account.
              </div>

              <form onSubmit={handleSavePayout} className="space-y-6">
                <div>
                  <label className="block text-[11px] font-black uppercase tracking-widest text-slate-400 mb-2">PayPal Email</label>
                  <input 
                    type="email" 
                    placeholder="e.g. alex@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-5 py-4 text-sm font-bold text-slate-700 focus:outline-none focus:border-primary focus:ring-4 focus:ring-primary/10 transition-all placeholder:font-medium placeholder:text-slate-300"
                    required
                  />
                </div>

                <button 
                  type="submit" 
                  disabled={isSaving || !email.includes('@')}
                  className="w-full bg-[#003087] hover:bg-[#001c52] text-white font-black text-sm py-4 rounded-2xl shadow-lg shadow-blue-900/20 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 mt-4"
                >
                  {isSaving ? <Loader2 className="w-5 h-5 animate-spin" /> : 'Save Payout Method'}
                </button>
              </form>
            </motion.div>
          </>
        )}
      </AnimatePresence>

    </motion.div>
  );
}
