import { useDispatch } from 'react-redux';
import { AppDispatch } from '@/redux/store';
import { logout } from '@/redux/slices/authSlice';
import { useRouter } from 'next/navigation';
import { 
  History, 
  CreditCard, 
  User, 
  Gift, 
  Heart, 
  ThumbsUp, 
  Mail, 
  Shield, 
  HelpCircle,
  Wallet
} from 'lucide-react';

interface SidebarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

const NAV_ITEMS = [
  { id: 'wallet', label: 'Wallet & Earnings', icon: Wallet },
  { id: 'activities', label: 'My activities', icon: History },
  { id: 'payments', label: 'Payments', icon: CreditCard },
  { id: 'personal', label: 'Personal Information', icon: User },
  { id: 'invite', label: 'Invite and earn', icon: Gift },
  { id: 'favorites', label: 'Favorites', icon: Heart },
  { id: 'reviews', label: 'My Reviews', icon: ThumbsUp },
  { id: 'contact', label: 'Contact Preferences', icon: Mail },
  { id: 'security', label: 'Account and Security', icon: Shield },
  { id: 'faq', label: 'Frequently Asked Questions', icon: HelpCircle },
];

export default function DashboardSidebar({ activeTab, setActiveTab }: SidebarProps) {
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();

  const handleLogout = () => {
    dispatch(logout());
    router.push('/');
  };

  return (
    <div className="w-full flex flex-col min-h-[600px]">
      <nav className="flex-1 space-y-1">
        {NAV_ITEMS.map((item) => {
          const isActive = activeTab === item.id;
          const Icon = item.icon;
          return (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`w-full flex items-center gap-4 px-6 py-4 text-[15px] font-bold transition-all
                ${isActive 
                  ? 'bg-[#eef2fb] text-[#0052cc] rounded-lg' 
                  : 'text-slate-700 hover:bg-slate-100 hover:text-slate-900 rounded-lg'
                }
              `}
            >
              <Icon className={`w-5 h-5 ${isActive ? 'text-[#0052cc]' : 'text-slate-600'}`} strokeWidth={isActive ? 2.5 : 2} />
              {item.label}
            </button>
          );
        })}
      </nav>

      <div className="mt-8 px-6">
        <button 
          onClick={handleLogout}
          className="text-[#0052cc] font-bold text-[15px] hover:underline flex items-center gap-2 transition-all"
        >
          Log out
        </button>
      </div>
    </div>
  );
}
