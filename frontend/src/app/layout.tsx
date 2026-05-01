import type { Metadata } from "next";
import { Inter, Outfit } from "next/font/google";
import "./globals.css";
import { StoreProvider } from "@/redux/StoreProvider";
// import StickyBanner from "@/components/layout/StickyBanner";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { ScannerProvider } from "@/context/ScannerContext";
import GlobalScanner from "@/components/scanner/GlobalScanner";

const inter = Inter({ subsets: ["latin"], variable: '--font-inter' });
const outfit = Outfit({ subsets: ["latin"], variable: '--font-outfit' });

export const metadata: Metadata = {
  title: "Coupons Mart | Instant Savings via Barcode",
  description: "Scan product barcodes to find the best online coupons and cashback deals instantly.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`h-full antialiased scroll-smooth ${inter.variable} ${outfit.variable}`}>
      <body className="font-sans min-h-full flex flex-col bg-white text-foreground selection:bg-primary/20 relative">
        {/* Global Background Gradients (Blobs) */}
        <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
          <div className="absolute top-[-10%] right-[-5%] w-[40%] h-[40%] bg-[#FF9800]/10 blur-[120px] rounded-full" />
          <div className="absolute bottom-[10%] left-[-10%] w-[50%] h-[50%] bg-[#F65300]/5 blur-[150px] rounded-full" />
          <div className="absolute top-[30%] left-[20%] w-[30%] h-[30%] bg-[#FFB74D]/10 blur-[100px] rounded-full" />
        </div>

        <StoreProvider>
          <ScannerProvider>
            {/* <StickyBanner /> */}
            <Navbar />
            <main className="flex-1 ">
              {children}
            </main>
            <Footer />
            <GlobalScanner />
          </ScannerProvider>
        </StoreProvider>
      </body>
    </html>
  );
}
