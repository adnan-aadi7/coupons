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
      await new Promise(resolve => setTimeout(resolve, 300));
      // Permission check
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      stream.getTracks().forEach(track => track.stop());

      const { Html5Qrcode, Html5QrcodeSupportedFormats } = await import('html5-qrcode');
      const isMobile = window.innerWidth < 640;
      const regionId = isMobile ? "barcode-video-region-mobile" : "barcode-video-region-desktop";
      
      const videoRegion = document.getElementById(regionId);
      if (!videoRegion) throw new Error("Scanner region not found");

      // Clear any existing elements to prevent double camera view
      videoRegion.innerHTML = "";

      html5Qrcode = new Html5Qrcode(regionId);
      scannerRef.current = html5Qrcode;

      const container = containerRef.current;
      const width = container?.clientWidth || 480;
      const height = container?.clientHeight || 270;

      // Adaptive qrbox for 1D barcodes (wider and taller for better capture)
      const qrboxFunction = (viewfinderWidth: number, viewfinderHeight: number) => {
        const isMobile = viewfinderWidth < 600;
        const width = isMobile ? viewfinderWidth * 0.9 : viewfinderWidth * 0.8;
        const height = isMobile ? 200 : 250; // Increased height for easier alignment
        return { width, height };
      };

      await html5Qrcode.start(
        { 
          facingMode: "environment",
        },
        {
          fps: 30,
          qrbox: qrboxFunction,
          aspectRatio: width / height,
          disableFlip: true,
          videoConstraints: {
            width: { ideal: 1280 },
            height: { ideal: 720 },
            facingMode: "environment"
          },
          formatsToSupport: [
            Html5QrcodeSupportedFormats.QR_CODE,
            Html5QrcodeSupportedFormats.EAN_13,
            Html5QrcodeSupportedFormats.EAN_8,
            Html5QrcodeSupportedFormats.UPC_A,
            Html5QrcodeSupportedFormats.UPC_E,
            Html5QrcodeSupportedFormats.UPC_EAN_EXTENSION,
            Html5QrcodeSupportedFormats.CODE_128,
            Html5QrcodeSupportedFormats.CODE_39,
            Html5QrcodeSupportedFormats.CODE_93,
            Html5QrcodeSupportedFormats.ITF,
            Html5QrcodeSupportedFormats.DATA_MATRIX,
            Html5QrcodeSupportedFormats.AZTEC,
            Html5QrcodeSupportedFormats.PDF_417,
            Html5QrcodeSupportedFormats.CODABAR
          ],
          experimentalFeatures: {
            useBarCodeDetectorIfSupported: true,
          },
        },
        (decodedText: string) => {
          // Success Feedback
          if (typeof window !== 'undefined' && 'vibrate' in navigator) {
            navigator.vibrate([100, 50, 100]); 
          }
          
          setLoading(true);
          isRunningRef.current = false;
          
          // Show "Searching" state for a moment to give user feedback
          setTimeout(() => {
            html5Qrcode?.stop().then(() => {
              onScanSuccess(decodedText);
            }).catch(() => onScanSuccess(decodedText));
          }, 800); // Increased delay for better feedback
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
      className="fixed inset-0 z-[100] font-['Manrope']"
    >
      {/* Global CSS Overrides */}
      <style jsx global>{`
        #barcode-video-region-desktop img, #barcode-video-region-mobile img { display: none !important; }
        #barcode-video-region-desktop canvas, #barcode-video-region-mobile canvas { display: none !important; }
        #barcode-video-region-desktop video, #barcode-video-region-mobile video { 
          width: 100% !important; 
          height: 100% !important; 
          object-fit: cover !important;
          display: block !important;
        }
        #qr-shaded-region { border: none !important; }
        #qr-shaded-region > div { display: none !important; }
      `}</style>

      {/* --- DESKTOP VIEW (sm+) --- */}
      <div className="hidden sm:flex fixed inset-0 items-center justify-center p-4 bg-black/60 backdrop-blur-md">
        <div className="relative w-full max-w-lg bg-white rounded-[40px] overflow-hidden shadow-2xl flex flex-col">
          {/* Desktop Header */}
          <div className="px-8 py-6 border-b border-slate-100 flex items-center justify-between bg-white shrink-0">
            <div>
              <h2 className="text-[22px] font-black text-[#1A1C1C]">Product Scanner</h2>
              <p className="text-slate-400 text-[12px] font-bold uppercase tracking-widest">Coupons Mart Official Lens</p>
            </div>
            <button onClick={onClose} className="p-3 bg-slate-50 hover:bg-slate-100 text-slate-400 rounded-full transition-all active:scale-90">
              <X className="w-6 h-6" />
            </button>
          </div>

          <div className="relative aspect-video bg-black overflow-hidden flex items-center justify-center">
            {!manualMode && <div id="barcode-video-region-desktop" className="w-full h-full" />}
            
            {(starting || loading) && (
              <div className="absolute inset-0 bg-black/80 flex flex-col items-center justify-center gap-4 z-40">
                <Loader2 className="w-10 h-10 text-[#FF9800] animate-spin" />
                <p className="text-white text-[12px] font-black uppercase tracking-widest opacity-80">
                  {loading && !starting ? 'Searching Product...' : 'Initializing Lens...'}
                </p>
              </div>
            )}

            {!manualMode && !loading && !starting && !error && (
              <div className="absolute inset-0 pointer-events-none z-30 flex flex-col items-center justify-center">
                <div className="relative w-[80%] h-[140px] max-w-[350px]">
                  <div className="absolute top-0 left-0 w-8 h-8 border-t-4 border-l-4 border-[#FF9800] rounded-tl-xl" />
                  <div className="absolute top-0 right-0 w-8 h-8 border-t-4 border-r-4 border-[#FF9800] rounded-tr-xl" />
                  <div className="absolute bottom-0 left-0 w-8 h-8 border-b-4 border-l-4 border-[#FF9800] rounded-bl-xl" />
                  <div className="absolute bottom-0 right-0 w-8 h-8 border-b-4 border-r-4 border-[#FF9800] rounded-br-xl" />
                  <motion.div animate={{ top: ['10%', '90%', '10%'] }} transition={{ duration: 2.5, repeat: Infinity }} className="absolute left-2 right-2 h-[2px] bg-[#FF9800] shadow-[0_0_15px_#FF9800]" />
                </div>
              </div>
            )}
          </div>

          <div className="p-8 bg-white">
            {manualMode ? (
              <div className="space-y-6">
                <input autoFocus type="text" value={manualBarcode} onChange={(e) => setManualBarcode(e.target.value)} placeholder="Enter Barcode" className="w-full bg-slate-50 border border-slate-100 rounded-2xl px-6 py-4 text-xl font-bold focus:outline-none focus:border-[#FF9800]" />
                <div className="flex gap-4">
                  <button onClick={() => setManualMode(false)} className="flex-1 py-4 font-bold text-slate-400">Back</button>
                  <button onClick={handleManualSubmit} className="flex-[2] py-4 bg-[#1A1C1C] text-white rounded-2xl font-bold hover:bg-[#FF9800] transition-all">Search Product</button>
                </div>
              </div>
            ) : (
              <button onClick={() => setManualMode(true)} className="w-full py-5 bg-slate-50 text-slate-600 rounded-2xl font-black text-[14px] uppercase tracking-widest flex items-center justify-center gap-3 border border-slate-100">
                <Keyboard className="w-5 h-5" /> Enter Manually
              </button>
            )}
          </div>
        </div>
      </div>

      {/* --- MOBILE VIEW (default) --- */}
      <div className="sm:hidden fixed inset-0 flex flex-col bg-black overflow-hidden">
        <div className="absolute top-0 left-0 right-0 p-6 flex items-center justify-between z-50 bg-gradient-to-b from-black/60 to-transparent">
          <div className="bg-white/10 backdrop-blur-md px-4 py-2 rounded-full border border-white/10">
             <span className="text-white text-[10px] font-black uppercase tracking-[0.2em]">Scanner Lens 1.0</span>
          </div>
          <button onClick={onClose} className="w-12 h-12 bg-white/10 backdrop-blur-md text-white rounded-full flex items-center justify-center border border-white/10">
            <X className="w-6 h-6" />
          </button>
        </div>

        <div className="flex-1 relative flex items-center justify-center">
            {!manualMode && <div id="barcode-video-region-mobile" className="w-full h-full" />}
            
            {!manualMode && !loading && !starting && !error && (
              <div className="absolute inset-0 pointer-events-none z-30 flex flex-col items-center justify-center">
                <div className="relative w-[85%] h-[200px]">
                  <div className={`absolute top-0 left-0 w-10 h-10 border-t-4 border-l-4 rounded-tl-2xl transition-colors duration-300 ${loading ? 'border-green-500 shadow-[0_0_20px_rgba(34,197,94,0.5)]' : 'border-[#FF9800]'}`} />
                  <div className={`absolute top-0 right-0 w-10 h-10 border-t-4 border-r-4 rounded-tr-2xl transition-colors duration-300 ${loading ? 'border-green-500 shadow-[0_0_20px_rgba(34,197,94,0.5)]' : 'border-[#FF9800]'}`} />
                  <div className={`absolute bottom-0 left-0 w-10 h-10 border-b-4 border-l-4 rounded-bl-2xl transition-colors duration-300 ${loading ? 'border-green-500 shadow-[0_0_20px_rgba(34,197,94,0.5)]' : 'border-[#FF9800]'}`} />
                  <div className={`absolute bottom-0 right-0 w-10 h-10 border-b-4 border-r-4 rounded-br-2xl transition-colors duration-300 ${loading ? 'border-green-500 shadow-[0_0_20px_rgba(34,197,94,0.5)]' : 'border-[#FF9800]'}`} />
                  
                  {!loading && (
                    <motion.div animate={{ top: ['10%', '90%', '10%'] }} transition={{ duration: 2, repeat: Infinity }} className="absolute left-4 right-4 h-[3px] bg-[#FF9800] shadow-[0_0_25px_#FF9800]" />
                  )}

                  <div className="absolute -top-12 left-0 right-0 text-center">
                    <span className={`text-[10px] font-black uppercase tracking-[0.3em] transition-colors duration-300 ${loading ? 'text-green-500' : 'text-[#FF9800] animate-pulse'}`}>
                      {loading ? 'Code Captured!' : 'Detecting Barcode...'}
                    </span>
                  </div>
                </div>
              </div>
            )}

            {(starting || loading) && (
              <div className="absolute inset-0 bg-black/90 backdrop-blur-sm flex flex-col items-center justify-center gap-4 z-[60]">
                <Loader2 className="w-12 h-12 text-[#FF9800] animate-spin" />
                <div className="text-center">
                  <p className="text-white text-[14px] font-black uppercase tracking-[0.2em]">
                    {loading && !starting ? 'Searching Product...' : 'Initializing Lens'}
                  </p>
                  <p className="text-white/40 text-[10px] font-bold uppercase tracking-widest mt-1">Please hold steady</p>
                </div>
              </div>
            )}
        </div>

        <div className="bg-black/90 backdrop-blur-xl p-8 pb-12 pt-6 border-t border-white/5 z-50">
          {manualMode ? (
            <motion.div initial={{ y: 20 }} animate={{ y: 0 }} className="space-y-6">
                <input autoFocus type="text" value={manualBarcode} onChange={(e) => setManualBarcode(e.target.value)} placeholder="Type Barcode" className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-5 text-2xl font-black text-white focus:outline-none focus:border-[#FF9800] transition-all" />
                <div className="flex gap-4">
                  <button onClick={() => setManualMode(false)} className="flex-1 py-5 text-white/40 font-black uppercase text-xs tracking-widest">Back</button>
                  <button onClick={handleManualSubmit} className="flex-[2] py-5 bg-[#FF9800] text-white rounded-2xl font-black uppercase text-xs tracking-widest shadow-2xl shadow-[#FF9800]/20">Search</button>
                </div>
            </motion.div>
          ) : (
            <button onClick={() => setManualMode(true)} className="w-full py-5 bg-white text-black rounded-2xl font-black text-[12px] uppercase tracking-[0.2em] flex items-center justify-center gap-3 active:scale-95 transition-all">
              <Keyboard className="w-5 h-5" /> Type Barcode
            </button>
          )}
        </div>
      </div>
    </motion.div>
  );
}
