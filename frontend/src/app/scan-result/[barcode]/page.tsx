import ScanResultDisplay from "@/components/scanner/ScanResultDisplay";
import { Metadata } from "next";

type Props = {
  params: { barcode: string };
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const barcode = decodeURIComponent(params.barcode);
  
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/products/lookup/${encodeURIComponent(barcode)}`);
    const data = await res.json();
    
    if (data.success && data.product) {
      const product = data.product;
      const title = `${product.name} Best Price & Deals | Barcode ${barcode}`;
      const description = `Find the lowest price for ${product.name} by ${product.brand}. Scanned barcode ${barcode} on Coupons Mart to get instant coupons and cashback.`;
      
      return {
        title,
        description,
        openGraph: {
          title,
          description,
          images: product.image ? [{ url: product.image }] : [],
        },
      };
    }
  } catch (error) {
    console.error("SEO Metadata fetch failed:", error);
  }

  return {
    title: `Product Result: ${barcode}`,
    description: `Scanning results for barcode ${barcode} on Coupons Mart. Find deals and coupons.`,
  };
}

export default function Page({ params }: Props) {
  return (
    <>
      <ScanResultDisplay />
      {/* Dynamic Product Schema for Rich Snippets */}
      <ProductSchema barcode={params.barcode} />
    </>
  );
}

async function ProductSchema({ barcode }: { barcode: string }) {
  const decodedBarcode = decodeURIComponent(barcode);
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/products/lookup/${encodeURIComponent(decodedBarcode)}`);
    const data = await res.json();
    
    if (data.success && data.product) {
      const product = data.product;
      const cheapestRetailer = product.retailers.length > 0
        ? product.retailers.reduce((min: any, r: any) => r.price < min.price ? r : min, product.retailers[0])
        : null;

      return (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org/",
              "@type": "Product",
              "name": product.name,
              "image": product.image ? [product.image] : [],
              "description": product.description,
              "sku": decodedBarcode,
              "mpn": decodedBarcode,
              "brand": {
                "@type": "Brand",
                "name": product.brand
              },
              "offers": {
                "@type": "AggregateOffer",
                "url": `https://couponsmart.com/scan-result/${barcode}`,
                "priceCurrency": "USD",
                "lowPrice": cheapestRetailer?.price || 0,
                "offerCount": product.retailers.length,
                "availability": "https://schema.org/InStock"
              }
            })
          }}
        />
      );
    }
  } catch (e) {
    return null;
  }
  return null;
}
