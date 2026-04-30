"use client";

import { motion } from 'framer-motion';
import { Download, X } from 'lucide-react';
import { useState } from 'react';

export default function StickyBanner() {
  const [isVisible, setIsVisible] = useState(true);

  if (!isVisible) return null;

  return (
    <motion.div 
      initial={{ opacity: 0, y: -50 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-primary text-white py-2 px-4 sticky top-0 z-[100] flex items-center justify-center gap-4 text-[10px] font-black uppercase tracking-widest shadow-lg"
    >
      <div className="flex items-center gap-2">
        <Download className="w-3.5 h-3.5 animate-bounce" />
        <span className="hidden sm:inline text-white">Save more with our Free Browser Extension</span>
        <span className="sm:hidden text-white text-[9px]">Get our Extension</span>
      </div>
      <button 
        className="bg-white text-emerald-600 px-4 py-1.5 rounded-full hover:bg-emerald-50 transition-all text-[8px] font-black shadow-sm"
        onClick={() => window.open('https://chrome.google.com/webstore', '_blank')}
      >
        Add to Chrome
      </button>
      <button 
        onClick={() => setIsVisible(false)}
        className="absolute right-4 hover:rotate-90 transition-transform p-1 opacity-60 hover:opacity-100"
      >
        <X className="w-3.5 h-3.5" />
      </button>
    </motion.div>
  );
}
