const Store = require('../models/Store');
const Coupon = require('../models/Coupon');

/**
 * Shared helper to lookup product details from APIs and match local stores/coupons
 * @param {string} barcode 
 * @returns {Promise<Object|null>}
 */
const getProductDetails = async (barcode) => {
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

    // ── 3. Scan local DB for matching Stores and active Coupons ─────────────
    if (product) {
      // Find matching Store by Brand Name or Slug (case-insensitive regex with word boundary)
      const brandQuery = product.brand ? product.brand.trim() : '';
      if (brandQuery) {
        const localStore = await Store.findOne({
          $or: [
            { name: { $regex: new RegExp(`\\b${brandQuery}\\b`, 'i') } },
            { slug: { $regex: new RegExp(`\\b${brandQuery}\\b`, 'i') } }
          ]
        });

        if (localStore) {
          // Fetch active coupons for this store
          const activeCoupons = await Coupon.find({
            store: { $regex: new RegExp(`^${localStore.name}$`, 'i') },
            isActive: true
          }).limit(5);

          product.localStore = {
            name: localStore.name,
            slug: localStore.slug,
            logoUrl: localStore.logoUrl,
            cashbackRate: localStore.cashbackRate,
            rating: localStore.rating,
            description: localStore.description
          };

          product.localCoupons = activeCoupons.map(c => ({
            _id: c._id,
            title: c.title,
            code: c.code,
            isCode: c.isCode,
            discountType: c.discountType,
            discountValue: c.discountValue
          }));

          // Calculate a realistic reference price based on other retailers
          const basePrice = (product.retailers && product.retailers.length > 0)
            ? Math.min(...product.retailers.map(r => r.price))
            : 0;

          // Inject custom authorized retailer representing our partner platform store at the absolute top
          const cashbackStr = localStore.cashbackRate > 0 ? `${localStore.cashbackRate}%` : '';

          product.retailers.unshift({
            name: `${localStore.name} (Authorized Partner)`,
            price: basePrice > 0 ? basePrice * (1 - (localStore.cashbackRate / 100)) : 0,
            originalPrice: basePrice > 0 ? basePrice : undefined,
            discount: cashbackStr ? `🔥 Extra ${cashbackStr} Cashback` : 'Verified Deal',
            cashback: cashbackStr || undefined,
            status: 'In Stock',
            couponCode: activeCoupons.length > 0 ? activeCoupons[0].code : undefined,
            couponId: activeCoupons.length > 0 ? activeCoupons[0]._id : undefined,
            url: `/store/${localStore.slug}` // Dynamic local redirect link
          });
        }
      }

      // ── 3b. Smart Fallbacks: Category match or Popular general stores ─────
      if (!product.localStore) {
        // Try Category search first
        const categoryQuery = product.category ? product.category.trim() : '';
        let fallbackStores = [];

        if (categoryQuery && categoryQuery.toLowerCase() !== 'general') {
          fallbackStores = await Store.find({
            category: { $regex: new RegExp(categoryQuery, 'i') }
          }).limit(3);
        }

        // Secondary fallback: popular general platform stores
        if (fallbackStores.length === 0) {
          fallbackStores = await Store.find({
            name: { $in: ['eBay', 'AliExpress', 'Walmart', 'Target'] }
          }).limit(3);
        }

        if (fallbackStores.length > 0) {
          const storeNames = fallbackStores.map(s => s.name);
          const fallbackCoupons = await Coupon.find({
            store: { $in: storeNames },
            isActive: true
          }).limit(4);

          product.fallbackCategory = categoryQuery && categoryQuery.toLowerCase() !== 'general' 
            ? categoryQuery 
            : 'Popular Partner';

          product.localCoupons = fallbackCoupons.map(c => {
            const matchingStore = fallbackStores.find(s => s.name.toLowerCase() === c.store.toLowerCase());
            return {
              _id: c._id,
              title: c.title,
              code: c.code,
              isCode: c.isCode,
              discountType: c.discountType,
              discountValue: c.discountValue,
              storeInfo: {
                name: c.store,
                slug: matchingStore ? matchingStore.slug : c.store.toLowerCase().replace(/\s+/g, '-'),
                logoUrl: matchingStore ? matchingStore.logoUrl : undefined,
                cashbackRate: matchingStore ? matchingStore.cashbackRate : 0
              }
            };
          });
        }
      }
    }

    return product;
  } catch (err) {
    console.error('[getProductDetails] Error:', err);
    return null;
  }
};

const lookupProduct = async (req, res) => {
  const { barcode } = req.params;

  if (!barcode) {
    return res.status(400).json({ success: false, message: 'Barcode is required' });
  }

  try {
    const product = await getProductDetails(barcode);

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

module.exports = { lookupProduct, getProductDetails };
