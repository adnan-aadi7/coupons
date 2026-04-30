"use client";

import Link from 'next/link';
import { Search, User as UserIcon, Menu, X, ChevronDown, LogOut, LayoutDashboard } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';
import { useGetMeQuery, useLogoutMutation } from '@/redux/api/authApi';
import { useRouter, usePathname } from 'next/navigation';

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const { data: userData } = useGetMeQuery({});
  const [logout] = useLogoutMutation();
  const router = useRouter();
  const pathname = usePathname();

  const user = userData?.data;

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLogout = async () => {
    await logout({}).unwrap();
    router.push('/');
  };

  const navLinks = [
    { name: 'Stores', href: '/stores' },
    { name: 'Categories', href: '/categories' },
    { name: 'Hot Deals', href: '/hot-deals' },
    { name: 'Cashback', href: '/cashback' },
    { name: 'Coupons', href: '/deals' },
  ];

  return (
    <>
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? 'bg-white/90 backdrop-blur-xl border-b border-slate-100 shadow-xl shadow-slate-200/50' : 'bg-white'} py-4`}>
        <div className="max-w-[1280px] mx-auto px-8">
          <div className="flex items-center justify-between h-[37px]">

            {/* Left: Logo */}
            <Link href="/" className="flex items-center shrink-0">
              <span className="font-['Manrope'] font-black text-[24px] text-[#F97316] tracking-[-0.6px] leading-[32px]">
                SmartSaver
              </span>
            </Link>

            {/* Middle: Desktop Nav Links */}
            <div className="hidden lg:flex items-center gap-8">
              {navLinks.map((link) => {
                // Hardcoding Stores as active for the visual match if we are on home page, otherwise use exact match
                const isActive = pathname === link.href || (pathname === '/' && link.name === 'Stores');
                
                return (
                  <Link
                    key={link.name}
                    href={link.href}
                    className={`font-['Manrope'] font-medium text-[14px] leading-[20px] tracking-[0.35px] transition-all flex flex-col ${
                      isActive ? 'text-[#EA580C] border-b-[2px] border-[#F97316] pb-1' : 'text-[#475569] hover:text-[#EA580C]'
                    }`}
                  >
                    {link.name}
                  </Link>
                );
              })}
            </div>

            {/* Right: Auth */}
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-4">
                {user ? (
                  <div className="hidden sm:flex items-center gap-4 relative group">
                    <Link
                      href="/dashboard"
                      className="flex items-center gap-3 bg-slate-50 hover:bg-slate-100 border border-slate-100 px-4 py-2 rounded-2xl transition-all"
                    >
                      <UserIcon className="w-4 h-4 text-[#F97316]" />
                      <div className="flex flex-col leading-none">
                        <span className="font-['Manrope'] font-semibold text-sm text-[#475569]">{user.name.split(' ')[0]}</span>
                      </div>
                      <ChevronDown className="w-3 h-3 text-slate-400" />
                    </Link>

                    {/* Dropdown */}
                    <div className="absolute top-full right-0 mt-2 w-48 bg-white border border-slate-100 rounded-2xl shadow-2xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all p-2 z-50">
                      <Link href="/dashboard" className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-slate-50 text-xs font-semibold uppercase tracking-widest text-[#475569]">
                        <LayoutDashboard className="w-4 h-4 text-[#F97316]" />
                        Dashboard
                      </Link>
                      <button
                        onClick={handleLogout}
                        className="w-full flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-red-50 text-red-500 text-xs font-semibold uppercase tracking-widest"
                      >
                        <LogOut className="w-4 h-4" />
                        Logout
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="hidden sm:flex items-center gap-4">
                    <Link href="/login">
                      <button className="px-4 py-2 text-[14px] font-semibold tracking-[0.7px] text-[#475569] hover:text-[#EA580C] transition-colors font-['Manrope'] leading-[17px]">
                        Sign In
                      </button>
                    </Link>
                    <Link href="/signup">
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="bg-[#FF9800] text-white px-6 py-2.5 rounded-full font-semibold text-[14px] tracking-[0.7px] shadow-[0px_10px_15px_-3px_rgba(255,152,0,0.2),0px_4px_6px_-4px_rgba(255,152,0,0.2)] hover:bg-[#F97316] transition-all font-['Manrope'] leading-[17px] flex flex-col justify-center items-center h-[37px]"
                      >
                        Get Started
                      </motion.button>
                    </Link>
                  </div>
                )}
                <button
                  onClick={() => setMobileOpen(!mobileOpen)}
                  className={`lg:hidden p-2 hover:bg-slate-100 rounded-full transition-colors`}
                >
                  {mobileOpen ? <X className="w-5 h-5 text-slate-800" /> : <Menu className="w-5 h-5 text-slate-800" />}
                </button>
              </div>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            className="fixed inset-0 z-[45] bg-white/95 backdrop-blur-3xl lg:hidden flex flex-col pt-32 px-8"
          >
            <div className="space-y-10">
              <div className="relative">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                <input
                  type="text"
                  placeholder="Search stores..."
                  className="w-full bg-slate-50 border border-slate-200 rounded-2xl py-5 pl-12 pr-4 text-lg font-bold outline-none text-slate-900 focus:bg-white focus:border-[#F97316]/50 transition-all font-['Manrope']"
                />
              </div>
              <div className="flex flex-col gap-6">
                {navLinks.map((item) => (
                  <Link
                    key={item.name}
                    href={item.href}
                    onClick={() => setMobileOpen(false)}
                    className="flex items-center justify-between text-xl font-bold tracking-tight text-slate-900 border-b border-slate-100 pb-4 hover:text-[#F97316] transition-colors font-['Manrope']"
                  >
                    {item.name}
                  </Link>
                ))}
              </div>
              <div className="flex flex-col gap-4 pt-4">
                <Link href="/login" className="w-full" onClick={() => setMobileOpen(false)}>
                  <button className="w-full py-5 rounded-3xl bg-slate-100 hover:bg-slate-200 font-bold uppercase tracking-widest text-sm text-slate-900 transition-colors font-['Manrope']">Sign In</button>
                </Link>
                <Link href="/signup" className="w-full" onClick={() => setMobileOpen(false)}>
                  <button className="w-full py-5 rounded-3xl bg-[#FF9800] text-white hover:bg-[#F97316] font-bold uppercase tracking-widest text-sm shadow-xl shadow-[#F97316]/20 font-['Manrope']">Get Started</button>
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
