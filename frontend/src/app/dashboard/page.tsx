"use client";

import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '@/redux/store';
import { getMe, fetchHistory } from '@/redux/slices/authSlice';
import { useEffect, useState } from 'react';
import { User as UserIcon, X } from 'lucide-react';

import DashboardSidebar from '@/components/dashboard/DashboardSidebar';
import WalletOverview from '@/components/dashboard/WalletOverview';
import RecentActivity from '@/components/dashboard/RecentActivity';
import FavoriteStores from '@/components/dashboard/FavoriteStores';
import PaymentMethods from '@/components/dashboard/PaymentMethods';
import PersonalInformation from '@/components/dashboard/PersonalInformation';
import InviteAndEarn from '@/components/dashboard/InviteAndEarn';
import MyReviews from '@/components/dashboard/MyReviews';
import ContactPreferences from '@/components/dashboard/ContactPreferences';
import AccountSecurity from '@/components/dashboard/AccountSecurity';
import DashboardFAQ from '@/components/dashboard/DashboardFAQ';

export default function DashboardPage() {
  const dispatch = useDispatch<AppDispatch>();
  const { user, history, loading: isUserLoading } = useSelector((state: RootState) => state.auth);
  const [isHistoryLoading, setIsHistoryLoading] = useState(false);
  const [activeTab, setActiveTab] = useState('wallet');
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);

  useEffect(() => {
    dispatch(getMe());
    setIsHistoryLoading(true);
    dispatch(fetchHistory()).finally(() => setIsHistoryLoading(false));
  }, [dispatch]);

  if (isUserLoading) {
    return (
      <div className="min-h-screen bg-[#FAFAFA] flex items-center justify-center">
        <div className="w-10 h-10 border-4 border-primary/20 border-t-primary rounded-full animate-spin" />
      </div>
    );
  }

  // Map user's actual favorite stores dynamically
  const favoriteStores = user?.favoriteStores?.map((store: any, index: number) => ({
    id: store._id || index,
    name: store.name || 'Unknown Store',
    slug: store.slug || '',
    logo: store.logoUrl || `https://ui-avatars.com/api/?name=${encodeURIComponent(store.name || 'S')}&background=FF9800&color=fff&size=128`,
    cashback: store.cashbackRate ? `${store.cashbackRate}%` : 'Active Partner',
  })) || [];

  return (
    <main className="min-h-screen bg-[#FAFAFA] text-slate-900 pb-24 pt-24 md:pt-32">
      <div className="max-w-[1440px] mx-auto px-4 md:px-8">
        
        {/* Mobile Header (Hidden on Desktop) */}
        <div className="lg:hidden flex items-center justify-between bg-white p-4 rounded-[20px] shadow-sm mb-6 border border-slate-100">
          <h1 className="text-xl font-bold capitalize text-slate-800 font-serif" style={{ fontFamily: 'Georgia, serif' }}>
            {activeTab.replace('-', ' ')}
          </h1>
          <button 
            onClick={() => setIsMobileSidebarOpen(true)}
            className="w-10 h-10 bg-[#eef2fb] text-[#0052cc] rounded-full flex items-center justify-center transition-all active:scale-95"
          >
            {user?.name ? (
              <span className="font-bold text-sm">{user.name.charAt(0).toUpperCase()}</span>
            ) : (
              <UserIcon className="w-5 h-5" />
            )}
          </button>
        </div>

        {/* Mobile Sidebar Overlay */}
        {isMobileSidebarOpen && (
          <div className="fixed inset-0 z-[100] lg:hidden flex justify-end">
            <div 
              className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm" 
              onClick={() => setIsMobileSidebarOpen(false)} 
            />
            <div className="relative w-[80%] max-w-sm bg-white h-full shadow-2xl overflow-y-auto transform transition-transform animate-slide-in-right">
              <div className="flex justify-between items-center p-6 border-b border-slate-100">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-[#eef2fb] text-[#0052cc] rounded-full flex items-center justify-center font-bold">
                    {user?.name?.charAt(0).toUpperCase() || 'U'}
                  </div>
                  <div>
                    <h2 className="font-bold text-slate-800 leading-tight">{user?.name || 'User'}</h2>
                    <p className="text-xs text-slate-500">Menu</p>
                  </div>
                </div>
                <button 
                  onClick={() => setIsMobileSidebarOpen(false)} 
                  className="p-2 bg-slate-50 rounded-full text-slate-400 hover:bg-slate-100 transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
              <div className="p-4">
                <DashboardSidebar 
                  activeTab={activeTab} 
                  setActiveTab={(tab) => {
                    setActiveTab(tab);
                    setIsMobileSidebarOpen(false); // Close mobile sidebar on tab click
                  }} 
                />
              </div>
            </div>
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          
          {/* Left Sidebar (Desktop Only) */}
          <div className="hidden lg:block lg:col-span-3">
            <DashboardSidebar activeTab={activeTab} setActiveTab={setActiveTab} />
          </div>

          {/* Right Main Content */}
          <div className="lg:col-span-9 bg-transparent rounded-2xl">
            {activeTab === 'wallet' && <WalletOverview user={user} />}
            {activeTab === 'activities' && <RecentActivity history={history} isLoading={isHistoryLoading} />}
            
            {activeTab === 'payments' && (
              <div className="space-y-8">
                <h2 className="text-[32px] font-medium tracking-tight text-[#111827] font-serif hidden lg:block" style={{ fontFamily: 'Georgia, serif' }}>
                  Payments
                </h2>
                <PaymentMethods user={user} />
              </div>
            )}
            
            {activeTab === 'favorites' && (
              <div className="space-y-8">
                <h2 className="text-[32px] font-medium tracking-tight text-[#111827] font-serif hidden lg:block" style={{ fontFamily: 'Georgia, serif' }}>
                  Favorites
                </h2>
                <div className="max-w-md">
                  <FavoriteStores stores={favoriteStores} />
                </div>
              </div>
            )}
            
            {activeTab === 'personal' && <PersonalInformation user={user} />}
            {activeTab === 'invite' && <InviteAndEarn user={user} />}
            {activeTab === 'reviews' && <MyReviews />}
            {activeTab === 'contact' && <ContactPreferences />}
            {activeTab === 'security' && <AccountSecurity />}
            {activeTab === 'faq' && <DashboardFAQ />}

          </div>
          
        </div>
      </div>
    </main>
  );
}
