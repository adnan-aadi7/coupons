"use client";

import Link from 'next/link';
import { Search, User as UserIcon, Menu, X, ChevronDown, LogOut, LayoutDashboard, ScanLine, Tag, Home, Store, Flame, Compass, Percent, ChevronRight, LogIn, Shield } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '@/redux/store';
import { getMe, logout } from '@/redux/slices/authSlice';
import { useRouter, usePathname } from 'next/navigation';
import { useScanner } from '@/context/ScannerContext';
import Logo from '../common/Logo';
import GlobalSearchBar from '../common/GlobalSearchBar';

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  const dispatch = useDispatch<AppDispatch>();
  const { user, isAuthenticated, token } = useSelector((state: RootState) => state.auth);

  const router = useRouter();
  const pathname = usePathname();
  const { openScanner } = useScanner();

  useEffect(() => {
    // Rehydrate user if token exists but no user in state
    if (token && !user) {
      dispatch(getMe());
    }
  }, [dispatch, token, user]);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLogout = async () => {
    dispatch(logout());
    router.push('/');
  };

  const navLinks = [
    { name: 'Home', href: '/' },
    { name: 'Stores', href: '/stores' },
    { name: 'Coupons', href: '/coupons' },
    { name: 'Hot Deals', href: '/hot-deals' },
    { name: 'Categories', href: '/categories' },
    { name: 'Cashback', href: '/cashback' },
  ];

  const isAuthPage = pathname?.startsWith('/auth/');
  const navBackground = (isScrolled || isAuthPage)
    ? 'bg-white/90 backdrop-blur-xl border-b border-slate-100 shadow-xl shadow-slate-200/50'
    : 'bg-transparent';

  return (
    <>
      <nav className={`fixed top-0 left-0 right-0 z-[100] transition-all duration-300 ${navBackground} py-2.5 sm:py-4`}>
        <div className="max-w-[1280px] mx-auto px-4 xl:px-8">
          <div className="flex items-center justify-between h-[50px] sm:h-[60px]">

            {/* Left: Logo - Coupons Mart */}
            <Logo />

            {/* Middle: Desktop Nav Links */}
            <div className="hidden lg:flex items-center gap-4 xl:gap-8">
              {navLinks.map((link) => {
                const isActive = pathname === link.href;
                return (
                  <Link
                    key={link.name}
                    href={link.href}
                    className={`font-['Manrope'] font-medium text-[15px] xl:text-[17px] leading-[20px] tracking-[0.35px] transition-all flex flex-col ${isActive ? 'text-[#EA580C] border-b-[2px] border-[#F97316] pb-1' : 'text-[#475569] hover:text-[#EA580C]'}`}
                  >
                    {link.name}
                  </Link>
                );
              })}
            </div>

            {/* Right: Auth & Search */}
            <div className="flex items-center gap-4 xl:gap-6">
              {/* Desktop Global Search (Sleek, Inline & Fixed Width) */}
              {/* <div className="hidden lg:block w-[150px] xl:w-[180px] shrink-0">
                <GlobalSearchBar
                  placeholder="Search stores, deals..."
                  inputClassName="!py-1.5 !px-3.5 !rounded-full !text-xs bg-slate-50/50 hover:bg-slate-50 focus-within:!bg-white border-slate-100 focus-within:border-[#FF9800]/50"
                />
              </div> */}

              <div className="flex items-center gap-4">
                {user ? (
                  <div className="hidden sm:flex items-center gap-4 relative group">
                    <Link href="/dashboard" className="flex items-center gap-3 bg-slate-50 hover:bg-slate-100 border border-slate-100 px-4 py-2 rounded-2xl transition-all">
                      <UserIcon className="w-4 h-4 text-[#F97316]" />
                      <div className="flex flex-col leading-none">
                        <span className="font-['Manrope'] font-semibold text-sm text-[#475569]">{user.name.split(' ')[0]}</span>
                      </div>
                      <ChevronDown className="w-3 h-3 text-slate-400" />
                    </Link>

                    {/* Dropdown */}
                    <div className="absolute top-full right-0 mt-2 w-48 bg-white border border-slate-100 rounded-2xl shadow-2xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all p-2 z-50">
                      {user?.role === 'admin' && (
                        <Link href="/admin" className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-slate-50 text-xs font-semibold uppercase tracking-widest text-[#475569] border-b border-slate-50 mb-1">
                          <Tag className="w-4 h-4 text-[#FF9800]" />
                          Admin Panel
                        </Link>
                      )}
                      <Link href="/dashboard" className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-slate-50 text-xs font-semibold uppercase tracking-widest text-[#475569]">
                        <LayoutDashboard className="w-4 h-4 text-[#F97316]" />
                        Dashboard
                      </Link>
                      <button onClick={handleLogout} className="w-full flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-red-50 text-red-500 text-xs font-semibold uppercase tracking-widest">
                        <LogOut className="w-6 h-6" />
                        Logout
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="hidden sm:flex items-center gap-4">
                    <Link href="/auth/login">
                      <button className="px-4 py-2 text-[18px] font-semibold tracking-[0.7px] text-[#475569] hover:text-[#EA580C] transition-colors font-['Manrope'] leading-[17px]">
                        Sign In
                      </button>
                    </Link>
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={openScanner}
                      className="bg-[#1A1C1C] text-white px-6 py-2.5 rounded-full font-semibold text-[14px] tracking-[0.7px] shadow-xl hover:bg-[#FF9800] transition-all font-['Manrope'] leading-[17px] flex items-center gap-2 h-[45px]"
                    >
                      <ScanLine className="w-4 h-4" />
                      Scan Barcode
                    </motion.button>
                  </div>
                )}
                <button
                  onClick={() => setMobileOpen(!mobileOpen)}
                  className="lg:hidden w-10 h-10 flex flex-col items-center justify-center gap-1.5 focus:outline-none z-[1002] relative rounded-full hover:bg-slate-50 transition-colors"
                  aria-label="Toggle Menu"
                >
                  <motion.span
                    animate={mobileOpen ? { rotate: 45, y: 8 } : { rotate: 0, y: 0 }}
                    transition={{ duration: 0.25, ease: "easeInOut" }}
                    className="w-6 h-0.5 bg-slate-800 rounded-full block origin-center"
                  />
                  <motion.span
                    animate={mobileOpen ? { opacity: 0, scale: 0.8 } : { opacity: 1, scale: 1 }}
                    transition={{ duration: 0.2, ease: "easeInOut" }}
                    className="w-6 h-0.5 bg-slate-800 rounded-full block"
                  />
                  <motion.span
                    animate={mobileOpen ? { rotate: -45, y: -8 } : { rotate: 0, y: 0 }}
                    transition={{ duration: 0.25, ease: "easeInOut" }}
                    className="w-6 h-0.5 bg-slate-800 rounded-full block origin-center"
                  />
                </button>
              </div>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Menu Slide Drawer */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            {/* Dark glassmorphic backdrop overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMobileOpen(false)}
              className="fixed inset-0 z-[100] bg-slate-900/50 backdrop-blur-md lg:hidden"
            />

            {/* Breathtaking iOS-style Side Drawer */}
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 30, stiffness: 300 }}
              className="fixed right-0 top-0 bottom-0 w-[85%] max-w-[380px] z-[101] bg-white/95 backdrop-blur-3xl shadow-2xl flex flex-col lg:hidden border-l border-slate-100/50 overflow-hidden"
            >
              {/* Drawer Header */}
              <div className="flex items-center justify-between p-6 border-b border-slate-100">
                <Logo />
                <button
                  onClick={() => setMobileOpen(false)}
                  className="w-10 h-10 rounded-full bg-slate-50 border border-slate-100 flex items-center justify-center text-slate-500 hover:text-slate-800 transition-colors shadow-sm active:scale-95"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Drawer Content Area (Scrollable) */}
              <div className="flex-1 overflow-y-auto px-6 py-6 space-y-8">
                {/* Global search component */}
                <div className="relative bg-slate-50 p-2.5 rounded-2xl border border-slate-100">
                  <GlobalSearchBar placeholder="Search stores, deals..." />
                </div>

                {/* Nav Links */}
                <div className="flex flex-col gap-2">
                  <span className="text-[10px] font-black text-[#FF9800] uppercase tracking-[0.2em] px-3 mb-2">Navigation</span>
                  {navLinks.map((item) => {
                    const isActive = pathname === item.href;
                    // Icon Map
                    let IconComponent = Home;
                    if (item.name === 'Stores') IconComponent = Store;
                    else if (item.name === 'Coupons') IconComponent = Tag;
                    else if (item.name === 'Hot Deals') IconComponent = Flame;
                    else if (item.name === 'Categories') IconComponent = Compass;
                    else if (item.name === 'Cashback') IconComponent = Percent;

                    return (
                      <Link
                        key={item.name}
                        href={item.href}
                        onClick={() => setMobileOpen(false)}
                        className={`flex items-center justify-between px-4 py-3.5 rounded-2xl font-bold tracking-tight transition-all group ${
                          isActive 
                            ? 'bg-[#FF9800]/5 text-[#EA580C]' 
                            : 'text-slate-700 hover:bg-slate-50 hover:text-[#EA580C]'
                        }`}
                      >
                        <div className="flex items-center gap-3.5">
                          <IconComponent className={`w-5 h-5 ${isActive ? 'text-[#FF9800]' : 'text-slate-400 group-hover:text-[#FF9800] transition-colors'}`} />
                          <span className="font-['Manrope'] text-base font-semibold">{item.name}</span>
                        </div>
                        <ChevronRight className={`w-4 h-4 opacity-50 group-hover:translate-x-1 group-hover:opacity-100 transition-all ${isActive ? 'text-[#FF9800]' : 'text-slate-300'}`} />
                      </Link>
                    );
                  })}
                </div>
              </div>

              {/* Drawer Footer (User Profile or Sign In Actions) */}
              <div className="p-6 border-t border-slate-100 bg-slate-50/50">
                {user ? (
                  <div className="space-y-4">
                    {/* User profile row */}
                    <div className="flex items-center gap-3 bg-white border border-slate-100 p-3.5 rounded-2xl">
                      <div className="w-10 h-10 rounded-full bg-[#FF9800]/10 flex items-center justify-center text-[#FF9800]">
                        <UserIcon className="w-5 h-5" />
                      </div>
                      <div className="flex flex-col leading-tight min-w-0">
                        <span className="font-['Manrope'] font-bold text-sm text-slate-800 truncate">{user.name}</span>
                        <span className="text-[10px] text-slate-400 truncate">{user.email}</span>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                      <Link href="/dashboard" className="w-full" onClick={() => setMobileOpen(false)}>
                        <button className="w-full py-3.5 rounded-2xl bg-[#FF9800]/10 hover:bg-[#FF9800]/20 text-[#EA580C] font-bold text-xs uppercase tracking-widest transition-all flex items-center justify-center gap-1.5 shadow-sm">
                          <LayoutDashboard className="w-4 h-4" /> Panel
                        </button>
                      </Link>
                      <button
                        onClick={() => { handleLogout(); setMobileOpen(false); }}
                        className="w-full py-3.5 rounded-2xl bg-red-50 hover:bg-red-100 text-red-500 font-bold text-xs uppercase tracking-widest transition-all flex items-center justify-center gap-1.5 shadow-sm"
                      >
                        <LogOut className="w-4 h-4" /> Logout
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="flex flex-col gap-3">
                    <Link href="/auth/login" className="w-full" onClick={() => setMobileOpen(false)}>
                      <button className="w-full py-4 rounded-2xl bg-slate-100 hover:bg-slate-200 font-bold uppercase tracking-widest text-xs text-slate-800 transition-colors font-['Manrope'] flex items-center justify-center gap-2">
                        <LogIn className="w-4 h-4" /> Sign In
                      </button>
                    </Link>
                    <button
                      onClick={() => { openScanner(); setMobileOpen(false); }}
                      className="w-full py-4 rounded-2xl bg-[#1A1C1C] text-white hover:bg-[#FF9800] font-bold uppercase tracking-widest text-xs shadow-md shadow-slate-900/10 font-['Manrope'] flex items-center justify-center gap-2 transition-all active:scale-95"
                    >
                      <ScanLine className="w-4 h-4" />
                      Scan Barcode
                    </button>
                  </div>
                )}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
