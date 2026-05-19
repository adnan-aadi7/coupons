"use client";

import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '@/redux/store';
import { updateProfile } from '@/redux/slices/authSlice';

export default function ContactPreferences() {
  const dispatch = useDispatch<AppDispatch>();
  const { user } = useSelector((state: RootState) => state.auth);

  const [preferences, setPreferences] = useState({
    deals: true,
    cashback: true,
    newsletter: false,
    sms: false
  });
  
  const [isSaving, setIsSaving] = useState(false);

  // Load preferences from Redux on mount
  useEffect(() => {
    if (user?.contactPreferences) {
      setPreferences(user.contactPreferences);
    }
  }, [user]);

  const togglePref = (key: keyof typeof preferences) => {
    setPreferences(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const handleSave = async () => {
    setIsSaving(true);
    await dispatch(updateProfile({ contactPreferences: preferences }));
    setIsSaving(false);
  };

  const PreferenceToggle = ({ id, title, desc }: { id: keyof typeof preferences, title: string, desc: string }) => (
    <div className="flex items-center justify-between py-6 border-b border-slate-100 last:border-0">
      <div className="pr-8">
        <h3 className="font-bold text-slate-800">{title}</h3>
        <p className="text-slate-500 text-sm mt-1">{desc}</p>
      </div>
      <button 
        onClick={() => togglePref(id)}
        className={`relative w-14 h-7 rounded-full transition-colors flex-shrink-0 ${
          preferences[id] ? 'bg-emerald-500' : 'bg-slate-200'
        }`}
      >
        <div className={`absolute top-1 w-5 h-5 bg-white rounded-full shadow-sm transition-all duration-300 ${
          preferences[id] ? 'left-8' : 'left-1'
        }`} />
      </button>
    </div>
  );

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="w-full space-y-8"
    >
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <h2 className="text-[32px] font-medium tracking-tight text-[#111827] font-serif" style={{ fontFamily: 'Georgia, serif' }}>
          Contact Preferences
        </h2>
        <button 
          onClick={handleSave}
          disabled={isSaving}
          className="bg-[#242b47] hover:bg-[#1a1f33] text-white px-8 py-2.5 rounded-[24px] text-[14px] font-bold transition-all shadow-sm self-start md:self-auto"
        >
          {isSaving ? 'Saving...' : 'Save Settings'}
        </button>
      </div>

      <div className="bg-white rounded-[24px] shadow-[0_2px_10px_rgba(0,0,0,0.02)] p-8">
        <h3 className="text-lg font-bold text-slate-800 mb-6">Email Notifications</h3>
        
        <div className="flex flex-col">
          <PreferenceToggle 
            id="deals" 
            title="Deal Alerts" 
            desc="Get notified about exclusive deals from your favorite stores." 
          />
          <PreferenceToggle 
            id="cashback" 
            title="Cashback Confirmations" 
            desc="Receive emails when your cashback tracks successfully or is ready to withdraw." 
          />
          <PreferenceToggle 
            id="newsletter" 
            title="Weekly Newsletter" 
            desc="A weekly digest of the best deals, coupons, and wealth-generation tips." 
          />
        </div>

        <h3 className="text-lg font-bold text-slate-800 mt-10 mb-6">SMS Notifications</h3>
        <div className="flex flex-col border-t border-slate-100">
          <PreferenceToggle 
            id="sms" 
            title="Account Alerts" 
            desc="Get text messages for important account security alerts and withdrawal confirmations." 
          />
        </div>
      </div>
    </motion.div>
  );
}
