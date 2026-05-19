"use client";

import { motion } from 'framer-motion';
import { User, Mail, Phone, MapPin } from 'lucide-react';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '@/redux/store';
import { updateProfile } from '@/redux/slices/authSlice';

export default function PersonalInformation({ user }: { user: any }) {
  const dispatch = useDispatch<AppDispatch>();
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: user?.name || '',
    phoneNumber: user?.phoneNumber || '',
    country: user?.country || 'United States'
  });
  const [isSaving, setIsSaving] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSave = async () => {
    if (!isEditing) {
      setIsEditing(true);
      return;
    }
    
    setIsSaving(true);
    await dispatch(updateProfile(formData));
    setIsSaving(false);
    setIsEditing(false);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="w-full space-y-8"
    >
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <h2 className="text-[32px] font-medium tracking-tight text-[#111827] font-serif" style={{ fontFamily: 'Georgia, serif' }}>
          Personal Information
        </h2>
        <button 
          onClick={handleSave}
          disabled={isSaving}
          className={`px-8 py-2.5 rounded-[24px] text-[14px] font-bold transition-all shadow-sm self-start md:self-auto ${
            isEditing 
              ? 'bg-emerald-500 hover:bg-emerald-600 text-white' 
              : 'bg-[#242b47] hover:bg-[#1a1f33] text-white'
          }`}
        >
          {isSaving ? 'Saving...' : isEditing ? 'Update Profile' : 'Edit Profile'}
        </button>
      </div>

      <div className="bg-white rounded-[24px] shadow-[0_2px_10px_rgba(0,0,0,0.02)] p-8">
        <div className="flex items-center gap-6 mb-8 pb-8 border-b border-slate-100">
          <div className="w-20 h-20 bg-[#eef2fb] rounded-full flex items-center justify-center text-[#0052cc] text-2xl font-bold uppercase">
            {user?.name?.charAt(0) || 'U'}
          </div>
          <div>
            <h3 className="text-xl font-bold text-[#111827] capitalize">{user?.name || 'User'}</h3>
            <p className="text-slate-500 text-sm mt-1">Member since {new Date(user?.createdAt || Date.now()).getFullYear()}</p>
          </div>
        </div>

        <form className="space-y-6 max-w-2xl" onSubmit={(e) => e.preventDefault()}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-sm font-bold text-slate-700 flex items-center gap-2">
                <User className="w-4 h-4 text-slate-400" /> Full Name
              </label>
              <input 
                type="text" 
                name="name"
                value={formData.name}
                onChange={handleChange}
                readOnly={!isEditing}
                className={`w-full border rounded-xl px-4 py-3 text-slate-700 focus:outline-none transition-all ${
                  isEditing ? 'bg-white border-blue-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-100' : 'bg-slate-50 border-slate-200'
                }`}
              />
            </div>
            
            <div className="space-y-2">
              <label className="text-sm font-bold text-slate-700 flex items-center gap-2">
                <Mail className="w-4 h-4 text-slate-400" /> Email Address
              </label>
              <input 
                type="email" 
                value={user?.email || ''} 
                readOnly
                title="Email cannot be changed"
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-slate-500 focus:outline-none cursor-not-allowed"
              />
            </div>
            
            <div className="space-y-2">
              <label className="text-sm font-bold text-slate-700 flex items-center gap-2">
                <Phone className="w-4 h-4 text-slate-400" /> Phone Number
              </label>
              <input 
                type="tel" 
                name="phoneNumber"
                value={formData.phoneNumber}
                onChange={handleChange}
                placeholder="Not provided"
                readOnly={!isEditing}
                className={`w-full border rounded-xl px-4 py-3 text-slate-700 focus:outline-none transition-all ${
                  isEditing ? 'bg-white border-blue-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-100' : 'bg-slate-50 border-slate-200'
                }`}
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-bold text-slate-700 flex items-center gap-2">
                <MapPin className="w-4 h-4 text-slate-400" /> Country/Region
              </label>
              <input 
                type="text" 
                name="country"
                value={formData.country}
                onChange={handleChange}
                readOnly={!isEditing}
                className={`w-full border rounded-xl px-4 py-3 text-slate-700 focus:outline-none transition-all ${
                  isEditing ? 'bg-white border-blue-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-100' : 'bg-slate-50 border-slate-200'
                }`}
              />
            </div>
          </div>
        </form>
      </div>
    </motion.div>
  );
}
