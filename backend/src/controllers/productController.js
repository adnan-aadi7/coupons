const Store = require('../models/Store');
const Coupon = require('../models/Coupon');
const Cache = require('../models/Cache');

/**
 * Shared helper to lookup product details from APIs and match local stores/coupons
 * @param {string} barcode 
 * @returns {Promise<Object|null>}
 */
const fetchProductFromUPC = async (barcode) => {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 3000);
  try {
    const res = await fetch(
      `https://api.upcitemdb.com/prod/trial/lookup?upc=${barcode}`,
      { signal: controller.signal, headers: { 'Accept': 'application/json' } }
    );
    const data = await res.json();
    if (data.code === 'OK' && data.items && data.items.length > 0) {
      const item = data.items[0];
      return {
        barcode,
        name: item.title || 'Unknown Product',
        brand: item.brand || '',
        category: item.category || 'General',
        description: item.description || '',
        image: (item.images && item.images[0]) || null,
        retailers: (item.offers || []).map(o => ({
          name: o.merchant, price: parseFloat(o.price) || 0,
          status: o.availability || 'In Stock', url: o.link || '#',
        })),
        source: 'upcitemdb',
      };
    }
  } catch { /* silent fail */ } finally { clearTimeout(timeout); }
  return null;
};

const fetchProductFromOFF = async (barcode) => {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 2500);
  try {
    const res = await fetch(
      `https://world.openfoodfacts.org/api/v2/product/${barcode}.json`,
      { signal: controller.signal }
    );
    const data = await res.json();
    if (data.status === 1 && data.product) {
      const p = data.product;
      return {
        barcode, name: p.product_name || p.product_name_en || 'Unknown Product',
        brand: p.brands || '',
        category: p.categories_tags ? p.categories_tags[0]?.replace('en:', '') : 'General',
        description: p.generic_name || '',
        image: p.image_url || p.image_front_url || null,
        retailers: [], source: 'openfoodfacts',
      };
    }
  } catch { /* silent fail */ } finally { clearTimeout(timeout); }
  return null;
};

const getProductDetails = async (barcode) => {
  try {
    // ── 0. Check cache first (skip if old format — no retailers) ────────────
    const cached = await Cache.findOne({ barcode }).lean();
    if (cached?.productData?.retailers) return cached.productData;

    // ── 1. Hit both external APIs in parallel ────────────────────────────────
    const [upcResult, offResult] = await Promise.allSettled([
      fetchProductFromUPC(barcode),
      fetchProductFromOFF(barcode),
    ]);

    const product = upcResult.value || offResult.value;
    if (!product) return null;

    // ── 2. Look up local store/coupons in parallel ───────────────────────────
    const brandQuery = product.brand ? product.brand.trim() : '';
    if (brandQuery) {
      const localStore = await Store.findOne({
        $or: [
          { name: { $regex: new RegExp(`\\b${brandQuery}\\b`, 'i') } },
          { slug: { $regex: new RegExp(`\\b${brandQuery}\\b`, 'i') } }
        ]
      }).lean();

      if (localStore) {
        const activeCoupons = await Coupon.find({
          store: { $regex: new RegExp(`^${localStore.name}$`, 'i') },
          isActive: true
        }).limit(5).lean();

        product.localStore = {
          name: localStore.name, slug: localStore.slug,
          logoUrl: localStore.logoUrl, cashbackRate: localStore.cashbackRate,
          rating: localStore.rating, description: localStore.description,
        };

        product.localCoupons = (activeCoupons || []).map(c => ({
          _id: c._id, title: c.title, code: c.code,
          isCode: c.isCode, discountType: c.discountType, discountValue: c.discountValue,
        }));

        const basePrice = product.retailers?.length
          ? Math.min(...product.retailers.map(r => r.price)) : 0;
        const cashbackStr = localStore.cashbackRate > 0 ? `${localStore.cashbackRate}%` : '';

        product.retailers.unshift({
          name: `${localStore.name} (Authorized Partner)`,
          price: basePrice > 0 ? basePrice * (1 - (localStore.cashbackRate / 100)) : 0,
          originalPrice: basePrice > 0 ? basePrice : undefined,
          discount: cashbackStr ? `🔥 Extra ${cashbackStr} Cashback` : 'Verified Deal',
          cashback: cashbackStr || undefined, status: 'In Stock',
          couponCode: activeCoupons?.length ? activeCoupons[0].code : undefined,
          couponId: activeCoupons?.length ? activeCoupons[0]._id : undefined,
          url: `/store/${localStore.slug}`,
        });
      } else {
        // ── 2b. Fallback: category or popular stores ─────────────────────────
        const categoryQuery = product.category?.trim() || '';
        let fallbackStores = categoryQuery && categoryQuery.toLowerCase() !== 'general'
          ? await Store.find({ category: { $regex: new RegExp(categoryQuery, 'i') } }).limit(3).lean()
          : [];

        if (!fallbackStores.length) {
          fallbackStores = await Store.find({
            name: { $in: ['eBay', 'AliExpress', 'Walmart', 'Target'] }
          }).limit(3).lean();
        }

        if (fallbackStores.length) {
          const storeNames = fallbackStores.map(s => s.name);
          const fallbackCoupons = await Coupon.find({
            store: { $in: storeNames }, isActive: true
          }).limit(4).lean();

          product.fallbackCategory = categoryQuery?.toLowerCase() !== 'general'
            ? categoryQuery : 'Popular Partner';

          product.localCoupons = fallbackCoupons.map(c => {
            const ms = fallbackStores.find(s => s.name.toLowerCase() === c.store.toLowerCase());
            return {
              _id: c._id, title: c.title, code: c.code, isCode: c.isCode,
              discountType: c.discountType, discountValue: c.discountValue,
              storeInfo: {
                name: c.store,
                slug: ms ? ms.slug : c.store.toLowerCase().replace(/\s+/g, '-'),
                logoUrl: ms?.logoUrl, cashbackRate: ms?.cashbackRate || 0,
              },
            };
          });
        }
      }
    }

    // ── 3. Cache result ──────────────────────────────────────────────────────
    Cache.findOneAndUpdate({ barcode }, {
      barcode, productData: { ...product },
      lastUpdated: new Date(),
    }, { upsert: true }).catch(() => {});

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
