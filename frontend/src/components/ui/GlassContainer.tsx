"use client";

import { ReactNode } from 'react';

interface GlassContainerProps {
  children: ReactNode;
  className?: string;
}

export default function GlassContainer({ children, className = "" }: GlassContainerProps) {
  return (
    <div className={`glass ${className}`}>
      {children}
    </div>
  );
}
