import { Metadata } from 'next';
import CashbackPageClient from './CashbackPageClient';

export const metadata: Metadata = {
  title: "Earn Guaranteed Cashback",
  description: "Join over 12k+ members earning up to 15% cashback on their online shopping at top global retailers.",
};

export default function CashbackPage() {
  return <CashbackPageClient />;
}
