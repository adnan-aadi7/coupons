import { Metadata } from 'next';
import StoresPageClient from './StoresPageClient';

export const metadata: Metadata = {
  title: "All Verified Stores & Brands",
  description: "Browse our directory of verified partner stores. Shop at your favorite global brands and earn guaranteed cashback on every purchase.",
};

export default function StoresPage() {
  return <StoresPageClient />;
}
