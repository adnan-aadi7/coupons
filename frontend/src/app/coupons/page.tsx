import { Metadata } from 'next';
import CouponsPage from "@/components/coupons/CouponsPage";
import { Suspense } from 'react';
import { CouponGridSkeleton } from '@/components/common/Skeletons';

export const metadata: Metadata = {
  title: "Exclusive Promo Codes & Coupons",
  description: "Copy and paste verified promotional codes at checkout to save instantly on your purchases.",
};

export default function CouponsPageWrapper() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-[#F8F9FA] pt-36 px-8 max-w-[1280px] mx-auto">
        <div className="h-8 w-48 bg-slate-200 rounded-lg animate-pulse mb-8" />
        <CouponGridSkeleton count={6} />
      </div>
    }>
      <CouponsPage />
    </Suspense>
  );
}
