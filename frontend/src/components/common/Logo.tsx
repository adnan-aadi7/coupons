"use client";

import Link from 'next/link';
import { motion } from 'framer-motion';

interface LogoProps {
  className?: string;
  iconOnly?: boolean;
  lightText?: boolean;
}

export default function Logo({ className = "", iconOnly = false, lightText = false }: LogoProps) {
  return (
    <Link href="/" className={`flex items-center group ${className}`}>
      <span className="font-['Outfit'] font-black text-[25px] sm:text-[25px] tracking-tight flex items-center gap-1 sm:gap-1.5 select-none leading-none">
        <span className={lightText ? 'text-white' : 'text-slate-900 group-hover:text-[#EA580C] transition-colors duration-300'}>
          Coupons
        </span>
        <span className="bg-gradient-to-r from-[#FF9800] to-[#FF5722] text-white px-1.5 py-0.5 rounded-[6px] sm:rounded-[8px] text-[20px] sm:text-[19px] font-black shadow-md shadow-orange-500/20 group-hover:shadow-orange-500/35 transition-all duration-300">
          Mart
        </span>
      </span>
    </Link>
  );
}
