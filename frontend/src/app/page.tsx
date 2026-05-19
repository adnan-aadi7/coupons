import { Metadata } from 'next';
import HomePage from "@/app/home/page";

export const metadata: Metadata = {
  title: "Best Promo Codes, Coupons & Cash Back Offers",
  description: "Find the latest verified coupon codes, discounts, and cash back deals from top brands at Coupons Mart.",
};

/** 
 * Root page — Imports and renders the Home Page from the /home directory 
 */
export default function Home() {
  return (
    <main className="bg-background">
      <HomePage />
    </main>
  );
}
