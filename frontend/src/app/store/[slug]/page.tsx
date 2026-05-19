import { Metadata } from 'next';
import StorePageClient from './StorePageClient';

interface Props {
  params: { slug: string };
}

// 1. Generate Dynamic Metadata for SEO
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const storeNameFallback = slug.replace(/-/g, ' ');

  try {
    const API_URL = process.env.NEXT_PUBLIC_API_URL || 'https://coupons-52jf.vercel.app/api';
    const res = await fetch(`${API_URL}/stores/${slug}`, { 
      next: { revalidate: 3600 } // Cache for 1 hour
    });
    
    if (res.ok) {
      const data = await res.json();
      if (data.success && data.data) {
        const store = data.data;
        return {
          title: `${store.name} Promo Codes & Cashback - May 2026`,
          description: `Save money at ${store.name} with today's verified promo codes, discounts, and ${store.cashbackRate || 'up to 15%'} cash back offers.`,
        };
      }
    }
  } catch (err) {
    console.error("Failed to fetch store for metadata:", err);
  }

  // Fallback if API fails
  return {
    title: `${storeNameFallback.toUpperCase()} Promo Codes & Cashback`,
    description: `Get the best verified ${storeNameFallback} promo codes and cash back deals.`,
  };
}

// 2. Server Component
export default async function StoreDetailsPage({ params }: Props) {
  const { slug } = await params;
  const storeNameFallback = slug.replace(/-/g, ' ');
  
  let store = null;
  let coupons = [];

  // Fetch Store Details
  try {
    const API_URL = process.env.NEXT_PUBLIC_API_URL || 'https://coupons-52jf.vercel.app/api';
    const storeRes = await fetch(`${API_URL}/stores/${slug}`, { 
      next: { revalidate: 3600 } 
    });
    if (storeRes.ok) {
      const storeData = await storeRes.json();
      if (storeData.success) {
        store = storeData.data;
      }
    }
  } catch (err) {
    console.error("Failed to fetch store details:", err);
  }

  // Fetch Coupons for this store
  try {
    const queryStoreName = store ? store.name : storeNameFallback;
    const API_URL = process.env.NEXT_PUBLIC_API_URL || 'https://coupons-52jf.vercel.app/api';
    const couponsRes = await fetch(`${API_URL}/coupons?store=${encodeURIComponent(queryStoreName)}&sort=popularity`, {
      next: { revalidate: 300 } // Cache for 5 minutes
    });
    if (couponsRes.ok) {
      const couponsData = await couponsRes.json();
      if (couponsData.success) {
        coupons = couponsData.data;
      }
    }
  } catch (err) {
    console.error("Failed to fetch coupons:", err);
  }

  return (
    <StorePageClient 
      store={store} 
      coupons={coupons} 
      storeNameFallback={storeNameFallback} 
    />
  );
}

