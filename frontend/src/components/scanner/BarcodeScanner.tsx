"use client";

import { useEffect, useRef, useState } from 'react';
import { X, Loader2, AlertCircle, Image as ImageIcon, Camera, RefreshCw, Keyboard } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface BarcodeScannerProps {
  onScanSuccess: (barcode: string) => void;
  onClose: () => void;
}

export default function BarcodeScanner({ onScanSuccess, onClose }: BarcodeScannerProps) {
  const [loading, setLoading] = useState(false);
  const [starting, setStarting] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [manualMode, setManualMode] = useState(false);
  const [manualBarcode, setManualBarcode] = useState('');
  const scannerRef = useRef<any>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const isRunningRef = useRef(false);

  const startScanner = async () => {
    if (manualMode) return;
    setStarting(true);
    setError(null);
    let html5Qrcode: any = null;

    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      stream.getTracks().forEach(track => track.stop());

      await new Promise(resolve => setTimeout(resolve, 500));

      const { Html5Qrcode, Html5QrcodeSupportedFormats } = await import('html5-qrcode');
      
      const videoRegion = document.getElementById("barcode-video-region");
      if (!videoRegion) throw new Error("Scanner region not found");

      html5Qrcode = new Html5Qrcode("barcode-video-region");
      scannerRef.current = html5Qrcode;

      const container = containerRef.current;
      const width = container?.clientWidth || 480;
      const height = container?.clientHeight || 270;

      // Optimized qrbox for 1D barcodes (wide and short)
      const qrboxFunction = (viewfinderWidth: number, viewfinderHeight: number) => {
        const minEdgePercentage = 0.7; // 70%
        const minEdgeSize = Math.min(viewfinderWidth, viewfinderHeight);
        const qrboxSize = Math.floor(minEdgeSize * minEdgePercentage);
        return {
          width: viewfinderWidth * 0.8,
          height: 150
        };
      };

      await html5Qrcode.start(
        { facingMode: "environment" },
        {
          fps: 30, // Faster scan rate
          qrbox: qrboxFunction,
          aspectRatio: width / height,
          disableFlip: true,
          formatsToSupport: [
            Html5QrcodeSupportedFormats.EAN_13,
            Html5QrcodeSupportedFormats.EAN_8,
            Html5QrcodeSupportedFormats.UPC_A,
            Html5QrcodeSupportedFormats.UPC_E,
            Html5QrcodeSupportedFormats.UPC_EAN_EXTENSION,
            Html5QrcodeSupportedFormats.CODE_128,
            Html5QrcodeSupportedFormats.CODE_39,
            Html5QrcodeSupportedFormats.ITF
          ],
          experimentalFeatures: {
            useBarCodeDetectorIfSupported: true,
          },
        },
        (decodedText: string) => {
          setLoading(true);
          isRunningRef.current = false;
          html5Qrcode?.stop().then(() => {
            onScanSuccess(decodedText);
          }).catch(() => onScanSuccess(decodedText));
        },
        () => { }
      );

      isRunningRef.current = true;
      setStarting(false);
    } catch (err: any) {
      setStarting(false);
      isRunningRef.current = false;
      setError('Camera failed to start. Use manual entry below.');
    }
  };

  useEffect(() => {
    startScanner();
    return () => {
      if (scannerRef.current && isRunningRef.current) {
        isRunningRef.current = false;
        scannerRef.current.stop().catch(() => { });
      }
    };
  }, [manualMode]);

  const handleManualSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (manualBarcode.trim()) {
      setLoading(true);
      onScanSuccess(manualBarcode.trim());
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[100] bg-black/80 backdrop-blur-md flex flex-col items-center justify-center p-4 font-['Manrope']"
    >
      <div className="relative w-full max-w-lg bg-white rounded-[32px] overflow-hidden shadow-2xl">
        {/* Header */}
        <div className="p-6 border-b border-slate-100 flex items-center justify-between">
          <div>
            <h2 className="text-[22px] font-black text-[#1A1C1C]">Scanner</h2>
            <p className="text-slate-500 text-[13px]">Scan or enter barcode manually</p>
          </div>
          <button
            onClick={onClose}
            className="p-2 bg-slate-100 hover:bg-slate-200 text-slate-500 rounded-full transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6">
          <AnimatePresence mode="wait">
            {!manualMode ? (
              <motion.div key="scanner" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                <div
                  ref={containerRef}
                  className="relative rounded-[20px] overflow-hidden bg-black border border-slate-200 aspect-video mb-6 shadow-inner"
                >
                  <div id="barcode-video-region" className="w-full h-full" />

                  {!loading && !starting && !error && (
                    <motion.div
                      animate={{ top: ['0%', '100%', '0%'] }}
                      transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                      className="absolute left-0 right-0 h-[2px] bg-[#FF9800] shadow-[0_0_15px_#FF9800] z-10"
                    />
                  )}

                  {(starting || loading) && !error && (
                    <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 bg-slate-900/90 z-20">
                      <Loader2 className="w-8 h-8 text-[#FF9800] animate-spin" />
                      <p className="text-white text-[11px] font-bold tracking-widest uppercase opacity-60">
                        {loading ? 'Processing...' : 'Loading Camera...'}
                      </p>
                    </div>
                  )}

                  {error && (
                    <div className="absolute inset-0 flex flex-col items-center justify-center gap-4 bg-slate-900/95 p-6 text-center">
                      <AlertCircle className="w-10 h-10 text-red-500" />
                      <p className="text-white text-[14px]">{error}</p>
                    </div>
                  )}
                </div>

                <button
                  onClick={() => setManualMode(true)}
                  className="w-full py-4 bg-slate-50 hover:bg-slate-100 text-slate-600 rounded-2xl font-bold text-[14px] flex items-center justify-center gap-2 transition-colors border border-slate-100"
                >
                  <Keyboard className="w-4 h-4" />
                  Enter Barcode Manually
                </button>
              </motion.div>
            ) : (
              <motion.div key="manual" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="space-y-4">
                <div className="bg-slate-50 rounded-2xl p-6 border border-slate-100">
                  <label className="block text-[12px] font-black uppercase tracking-widest text-slate-400 mb-3">Barcode Number</label>
                  <input
                    autoFocus
                    type="text"
                    value={manualBarcode}
                    onChange={(e) => setManualBarcode(e.target.value)}
                    placeholder="e.g. 716270001660"
                    className="w-full bg-white border border-slate-200 rounded-xl px-4 py-3 text-[18px] font-bold text-[#1A1C1C] focus:outline-none"
                  />
                </div>
                <div className="flex gap-3">
                  <button
                    onClick={() => setManualMode(false)}
                    className="flex-1 py-4 bg-white border border-slate-200 text-slate-600 rounded-2xl font-bold text-[14px]"
                  >
                    Back to Camera
                  </button>
                  <button
                    onClick={handleManualSubmit}
                    disabled={!manualBarcode || loading}
                    className="flex-[2] py-4 bg-[#1A1C1C] hover:bg-[#FF9800] text-white rounded-2xl font-bold text-[14px] transition-colors flex items-center justify-center gap-2 disabled:opacity-50"
                  >
                    {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : 'Search Product'}
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </motion.div>
  );
}
