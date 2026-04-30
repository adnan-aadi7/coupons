"use client";

import GlassContainer from './GlassContainer';

export default function SkeletonCard() {
  return (
    <GlassContainer className="p-6 min-h-[220px] animate-pulse">
      <div className="flex justify-between items-start mb-4">
        <div className="w-16 h-3 bg-white/10 rounded" />
        <div className="w-8 h-8 bg-white/10 rounded-lg" />
      </div>
      <div className="space-y-3 mb-6">
        <div className="h-6 bg-white/10 rounded w-3/4" />
        <div className="h-4 bg-white/10 rounded w-full" />
        <div className="h-4 bg-white/10 rounded w-1/2" />
      </div>
      <div className="h-10 bg-white/10 rounded-xl w-full mt-auto" />
    </GlassContainer>
  );
}
