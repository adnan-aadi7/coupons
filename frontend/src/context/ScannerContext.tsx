"use client";

import React, { createContext, useContext, useState, ReactNode } from 'react';
import { useRouter } from 'next/navigation';
import { Loader2 } from 'lucide-react';


interface ScannerContextType {
  isScanning: boolean;
  isScanLoading: boolean;
  openScanner: () => void;
  closeScanner: () => void;
  startScanLoading: () => void;
  stopScanLoading: () => void;
  handleScanSuccess: (barcode: string) => void;
}

const ScannerContext = createContext<ScannerContextType | undefined>(undefined);

export function ScannerProvider({ children }: { children: ReactNode }) {
  const [isScanning, setIsScanning] = useState(false);
  const [isScanLoading, setIsScanLoading] = useState(false);
  const router = useRouter();

  const openScanner = () => setIsScanning(true);
  const closeScanner = () => setIsScanning(false);
  const startScanLoading = () => setIsScanLoading(true);
  const stopScanLoading = () => setIsScanLoading(false);

  const handleScanSuccess = (barcode: string) => {
    setIsScanning(false);
    setIsScanLoading(true); // Start global scanner loading instantly
    router.push(`/scan-result/${encodeURIComponent(barcode)}`);
  };

  return (
    <ScannerContext.Provider value={{ 
      isScanning, 
      isScanLoading, 
      openScanner, 
      closeScanner, 
      startScanLoading, 
      stopScanLoading, 
      handleScanSuccess 
    }}>
      {children}

      {isScanLoading && (
        <div className="fixed inset-0 z-[9999] bg-white flex flex-col items-center justify-center gap-4 font-['Manrope']">
          <Loader2 className="w-12 h-12 text-[#FF9800] animate-spin" />
          <p className="text-slate-500 font-bold text-[16px] tracking-wide">Looking up product...</p>
        </div>
      )}
    </ScannerContext.Provider>
  );
}

export function useScanner() {
  const context = useContext(ScannerContext);
  if (context === undefined) {
    throw new Error('useScanner must be used within a ScannerProvider');
  }
  return context;
}
