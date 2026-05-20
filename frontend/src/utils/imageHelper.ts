/**
 * Helper to proxy store logos to bypass client-side adblockers and mixed-content (HTTP/HTTPS) issues.
 */
export function getProxyLogoUrl(logoUrl: string | undefined | null, slug: string): string {
  const fallbackClearbit = `https://logo.clearbit.com/${slug}.com`;
  
  if (!logoUrl) {
    return fallbackClearbit;
  }
  
  // Standardize protocol to prevent local mixed content warnings
  const cleanUrl = logoUrl.replace(/^http:\/\//i, 'https://');
  
  // Build backend proxy image URL
  const API_URL = process.env.NEXT_PUBLIC_API_URL || 'https://coupons-52jf.vercel.app/api';
  return `${API_URL}/stores/proxy-image?url=${encodeURIComponent(cleanUrl)}`;
}
