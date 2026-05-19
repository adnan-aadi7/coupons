"use client";

// A collection of skeleton components for loading states

export function SkeletonBox({ className = '' }: { className?: string }) {
  return (
    <div className={`bg-slate-200 rounded-xl animate-pulse ${className}`} />
  );
}

export function CouponCardSkeleton() {
  return (
    <div className="bg-white rounded-2xl border border-slate-100 p-5 flex flex-col gap-4 animate-pulse">
      <div className="flex items-center gap-3">
        <div className="w-12 h-12 rounded-xl bg-slate-200 shrink-0" />
        <div className="flex-1 space-y-2">
          <div className="h-4 bg-slate-200 rounded-lg w-3/4" />
          <div className="h-3 bg-slate-100 rounded-lg w-1/2" />
        </div>
        <div className="w-16 h-7 bg-slate-200 rounded-full" />
      </div>
      <div className="h-3 bg-slate-100 rounded-lg w-full" />
      <div className="h-3 bg-slate-100 rounded-lg w-2/3" />
      <div className="h-10 bg-slate-100 rounded-xl w-full mt-1" />
    </div>
  );
}

export function StoreCardSkeleton() {
  return (
    <div className="bg-white rounded-2xl border border-slate-100 p-6 flex flex-col items-center gap-3 animate-pulse">
      <div className="w-16 h-16 rounded-full bg-slate-200" />
      <div className="h-4 bg-slate-200 rounded-lg w-3/4" />
      <div className="h-3 bg-slate-100 rounded-lg w-1/2" />
      <div className="h-8 bg-slate-100 rounded-full w-2/3 mt-1" />
    </div>
  );
}

export function ActivityItemSkeleton() {
  return (
    <div className="flex items-center gap-4 p-4 animate-pulse">
      <div className="w-10 h-10 rounded-full bg-slate-200 shrink-0" />
      <div className="flex-1 space-y-2">
        <div className="h-4 bg-slate-200 rounded-lg w-3/4" />
        <div className="h-3 bg-slate-100 rounded-lg w-1/2" />
      </div>
      <div className="h-5 w-16 bg-slate-200 rounded-full" />
    </div>
  );
}

export function DashboardStatsSkeleton() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 animate-pulse">
      {[1, 2, 3].map(i => (
        <div key={i} className="bg-white rounded-2xl p-6 border border-slate-100 space-y-3">
          <div className="w-10 h-10 rounded-xl bg-slate-200" />
          <div className="h-7 w-24 bg-slate-200 rounded-lg" />
          <div className="h-3 w-3/4 bg-slate-100 rounded-lg" />
        </div>
      ))}
    </div>
  );
}

export function CouponGridSkeleton({ count = 6 }: { count?: number }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
      {Array.from({ length: count }).map((_, i) => (
        <CouponCardSkeleton key={i} />
      ))}
    </div>
  );
}

export function StoreGridSkeleton({ count = 8 }: { count?: number }) {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
      {Array.from({ length: count }).map((_, i) => (
        <StoreCardSkeleton key={i} />
      ))}
    </div>
  );
}

export function PageHeroSkeleton() {
  return (
    <div className="w-full h-[200px] bg-slate-200 rounded-3xl animate-pulse" />
  );
}
