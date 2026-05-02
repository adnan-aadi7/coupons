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
  const isStartingRef = useRef(false);
  const isRunningRef = useRef(false);

  const startScanner = async () => {
    if (manualMode || isStartingRef.current || isRunningRef.current) return;
    
    isStartingRef.current = true;
    setStarting(true);
    setError(null);
    let html5Qrcode: any = null;

    try {
      // Permission check
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      stream.getTracks().forEach(track => track.stop());

      const { Html5Qrcode, Html5QrcodeSupportedFormats } = await import('html5-qrcode');
      
      const videoRegion = document.getElementById("barcode-video-region");
      if (!videoRegion) throw new Error("Scanner region not found");

      // Clear any existing elements to prevent double camera view
      videoRegion.innerHTML = "";

      html5Qrcode = new Html5Qrcode("barcode-video-region");
      scannerRef.current = html5Qrcode;

      const container = containerRef.current;
      const width = container?.clientWidth || 480;
      const height = container?.clientHeight || 270;

      // Adaptive qrbox for 1D barcodes (wide and short, scales on mobile)
      const qrboxFunction = (viewfinderWidth: number, viewfinderHeight: number) => {
        const isMobile = viewfinderWidth < 600;
        const width = isMobile ? viewfinderWidth * 0.9 : viewfinderWidth * 0.8;
        const height = isMobile ? 120 : 150; 
        return { width, height };
      };

      await html5Qrcode.start(
        { facingMode: "environment" },
        {
          fps: 30,
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
      isStartingRef.current = false;
    } catch (err: any) {
      setStarting(false);
      isStartingRef.current = false;
      isRunningRef.current = false;
      setError('Camera failed to start. Use manual entry below.');
    }
  };

  useEffect(() => {
    let mounted = true;
    if (mounted) {
        startScanner();
    }
    return () => {
      mounted = false;
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
      className="fixed inset-0 z-[100] bg-black/80 backdrop-blur-md flex flex-col items-center justify-center p-0 sm:p-4 font-['Manrope']"
    >
      {/* Hide default html5-qrcode UI elements and redundant video/canvas layers */}
      <style jsx global>{`
        #barcode-video-region img { display: none !important; }
        #barcode-video-region canvas { display: none !important; }
        #barcode-video-region video { 
          width: 100% !important; 
          height: 100% !important; 
          object-fit: cover !important;
          display: block !important;
        }
        #qr-shaded-region { border: none !important; }
        #qr-shaded-region > div { display: none !important; }
      `}</style>

      <div className="relative w-full h-full sm:h-auto sm:max-w-lg bg-white sm:rounded-[40px] overflow-hidden shadow-[0_32px_64px_-16px_rgba(0,0,0,0.5)] flex flex-col transition-all duration-500">
        {/* Header */}
        <div className="px-6 py-5 border-b border-slate-100 flex items-center justify-between shrink-0 bg-white z-50">
          <div>
            <h2 className="text-[18px] sm:text-[22px] font-black text-[#1A1C1C] tracking-tight">Product Scanner</h2>
            <p className="text-slate-400 text-[11px] sm:text-[12px] font-bold uppercase tracking-widest">Coupons Mart Official Lens</p>
          </div>
          <button
            onClick={onClose}
            className="p-2.5 bg-slate-50 hover:bg-slate-100 text-slate-400 hover:text-[#FF9800] rounded-full transition-all active:scale-90"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="flex-1 relative flex flex-col min-h-0">
          <AnimatePresence mode="wait">
            {!manualMode ? (
              <motion.div 
                key="scanner" 
                initial={{ opacity: 0 }} 
                animate={{ opacity: 1 }} 
                exit={{ opacity: 0 }}
                className="flex-1 flex flex-col min-h-0"
              >
                <div
                  ref={containerRef}
                  className="relative flex-1 bg-black overflow-hidden flex items-center justify-center"
                >
                  {/* Video Stream */}
                  <div id="barcode-video-region" className="w-full h-full object-cover" />

                  {/* Custom Scanning Overlay */}
                  {!loading && !starting && !error && (
                    <div className="absolute inset-0 pointer-events-none z-30 flex flex-col items-center justify-center">
                      {/* Scanning Box Area (Simulated QRBox size) */}
                      <div className="relative w-[85%] h-[140px] max-w-[400px]">
                        {/* Corner Markers */}
                        <div className="absolute top-0 left-0 w-8 h-8 border-t-4 border-l-4 border-[#FF9800] rounded-tl-xl" />
                        <div className="absolute top-0 right-0 w-8 h-8 border-t-4 border-r-4 border-[#FF9800] rounded-tr-xl" />
                        <div className="absolute bottom-0 left-0 w-8 h-8 border-b-4 border-l-4 border-[#FF9800] rounded-bl-xl" />
                        <div className="absolute bottom-0 right-0 w-8 h-8 border-b-4 border-r-4 border-[#FF9800] rounded-br-xl" />

                        {/* Animated Scanning Beam - Restricted to Box */}
                        <motion.div
                          animate={{ top: ['10%', '90%', '10%'] }}
                          transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
                          className="absolute left-2 right-2 h-[3px] bg-[#FF9800] shadow-[0_0_20px_#FF9800] blur-[1px]"
                        />
                        
                        <div className="absolute -top-10 left-0 right-0 text-center">
                            <span className="text-[10px] font-black text-[#FF9800] uppercase tracking-[0.3em] bg-black/40 px-3 py-1 rounded-full backdrop-blur-md">Detecting Barcode...</span>
                        </div>
                      </div>
                    </div>
                  )}

                  {(starting || loading) && !error && (
                    <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 bg-slate-900/95 z-40">
                      <Loader2 className="w-10 h-10 text-[#FF9800] animate-spin" />
                      <p className="text-white text-[12px] font-black tracking-widest uppercase opacity-80">
                        {loading ? 'Fetching Product Info...' : 'Initializing Lens...'}
                      </p>
                    </div>
                  )}

                  {error && (
                    <div className="absolute inset-0 flex flex-col items-center justify-center gap-4 bg-slate-900/95 p-6 text-center z-40">
                      <AlertCircle className="w-12 h-12 text-red-500" />
                      <p className="text-white text-[16px] font-bold">{error}</p>
                    </div>
                  )}
                </div>

                <div className="p-6 bg-white shrink-0">
                  <button
                    onClick={() => setManualMode(true)}
                    className="w-full py-5 bg-slate-50 hover:bg-slate-100 text-slate-600 rounded-2xl font-black text-[14px] uppercase tracking-widest flex items-center justify-center gap-3 transition-all border border-slate-100 active:scale-[0.98]"
                  >
                    <Keyboard className="w-5 h-5" />
                    Enter Barcode Manually
                  </button>
                </div>
              </motion.div>
            ) : (
              <motion.div key="manual" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="p-6 space-y-6 flex-1 bg-white">
                <div className="bg-slate-50 rounded-3xl p-8 border border-slate-100">
                  <label className="block text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 mb-4">Barcode Number</label>
                  <input
                    autoFocus
                    type="text"
                    value={manualBarcode}
                    onChange={(e) => setManualBarcode(e.target.value)}
                    placeholder="e.g. 716270001660"
                    className="w-full bg-white border border-slate-200 rounded-2xl px-6 py-5 text-[24px] font-black text-[#1A1C1C] focus:outline-none focus:border-[#FF9800] transition-all placeholder:text-slate-200"
                  />
                </div>
                <div className="flex flex-col sm:flex-row gap-4">
                  <button
                    onClick={() => setManualMode(false)}
                    className="w-full sm:flex-1 py-5 bg-white border border-slate-200 text-slate-600 rounded-2xl font-black text-[14px] uppercase tracking-widest active:scale-[0.98] transition-all"
                  >
                    Back to Lens
                  </button>
                  <button
                    onClick={handleManualSubmit}
                    disabled={!manualBarcode || loading}
                    className="w-full sm:flex-[2] py-5 bg-[#1A1C1C] hover:bg-[#FF9800] text-white rounded-2xl font-black text-[14px] uppercase tracking-widest transition-all flex items-center justify-center gap-3 disabled:opacity-50 shadow-xl shadow-black/10 active:scale-[0.98]"
                  >
                    {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : 'Search Product'}
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
