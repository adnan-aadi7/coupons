"use client";

import { LucideIcon } from 'lucide-react';
import { ReactNode } from 'react';

interface SectionHeaderProps {
  title: string;
  icon?: LucideIcon;
  action?: ReactNode;
}

export default function SectionHeader({ title, icon: Icon, action }: SectionHeaderProps) {
  return (
    <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-12">
      <div>
        <h2 className="text-[32px] md:text-[40px] font-['Manrope'] font-semibold text-[#1A1C1C] leading-[1.1] tracking-[-0.8px] mb-2 text-center sm:text-left flex items-center justify-center sm:justify-start gap-2 sm:gap-3">
          {Icon && <Icon className="text-[#FF9800] w-6 h-6 sm:w-8 sm:h-8" />}
          {title}
        </h2>
        <p className="text-[16px] font-['Manrope'] text-[#554434] leading-[24px] text-center sm:text-left">
          Discover verified coupons and promotional codes updated daily.
        </p>
      </div>
      {action && <div className="flex justify-center sm:justify-end">{action}</div>}
    </div>
  );
}
