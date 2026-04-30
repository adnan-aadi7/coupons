"use client";

import { useEffect, useRef, useState } from 'react';
import { Html5QrcodeScanner, Html5QrcodeSupportedFormats } from 'html5-qrcode';
import { X, Loader2, AlertCircle, Image as ImageIcon } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface BarcodeScannerProps {
  onScanSuccess: (barcode: string) => void;
  onClose: () => void;
}

export default function BarcodeScanner({ onScanSuccess, onClose }: BarcodeScannerProps) {
  const [scanError, setScanError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const scannerRef = useRef<Html5QrcodeScanner | null>(null);

  useEffect(() => {
    // Optimized formats for common products
    const formatsToSupport = [
      Html5QrcodeSupportedFormats.UPC_A,
      Html5QrcodeSupportedFormats.UPC_E,
      Html5QrcodeSupportedFormats.UPC_EAN_EXTENSION,
      Html5QrcodeSupportedFormats.EAN_13,
      Html5QrcodeSupportedFormats.EAN_8,
      Html5QrcodeSupportedFormats.CODE_128,
      Html5QrcodeSupportedFormats.QR_CODE,
    ];

    const config = {
      fps: 20,
      qrbox: { width: 280, height: 180 },
      aspectRatio: 1.0,
      formatsToSupport: formatsToSupport,
      experimentalFeatures: {
        useBarCodeDetectorIfSupported: true
      }
    };

    const scanner = new Html5QrcodeScanner("barcode-reader", config, false);

    scanner.render(
      (decodedText) => {
        setLoading(true);
        scanner.clear().then(() => {
          onScanSuccess(decodedText);
        }).catch(err => console.error(err));
      },
      (errorMessage) => {
        // Suppress continuous console noise from the library
        // Only show fatal errors if they occur
        if (errorMessage.includes("NotFoundException")) {
          return;
        }
      }
    );

    scannerRef.current = scanner;

    return () => {
      if (scannerRef.current) {
        scannerRef.current.clear().catch(err => console.warn("Cleanup warning", err));
      }
    };
  }, [onScanSuccess]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[100] bg-obsidian/95 backdrop-blur-3xl flex flex-col items-center justify-center p-4"
    >
      <div className="relative w-full max-w-lg glass p-4 overflow-hidden border-white/10">
        <div className="absolute top-4 right-4 z-10">
          <button
            onClick={onClose}
            className="p-2 bg-white/10 hover:bg-white/20 rounded-full transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <div className="p-4 text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-[10px] font-bold text-primary uppercase tracking-widest mb-4">
            <div className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
            Live Scanner
          </div>

          <h2 className="text-2xl font-black mb-2 tracking-tight text-foreground">Detect Barcode</h2>
          <p className="text-white/40 text-sm mb-8 px-6 font-bold">
            Hold a product up to the camera or upload an image of a barcode.
          </p>

          <div className="relative rounded-2xl overflow-hidden bg-black aspect-video shadow-2xl border border-white/5">
            <div id="barcode-reader" className="w-full h-full scale-110"></div>

            {!loading && (
              <>
                <div className="absolute inset-0 border-[2px] border-primary/20 pointer-events-none rounded-2xl" />
                <motion.div
                  animate={{ top: ['10%', '90%', '10%'] }}
                  transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
                  className="absolute left-0 right-0 h-[2px] bg-primary shadow-[0_0_20px_rgba(16,185,129,1)] z-10 opacity-60"
                />
              </>
            )}

            {loading && (
              <div className="absolute inset-0 bg-obsidian/80 backdrop-blur-md flex flex-col items-center justify-center z-20 gap-4">
                <Loader2 className="w-10 h-10 text-primary animate-spin" />
                <p className="text-xs font-bold text-primary tracking-widest uppercase">Processing Deal...</p>
              </div>
            )}
          </div>

          <div className="mt-8 flex flex-col items-center gap-4">
            <div className="flex items-center gap-6 text-white/20">
              <div className="flex flex-col items-center gap-1">
                <div className="p-2 bg-white/5 rounded-lg border border-white/5">
                  <AlertCircle className="w-4 h-4 text-primary" />
                </div>
                <span className="text-[10px] uppercase font-black tracking-widest">Good Light</span>
              </div>
              <div className="flex flex-col items-center gap-1">
                <div className="p-2 bg-white/5 rounded-lg border border-white/5">
                  <ImageIcon className="w-4 h-4 text-primary" />
                </div>
                <span className="text-[10px] uppercase font-black tracking-widest">Clear Image</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.5 }}
        className="mt-8 text-[11px] text-gray-400 max-w-[250px] text-center leading-relaxed"
      >
        Tip: If scanning a photo, make sure it shows the barcode lines clearly without glare.
      </motion.p>
    </motion.div>
  );
}
