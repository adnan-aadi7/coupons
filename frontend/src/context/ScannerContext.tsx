"use client";

import React, { createContext, useContext, useState, ReactNode } from 'react';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { ShieldCheck, QrCode } from 'lucide-react';

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
      
      {/* Full-Screen Glassmorphic Scan Loading Overlay */}
      <AnimatePresence>
        {isScanLoading && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[9999] bg-slate-950/80 backdrop-blur-xl flex flex-col items-center justify-center text-center p-6 font-['Outfit'] select-none"
          >
            {/* Ambient Background Glowing Blobs */}
            <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-[#FF9800]/15 rounded-full blur-[100px] pointer-events-none animate-[pulse_3s_infinite]" />
            <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-[#F65300]/10 rounded-full blur-[100px] pointer-events-none animate-[pulse_4s_infinite]" />

            <div className="relative flex flex-col items-center max-w-md mx-auto">
              
              {/* Rotating Outer Scanner Rings */}
              <div className="relative w-32 h-32 mb-8 flex items-center justify-center">
                <motion.div 
                  animate={{ rotate: 360 }}
                  transition={{ duration: 6, repeat: Infinity, ease: "linear" }}
                  className="absolute inset-0 rounded-full border-4 border-dashed border-[#FF9800]/40"
                />
                <motion.div 
                  animate={{ rotate: -360 }}
                  transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                  className="absolute inset-2 rounded-full border border-double border-white/20"
                />
                {/* Central Scan Icon with Pulsing Effect */}
                <div className="relative w-20 h-20 bg-slate-900 border border-slate-800 rounded-3xl flex items-center justify-center shadow-2xl">
                  <QrCode className="w-10 h-10 text-[#FF9800] animate-[pulse_1.5s_infinite]" />
                  {/* Moving horizontal laser line */}
                  <motion.div 
                    animate={{ y: [-24, 24, -24] }}
                    transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                    className="absolute left-3 right-3 h-0.5 bg-emerald-500 shadow-[0_0_10px_#10B981]"
                  />
                </div>
              </div>

              {/* Title & Stats */}
              <h3 className="text-white text-2xl sm:text-3xl font-black mb-3 tracking-tight">
                Analyzing Barcode...
              </h3>
              
              <div className="flex items-center gap-2 bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-[0.2em] mb-6">
                <ShieldCheck className="w-3.5 h-3.5" />
                SECURE PARTNER CONNECTION
              </div>

              <p className="text-slate-400 text-sm font-medium leading-relaxed mb-4 max-w-sm px-4">
                Verifying barcode details across AliExpress, Alibaba, Samsung, and 29+ connected networks...
              </p>

              {/* Loader Dot Pulse */}
              <div className="flex items-center justify-center gap-1.5 mt-2">
                <span className="w-2.5 h-2.5 bg-[#FF9800] rounded-full animate-bounce [animation-delay:-0.3s]" />
                <span className="w-2.5 h-2.5 bg-[#FF9800] rounded-full animate-bounce [animation-delay:-0.15s]" />
                <span className="w-2.5 h-2.5 bg-[#FF9800] rounded-full animate-bounce" />
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
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
