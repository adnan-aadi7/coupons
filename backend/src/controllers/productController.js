/**
 * productController.js
 * Fetches real product data from free public APIs:
 *  1. UPC Item DB (upcitemdb.com) — returns title, brand, images, and retailer offers
 *  2. Open Food Facts — fallback for food/grocery barcodes
 */

const lookupProduct = async (req, res) => {
  const { barcode } = req.params;

  if (!barcode) {
    return res.status(400).json({ success: false, message: 'Barcode is required' });
  }

  try {
    let product = null;

    // ── 1. Try UPC Item DB (free trial – no key needed) ─────────────────────
    try {
      const upcRes = await fetch(
        `https://api.upcitemdb.com/prod/trial/lookup?upc=${barcode}`,
        { headers: { 'Accept': 'application/json' } }
      );
      const upcData = await upcRes.json();

      if (upcData.code === 'OK' && upcData.items && upcData.items.length > 0) {
        const item = upcData.items[0];

        // Build retailer offers from UPC Item DB offers array
        const retailers = (item.offers || []).map((offer) => ({
          name: offer.merchant,
          price: parseFloat(offer.price) || 0,
          status: offer.availability || 'In Stock',
          url: offer.link || '#',
        }));

        product = {
          barcode,
          name: item.title || 'Unknown Product',
          brand: item.brand || '',
          category: item.category || 'General',
          description: item.description || '',
          image: (item.images && item.images[0]) || null,
          retailers,
          source: 'upcitemdb',
        };
      }
    } catch (upcErr) {
      console.warn('[ProductLookup] UPC Item DB failed:', upcErr.message);
    }

    // ── 2. Fallback: Open Food Facts ─────────────────────────────────────────
    if (!product) {
      try {
        const offRes = await fetch(
          `https://world.openfoodfacts.org/api/v2/product/${barcode}.json`
        );
        const offData = await offRes.json();

        if (offData.status === 1 && offData.product) {
          const p = offData.product;
          product = {
            barcode,
            name: p.product_name || p.product_name_en || 'Unknown Product',
            brand: p.brands || '',
            category: p.categories_tags ? p.categories_tags[0]?.replace('en:', '') : 'General',
            description: p.generic_name || '',
            image: p.image_url || p.image_front_url || null,
            retailers: [],           // OFF doesn't provide retailer pricing
            source: 'openfoodfacts',
          };
        }
      } catch (offErr) {
        console.warn('[ProductLookup] Open Food Facts failed:', offErr.message);
      }
    }

    // ── 3. Nothing found ─────────────────────────────────────────────────────
    if (!product) {
      return res.status(404).json({
        success: false,
        message: 'Product not found for this barcode.',
        barcode,
      });
    }

    return res.status(200).json({ success: true, product });
  } catch (err) {
    console.error('[ProductLookup] Error:', err);
    return res.status(500).json({ success: false, message: 'Internal server error' });
  }
};

module.exports = { lookupProduct };
