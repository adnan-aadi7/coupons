"use client";

import { useScanner } from "@/context/ScannerContext";
import BarcodeScanner from "./BarcodeScanner";
import { AnimatePresence } from "framer-motion";

export default function GlobalScanner() {
  const { isScanning, closeScanner, handleScanSuccess } = useScanner();

  return (
    <AnimatePresence>
      {isScanning && (
        <BarcodeScanner
          onScanSuccess={handleScanSuccess}
          onClose={closeScanner}
        />
      )}
    </AnimatePresence>
  );
}
