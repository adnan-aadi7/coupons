import { Metadata } from 'next';
import HotDealsClient from './HotDealsClient';

export const metadata: Metadata = {
  title: "Hot Deals & Flash Sales",
  description: "Grab the most exclusive limited-time hot deals, flash sales, and massive discounts before they expire.",
};

export default function HotDealsPage() {
  return <HotDealsClient />;
}
