"use client";

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, ShoppingCart, ExternalLink, Shield, Tag, Loader2, AlertCircle, ChevronDown } from 'lucide-react';
import { useParams, useRouter } from 'next/navigation';

interface Retailer {
  name: string;
  price: number;
  status: string;
  url: string;
}

interface Product {
  barcode: string;
  name: string;
  brand: string;
  category: string;
  description: string;
  image: string | null;
  retailers: Retailer[];
  source: string;
}

const statusColorMap: Record<string, string> = {
  'In Stock':      'bg-green-100 text-green-700',
  'Out of Stock':  'bg-red-100 text-red-500',
  'Sold Out':      'bg-red-100 text-red-500',
  'Refurbished':   'bg-orange-100 text-orange-600',
  'Members Only':  'bg-blue-100 text-blue-600',
};

function getStatusColor(status: string): string {
  return statusColorMap[status] || 'bg-slate-100 text-slate-500';
}

export default function ScanResultDisplay() {
  const params = useParams();
  const router = useRouter();
  const barcode = typeof params.barcode === 'string' ? decodeURIComponent(params.barcode) : '';

  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [visibleCount, setVisibleCount] = useState(6);

  useEffect(() => {
    if (!barcode) return;

    const fetchProduct = async () => {
      setLoading(true);
      setError(null);
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/products/lookup/${encodeURIComponent(barcode)}`);
        const data = await res.json();
        if (data.success) {
          setProduct(data.product);
        } else {
          setError(data.message || 'Product not found.');
        }
      } catch (err) {
        setError('Failed to fetch product data. Please try again.');
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [barcode]);

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-[#F9F9F9] font-['Manrope'] gap-4">
        <Loader2 className="w-12 h-12 text-[#FF9800] animate-spin" />
        <p className="text-slate-500 font-bold text-[16px] tracking-wide">Looking up product...</p>
        <p className="text-slate-400 text-[13px]">Barcode: {barcode}</p>
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-[#F9F9F9] font-['Manrope'] gap-6 px-4">
        <div className="w-16 h-16 rounded-full bg-red-100 flex items-center justify-center">
          <AlertCircle className="w-8 h-8 text-red-500" />
        </div>
        <div className="text-center">
          <h2 className="text-[24px] font-extrabold text-[#1A1C1C] mb-2">Product Not Found</h2>
          <p className="text-slate-400 text-[15px] mb-1">{error}</p>
          <p className="text-slate-300 text-[13px]">Barcode: {barcode}</p>
        </div>
        <button
          onClick={() => router.back()}
          className="px-6 py-3 bg-[#1A1C1C] text-white font-bold rounded-2xl hover:bg-[#FF9800] transition-colors"
        >
          ← Go Back & Try Again
        </button>
      </div>
    );
  }

  const cheapestRetailer = product.retailers.length > 0
    ? product.retailers.reduce((min, r) => r.price < min.price ? r : min, product.retailers[0])
    : null;

  const bestPrice = cheapestRetailer?.price ?? null;
  const hasMore = product.retailers.length > visibleCount;

  return (
    <div className="min-h-screen bg-[#F9F9F9] font-['Manrope']">
      <div className="max-w-[1200px] mx-auto px-4 md:px-8 pt-28 pb-16">
        {/* Back */}
        <button
          onClick={() => router.back()}
          className="inline-flex items-center gap-2 text-slate-500 hover:text-[#1A1C1C] font-semibold text-[14px] transition-colors mb-8"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Home
        </button>

        {/* Top Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-10">

          {/* Product Image */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="relative rounded-[32px] overflow-hidden bg-gradient-to-br from-slate-100 to-slate-200 min-h-[380px]"
          >
            {product.image ? (
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-full object-contain bg-white"
              />
            ) : (
              <div className="w-full h-full flex flex-col items-center justify-center gap-4 min-h-[380px]">
                <Tag className="w-20 h-20 text-slate-300" />
                <p className="text-slate-400 font-bold">No Image Available</p>
              </div>
            )}

            {/* Barcode Label */}
            <div className="absolute top-6 left-6 bg-black/30 backdrop-blur-md px-4 py-2 rounded-full border border-white/20">
              <span className="text-white text-[11px] font-bold tracking-widest uppercase">
                <Tag className="w-3 h-3 inline mr-1.5" />
                {barcode}
              </span>
            </div>

            {/* Verified */}
            <div className="absolute bottom-6 right-6 flex flex-col items-center gap-1">
              <div className="w-14 h-14 bg-white/80 backdrop-blur-md rounded-full flex items-center justify-center border border-white shadow-lg">
                <Shield className="w-6 h-6 text-[#FF9800]" />
              </div>
              <span className="text-[#1A1C1C] text-[10px] font-black tracking-widest uppercase bg-white/80 px-2 py-0.5 rounded-full">Verified</span>
            </div>
          </motion.div>

          {/* Price Info */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="flex flex-col gap-4"
          >
            <div className="bg-white rounded-[24px] p-6 shadow-sm border border-slate-100 flex-1">
              <div className="flex items-center justify-between mb-3">
                <span className="inline-flex items-center gap-1.5 bg-orange-50 text-[#FF9800] text-[11px] font-black uppercase tracking-widest px-3 py-1 rounded-full border border-orange-100">
                  <span className="w-1.5 h-1.5 bg-[#FF9800] rounded-full animate-pulse" />
                  {product.source === 'openfoodfacts' ? 'Open Food Facts' : 'Live Lookup'}
                </span>
                <Shield className="w-5 h-5 text-slate-200" />
              </div>

              {product.brand && (
                <p className="text-[#FF9800] font-bold text-[13px] uppercase tracking-widest mb-1">{product.brand}</p>
              )}
              <h1 className="text-[24px] font-extrabold text-[#1A1C1C] leading-tight mb-2">{product.name}</h1>
              {product.description && (
                <p className="text-slate-400 text-[14px] leading-relaxed mb-4">{product.description.slice(0, 120)}{product.description.length > 120 ? '...' : ''}</p>
              )}

              {bestPrice !== null ? (
                <div className="flex items-baseline gap-3 mb-6">
                  <span className="text-[42px] font-black text-[#1A1C1C] leading-none">${bestPrice.toFixed(2)}</span>
                  <span className="text-slate-400 text-[15px]">Best found price</span>
                </div>
              ) : (
                <div className="bg-slate-50 rounded-2xl p-4 mb-6">
                  <p className="text-slate-400 text-[14px] font-semibold">Price data not available for this product.</p>
                </div>
              )}

              {/* Cashback */}
              <div className="flex items-center gap-3 bg-orange-50 border border-orange-100 rounded-xl px-4 py-3 mb-5">
                <ShoppingCart className="w-5 h-5 text-[#FF9800] shrink-0" />
                <div>
                  <span className="text-[10px] font-black uppercase tracking-widest text-slate-400 block">Estimated Rewards</span>
                  <span className="text-[#FF9800] font-black text-[16px]">
                    {bestPrice ? `+$${(bestPrice * 0.05).toFixed(2)} Cashback` : 'Cashback may apply'}
                  </span>
                </div>
              </div>

              {cheapestRetailer && cheapestRetailer.url !== '#' ? (
                <a
                  href={cheapestRetailer.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full flex items-center justify-center gap-2 bg-[#1A1C1C] hover:bg-[#FF9800] text-white font-bold text-[15px] py-4 rounded-2xl transition-colors"
                >
                  Buy on {cheapestRetailer.name} <ExternalLink className="w-4 h-4" />
                </a>
              ) : (
                <div className="w-full flex items-center justify-center bg-slate-100 text-slate-400 font-bold text-[15px] py-4 rounded-2xl">
                  No direct purchase link available
                </div>
              )}
            </div>

            {/* Category */}
            <div className="bg-white rounded-[20px] p-5 shadow-sm border border-slate-100">
              <div className="flex items-center gap-2 text-slate-400 text-[12px] font-bold uppercase tracking-widest mb-1">
                <Tag className="w-4 h-4" />
                Category
              </div>
              <span className="text-[18px] font-black text-[#1A1C1C] capitalize">{product.category}</span>
            </div>
          </motion.div>
        </div>

        {/* Retailer Comparison */}
        {product.retailers.length > 0 && (
          <div className="mt-12">
            <div className="flex items-end justify-between mb-8">
              <div>
                <h2 className="text-[22px] font-extrabold text-[#1A1C1C] tracking-tight">Partner Price Comparison</h2>
                <p className="text-slate-400 text-[14px]">Showing {Math.min(visibleCount, product.retailers.length)} of {product.retailers.length} authorized retailers.</p>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              <AnimatePresence>
                {product.retailers.slice(0, visibleCount).map((retailer, index) => {
                  const isCheapest = cheapestRetailer?.name === retailer.name;
                  const isSoldOut = ['Sold Out', 'Out of Stock'].includes(retailer.status);
                  return (
                    <motion.div
                      key={`${retailer.name}-${index}`}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      transition={{ delay: (index % 6) * 0.05 }}
                      className={`bg-white rounded-[24px] p-6 border transition-all ${isCheapest ? 'border-[#FF9800] shadow-[0_12px_30px_rgba(255,152,0,0.15)]' : 'border-slate-100 hover:border-slate-200 shadow-sm'}`}
                    >
                      {isCheapest && (
                        <div className="inline-flex items-center gap-1 bg-orange-50 text-[#FF9800] text-[10px] font-black uppercase tracking-widest px-2 py-0.5 rounded-full border border-orange-100 mb-4">
                          ⭐ Best Deal
                        </div>
                      )}
                      <div className="flex items-center justify-between mb-4">
                        <span className="font-black text-[18px] text-[#1A1C1C]">{retailer.name}</span>
                        {retailer.status && (
                          <span className={`text-[11px] font-bold px-2 py-0.5 rounded-full ${getStatusColor(retailer.status)}`}>
                            {retailer.status}
                          </span>
                        )}
                      </div>
                      <p className="text-slate-400 text-[11px] font-bold uppercase tracking-widest mb-1">Retailer Price</p>
                      <p className="text-[30px] font-black text-[#1A1C1C] mb-6">${retailer.price.toFixed(2)}</p>
                      <a
                        href={retailer.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`w-full flex items-center justify-center gap-2 font-bold text-[14px] py-4 rounded-xl transition-colors ${
                          isSoldOut || retailer.url === '#'
                            ? 'bg-slate-100 text-slate-400 pointer-events-none cursor-not-allowed'
                            : 'bg-[#1A1C1C] text-white hover:bg-[#FF9800]'
                        }`}
                      >
                        {isSoldOut ? 'Out of Stock' : <> Buy Now <ExternalLink className="w-4 h-4" /></>}
                      </a>
                    </motion.div>
                  );
                })}
              </AnimatePresence>
            </div>

            {/* View More Button */}
            {hasMore && (
              <div className="mt-12 flex justify-center">
                <button
                  onClick={() => setVisibleCount(prev => prev + 12)}
                  className="group flex flex-col items-center gap-3"
                >
                  <div className="px-8 py-4 bg-white border border-slate-200 rounded-2xl font-bold text-[#1A1C1C] hover:border-[#FF9800] hover:text-[#FF9800] transition-all shadow-sm group-hover:shadow-md flex items-center gap-2">
                    View More Retailers
                    <ChevronDown className="w-5 h-5 group-hover:translate-y-1 transition-transform" />
                  </div>
                  <span className="text-[12px] text-slate-400 font-bold uppercase tracking-widest">
                    {product.retailers.length - visibleCount} more available
                  </span>
                </button>
              </div>
            )}
          </div>
        )}

        {product.retailers.length === 0 && (
          <div className="bg-white rounded-[24px] p-8 text-center border border-slate-100 shadow-sm">
            <p className="text-slate-400 font-semibold text-[15px]">No retailer pricing data available for this product.</p>
            <p className="text-slate-300 text-[13px] mt-1">Try searching manually on Amazon, Walmart, or eBay.</p>
          </div>
        )}
      </div>
    </div>
  );
}
