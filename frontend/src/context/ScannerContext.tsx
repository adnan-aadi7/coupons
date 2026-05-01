"use client";

import React, { createContext, useContext, useState, ReactNode } from 'react';
import { useRouter } from 'next/navigation';

interface ScannerContextType {
  isScanning: boolean;
  openScanner: () => void;
  closeScanner: () => void;
  handleScanSuccess: (barcode: string) => void;
}

const ScannerContext = createContext<ScannerContextType | undefined>(undefined);

export function ScannerProvider({ children }: { children: ReactNode }) {
  const [isScanning, setIsScanning] = useState(false);
  const router = useRouter();

  const openScanner = () => setIsScanning(true);
  const closeScanner = () => setIsScanning(false);

  const handleScanSuccess = (barcode: string) => {
    setIsScanning(false);
    router.push(`/scan-result/${encodeURIComponent(barcode)}`);
  };

  return (
    <ScannerContext.Provider value={{ isScanning, openScanner, closeScanner, handleScanSuccess }}>
      {children}
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
