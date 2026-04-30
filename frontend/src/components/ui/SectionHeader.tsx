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
    <div className="flex items-center justify-between mb-8">
      <h2 className="text-2xl font-black text-foreground flex items-center gap-3">
        {Icon && <Icon className="text-primary w-6 h-6" />}
        {title}
      </h2>
      {action && <div>{action}</div>}
    </div>
  );
}
