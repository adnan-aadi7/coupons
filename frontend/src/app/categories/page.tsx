import { Metadata } from 'next';
import CategoriesExplorer from "@/components/categories/CategoriesExplorer";

export const metadata: Metadata = {
  title: "Browse Coupon Categories",
  description: "Explore deals, discounts, and promo codes across various categories like Electronics, Fashion, Travel, and more.",
};

export default function CategoriesPage() {
  return <CategoriesExplorer />;
}
