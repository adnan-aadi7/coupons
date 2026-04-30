import type { Metadata } from "next";
import { Inter, Outfit } from "next/font/google";
import "./globals.css";
import { StoreProvider } from "@/redux/StoreProvider";
import StickyBanner from "@/components/layout/StickyBanner";
import Navbar from "@/components/layout/Navbar";

const inter = Inter({ subsets: ["latin"], variable: '--font-inter' });
const outfit = Outfit({ subsets: ["latin"], variable: '--font-outfit' });

export const metadata: Metadata = {
  title: "CouponScan | Instant Savings via Barcode",
  description: "Scan product barcodes to find the best online coupons and cashback deals instantly.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`h-full antialiased scroll-smooth ${inter.variable} ${outfit.variable}`}>
      <body className="font-sans min-h-full flex flex-col bg-background text-foreground selection:bg-primary/20">
        <StoreProvider>
          <StickyBanner />
          <Navbar />
          <main className="flex-1 ">
            {children}
          </main>
        </StoreProvider>
      </body>
    </html>
  );
}
