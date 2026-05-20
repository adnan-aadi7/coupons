"use client";

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, ShoppingCart, ExternalLink, Shield, Tag, Loader2, AlertCircle, ChevronDown } from 'lucide-react';
import { useParams, useRouter } from 'next/navigation';

interface Retailer {
  name: string;
  price: number;
  originalPrice?: number;
  discount?: string;
  couponCode?: string;
  couponId?: string;
  cashback?: string;
  lastUpdated?: string;
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
  localStore?: {
    name: string;
    slug: string;
    logoUrl?: string;
    cashbackRate: number;
    rating: number;
    description?: string;
  };
  localCoupons?: {
    _id: string;
    title: string;
    code?: string;
    isCode: boolean;
    discountType?: string;
    discountValue?: number;
    storeInfo?: {
      name: string;
      slug: string;
      logoUrl?: string;
      cashbackRate: number;
    };
  }[];
  fallbackCategory?: string;
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

import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '@/redux/store';
import { searchByBarcode } from '@/redux/slices/couponSlice';
import { useScanner } from '@/context/ScannerContext';

export default function ScanResultDisplay() {
  const params = useParams();
  const router = useRouter();
  const barcode = typeof params.barcode === 'string' ? decodeURIComponent(params.barcode) : '';
  
  const dispatch = useDispatch<AppDispatch>();
  const { closeScanner, stopScanLoading } = useScanner();
  const { searchResults: product, loading, error } = useSelector((state: RootState) => state.coupons);
  const [visibleCount, setVisibleCount] = useState(6);
  const [activeCopiedCoupon, setActiveCopiedCoupon] = useState<{ code: string; title: string; storeName: string; cashbackRate: number } | null>(null);
  const API_URL = process.env.NEXT_PUBLIC_API_URL || 'https://coupons-52jf.vercel.app/api';

  useEffect(() => {
    if (barcode) {
      dispatch(searchByBarcode(barcode));
    }
  }, [barcode, dispatch]);

  useEffect(() => {
    if (!loading) {
      closeScanner();
      stopScanLoading();
    }
  }, [loading, closeScanner, stopScanLoading]);

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

  const pricedRetailers = product.retailers.filter((r: any) => r.price > 0);
  const cheapestRetailer = pricedRetailers.length > 0
    ? pricedRetailers.reduce((min: any, r: any) => r.price < min.price ? r : min, pricedRetailers[0])
    : (product.retailers.length > 0 ? product.retailers[0] : null);

  const bestPrice = (cheapestRetailer && cheapestRetailer.price > 0) ? cheapestRetailer.price : null;
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

              {/* Cashback Promo Banner */}
              {product.localStore ? (
                <div className="flex items-center justify-between gap-3 bg-gradient-to-r from-orange-500 to-amber-500 text-white rounded-2xl px-5 py-4 mb-5 shadow-md shadow-orange-500/10">
                  <div className="flex items-center gap-3">
                    <ShoppingCart className="w-6 h-6 shrink-0" />
                    <div>
                      <span className="text-[10px] font-black uppercase tracking-widest text-orange-100 block">Authorized Partner Offer</span>
                      <span className="font-black text-[17px] leading-tight">
                        Get {product.localStore.cashbackRate}% Cashback!
                      </span>
                    </div>
                  </div>
                  <a
                    href={`/store/${product.localStore.slug}`}
                    className="bg-white text-orange-600 font-extrabold text-[12px] uppercase tracking-wider px-4 py-2.5 rounded-xl hover:bg-slate-100 transition-colors shadow-sm shrink-0"
                  >
                    Shop Store
                  </a>
                </div>
              ) : (
                <div className="flex items-center gap-3 bg-orange-50 border border-orange-100 rounded-xl px-4 py-3 mb-5">
                  <ShoppingCart className="w-5 h-5 text-[#FF9800] shrink-0" />
                  <div>
                    <span className="text-[10px] font-black uppercase tracking-widest text-slate-400 block">Estimated Rewards</span>
                    <span className="text-[#FF9800] font-black text-[16px]">
                      {bestPrice ? `+$${(bestPrice * 0.05).toFixed(2)} Cashback` : 'Cashback may apply'}
                    </span>
                  </div>
                </div>
              )}

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

            {/* Price Disclaimer */}
            <div className="bg-slate-50 rounded-2xl p-4 flex items-start gap-3 border border-slate-100 mb-4">
              <AlertCircle className="w-4 h-4 text-slate-400 shrink-0 mt-0.5" />
              <p className="text-[11px] text-slate-500 leading-snug">
                <span className="font-black text-slate-700 uppercase tracking-widest mr-1">Note:</span> 
                Prices fluctuate based on retailer updates and region. Please confirm the final total on the merchant&apos;s checkout page.
              </p>
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

        {/* Local Active Coupons Section */}
        {product.localCoupons && product.localCoupons.length > 0 && (
          <div className="mt-12 bg-white rounded-[32px] p-8 border border-slate-100 shadow-sm">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
              <div>
                <span className="inline-flex items-center gap-1.5 bg-orange-100 text-[#FF9800] text-[10px] font-black uppercase tracking-widest px-3 py-1 rounded-full mb-2">
                  <Tag className="w-3.5 h-3.5" /> Coupons Mart verified
                </span>
                <h2 className="text-[26px] font-black text-[#1A1C1C] tracking-tight">
                  {product.localStore 
                    ? `Active Coupons for ${product.localStore.name}` 
                    : `Trending ${product.fallbackCategory || 'Popular'} Deals`}
                </h2>
                <p className="text-slate-400 text-[14px]">
                  {product.localStore 
                    ? "Use these discount promo codes at checkout to maximize your cashback savings!"
                    : `We don't have coupons for ${product.brand} yet, but here are the best category deals!`}
                </p>
              </div>
              <a
                href={product.localStore ? `/store/${product.localStore.slug}` : '/stores'}
                className="inline-flex items-center gap-2 bg-[#FF6A13] hover:bg-[#E65F11] text-white font-bold text-[14px] px-6 py-3.5 rounded-2xl transition-all shadow-md shadow-orange-500/10 hover:shadow-orange-500/20 active:scale-[0.98] shrink-0"
              >
                {product.localStore ? 'Go to Store Details' : 'Browse All Stores'} <ExternalLink className="w-4 h-4" />
              </a>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {product.localCoupons.map((coupon: any) => {
                const storeSlug = coupon.storeInfo?.slug || (product.localStore ? product.localStore.slug : '');
                const storeName = coupon.storeInfo?.name || (product.localStore ? product.localStore.name : '');
                const cashbackRate = coupon.storeInfo?.cashbackRate || (product.localStore ? product.localStore.cashbackRate : 0);

                return (
                  <div
                    key={coupon._id}
                    className="bg-[#FDF4E5]/40 rounded-2xl p-6 border border-[#FDF4E5] hover:border-[#FF9800] transition-all flex flex-col justify-between group"
                  >
                    <div className="mb-4">
                      <div className="flex items-center justify-between gap-2 mb-3">
                        <span className="inline-block bg-[#FF9800]/10 text-[#FF9800] text-[10px] font-black uppercase tracking-widest px-2.5 py-1 rounded-lg">
                          {coupon.discountType === 'percentage'
                            ? `${coupon.discountValue}% OFF`
                            : coupon.discountType === 'fixed'
                            ? `$${coupon.discountValue} OFF`
                            : 'HOT DEAL'}
                        </span>
                        {storeName && (
                          <span className="text-[11px] font-bold text-slate-500">
                            at {storeName} ({cashbackRate}% Cashback)
                          </span>
                        )}
                      </div>
                      <h3 className="font-extrabold text-[17px] text-[#1A1C1C] leading-snug group-hover:text-[#FF9800] transition-colors">
                        {coupon.title}
                      </h3>
                    </div>

                    {coupon.code ? (
                      <div
                        onClick={() => {
                          const trackingUrl = `${API_URL}/track/${coupon._id}`;
                          navigator.clipboard.writeText(coupon.code);
                          setActiveCopiedCoupon({
                            code: coupon.code,
                            title: coupon.title,
                            storeName: storeName || 'Partner Store',
                            cashbackRate: cashbackRate
                          });
                          window.open(trackingUrl, '_blank');
                        }}
                        className="flex items-center justify-between gap-3 bg-white border border-slate-200 px-4 py-3 rounded-xl cursor-pointer hover:border-[#FF9800] hover:bg-[#FDF4E5]/20 transition-all"
                      >
                        <div className="flex items-center gap-2">
                          <Tag className="w-4 h-4 text-slate-400" />
                          <span className="font-bold text-[14px] text-slate-700 tracking-wider font-mono">{coupon.code}</span>
                        </div>
                        <span className="text-[11px] font-black text-[#FF9800] uppercase tracking-widest">
                          Copy Code
                        </span>
                      </div>
                    ) : (
                      <button
                        onClick={() => {
                          const trackingUrl = `${API_URL}/track/${coupon._id}`;
                          window.open(trackingUrl, '_blank');
                        }}
                        className="w-full flex items-center justify-center bg-white border border-slate-200 hover:border-slate-300 font-bold text-[13px] uppercase tracking-widest py-3 rounded-xl transition-all"
                      >
                        Activate Deal
                      </button>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        )}

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
                {product.retailers.slice(0, visibleCount).map((retailer: any, index: number) => {
                  const isCheapest = cheapestRetailer?.name === retailer.name;
                  const isSoldOut = ['Sold Out', 'Out of Stock'].includes(retailer.status);
                  return (
                    <motion.div
                      key={`${retailer.name}-${index}`}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      transition={{ delay: (index % 6) * 0.05 }}
                      className={`bg-white rounded-[24px] p-6 border transition-all relative overflow-hidden group ${isCheapest ? 'border-[#FF9800] shadow-[0_20px_40px_rgba(255,152,0,0.15)] scale-[1.02] z-10' : 'border-slate-100 hover:border-slate-200 shadow-sm'}`}
                    >
                      {/* Deal Badge */}
                      {(isCheapest || retailer.discount) && (
                        <div className="absolute top-0 right-0">
                          <div className={`px-4 py-1.5 rounded-bl-2xl text-[10px] font-black uppercase tracking-widest ${isCheapest ? 'bg-[#FF9800] text-white' : 'bg-green-500 text-white'}`}>
                            {isCheapest ? '⭐ Best Price' : retailer.discount}
                          </div>
                        </div>
                      )}

                      <div className="flex items-center justify-between mb-4 mt-2">
                        <span className="font-black text-[18px] text-[#1A1C1C]">{retailer.name}</span>
                        {retailer.status && (
                          <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${getStatusColor(retailer.status)}`}>
                            {retailer.status}
                          </span>
                        )}
                      </div>

                      <div className="space-y-4 mb-6">
                        <div className="flex items-baseline gap-2">
                          {retailer.price > 0 ? (
                            <>
                              <span className="text-[32px] font-black text-[#1A1C1C] tracking-tighter">${retailer.price.toFixed(2)}</span>
                              {retailer.originalPrice && (
                                <span className="text-slate-300 text-[16px] line-through">${retailer.originalPrice.toFixed(2)}</span>
                              )}
                            </>
                          ) : (
                            <span className="text-[22px] font-black text-[#FF9800] tracking-tight uppercase">Special Offer</span>
                          )}
                        </div>

                        {/* Cashback Info */}
                        {retailer.cashback && (
                          <div className="flex items-center gap-2 text-green-600 font-bold text-[12px] bg-green-50 px-3 py-1.5 rounded-xl border border-green-100/50">
                            <Shield className="w-3.5 h-3.5" />
                            +{retailer.cashback} Cashback
                          </div>
                        )}

                        {/* Coupon Code */}
                        {retailer.couponCode && (
                          <div
                            onClick={() => {
                              navigator.clipboard.writeText(retailer.couponCode);
                              setActiveCopiedCoupon({
                                code: retailer.couponCode,
                                title: retailer.discount || 'Verified Deal',
                                storeName: retailer.name.replace(' (Authorized Partner)', ''),
                                cashbackRate: parseFloat(retailer.cashback || '0') || 0
                              });
                              if (retailer.couponId) {
                                window.open(`${API_URL}/track/${retailer.couponId}`, '_blank');
                              }
                            }}
                            className="flex items-center justify-between gap-2 bg-slate-50 border border-dashed border-slate-200 px-4 py-2.5 rounded-xl group/coupon cursor-pointer hover:border-[#FF9800] transition-colors"
                          >
                            <div className="flex items-center gap-2">
                              <Tag className="w-3.5 h-3.5 text-slate-400" />
                              <span className="text-[12px] font-black text-[#1A1C1C] uppercase tracking-wider">{retailer.couponCode}</span>
                            </div>
                            <span className="text-[10px] font-bold text-[#FF9800] uppercase tracking-widest opacity-0 group-hover/coupon:opacity-100 transition-opacity">Copy</span>
                          </div>
                        )}
                        
                        {/* Verification Status */}
                        <div className="flex items-center gap-1.5 opacity-60">
                          <div className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse" />
                          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                            Verified {retailer.lastUpdated || 'just now'}
                          </span>
                        </div>
                      </div>

                      <a
                        href={retailer.couponId ? `${API_URL}/track/${retailer.couponId}` : retailer.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`w-full flex items-center justify-center gap-2 font-black text-[13px] uppercase tracking-widest py-4 rounded-xl transition-all shadow-lg ${
                          isSoldOut || retailer.url === '#'
                            ? 'bg-slate-100 text-slate-400 pointer-events-none'
                            : 'bg-[#1A1C1C] text-white hover:bg-[#FF9800] shadow-black/10 hover:shadow-[#FF9800]/20 active:scale-[0.98]'
                        }`}
                      >
                        {isSoldOut ? 'Out of Stock' : <> Claim Deal <ExternalLink className="w-4 h-4" /></>}
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

      {/* Coupon Copy Success Glassmorphic Modal */}
      <AnimatePresence>
        {activeCopiedCoupon && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-slate-900/60 backdrop-blur-md flex items-center justify-center z-[9999] px-4"
          >
            <motion.div
              initial={{ scale: 0.95, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 20 }}
              className="bg-white rounded-[32px] max-w-[480px] w-full p-8 shadow-2xl border border-slate-100 relative overflow-hidden"
            >
              {/* Confetti Background Gradient */}
              <div className="absolute top-0 left-0 right-0 h-2 bg-gradient-to-r from-orange-500 via-amber-500 to-yellow-500" />
              
              <div className="flex flex-col items-center text-center mt-2">
                <div className="w-16 h-16 rounded-full bg-green-50 flex items-center justify-center mb-5 border border-green-100">
                  <Tag className="w-8 h-8 text-green-500" />
                </div>
                
                <h3 className="text-[24px] font-black text-[#1A1C1C] leading-tight mb-2">
                  Coupon Code Copied!
                </h3>
                <p className="text-slate-400 text-[14px] leading-relaxed mb-6">
                  We have copied the promo code and opened <span className="font-extrabold text-[#1A1C1C]">{activeCopiedCoupon.storeName}</span> in a new tab so you can shop.
                </p>

                {/* Promo Code Box */}
                <div className="w-full bg-[#FDF4E5]/40 border-2 border-dashed border-[#FF9800]/30 rounded-2xl p-5 mb-6 relative group">
                  <span className="text-[10px] font-black uppercase tracking-widest text-slate-400 block mb-1">Promo Code</span>
                  <span className="text-[28px] font-mono font-black text-[#FF9800] tracking-widest selection:bg-transparent">
                    {activeCopiedCoupon.code}
                  </span>
                  <div className="absolute bottom-2 right-4 text-[9px] font-bold text-slate-400 bg-white px-2 py-0.5 rounded-md shadow-sm border border-slate-100">
                    Copied to Clipboard
                  </div>
                </div>

                {/* Cashback Activation Alert */}
                {activeCopiedCoupon.cashbackRate > 0 && (
                  <div className="flex items-start gap-3 bg-green-50 border border-green-100/50 rounded-2xl p-4 text-left w-full mb-8">
                    <Shield className="w-5 h-5 text-green-600 shrink-0 mt-0.5" />
                    <div>
                      <span className="font-black text-[12px] text-green-800 uppercase tracking-widest block mb-0.5">
                        Cashback Active
                      </span>
                      <p className="text-[11px] text-green-600 leading-normal">
                        Earn <span className="font-black">{activeCopiedCoupon.cashbackRate}% Cashback</span> on your purchase! Paste this code at checkout to claim extra savings.
                      </p>
                    </div>
                  </div>
                )}

                <button
                  onClick={() => setActiveCopiedCoupon(null)}
                  className="w-full bg-[#1A1C1C] hover:bg-[#FF9800] text-white font-bold text-[15px] py-4 rounded-2xl transition-all shadow-lg active:scale-[0.98]"
                >
                  Continue Shopping
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
