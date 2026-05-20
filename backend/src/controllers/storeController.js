const Store = require('../models/Store');
const https = require('https');
const http = require('http');

/**
 * Get all stores
 * @route GET /api/stores
 */
exports.getStores = async (req, res) => {
  try {
    const { category, featured, search } = req.query;
    let query = { verifiedStore: true }; // Only show approved stores

    if (category) query.category = category;
    if (search) query.name = { $regex: search, $options: 'i' };

    const stores = await Store.find(query).sort({ name: 1 });

    res.status(200).json({
      success: true,
      count: stores.length,
      data: stores
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

/**
 * Get single store by slug
 * @route GET /api/stores/:slug
 */
exports.getStoreBySlug = async (req, res) => {
  try {
    const store = await Store.findOne({ slug: req.params.slug, verifiedStore: true });
    
    if (!store) {
      return res.status(404).json({ success: false, message: 'Store not found' });
    }

    res.status(200).json({ success: true, data: store });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

/**
 * Toggle favorite store for logged-in user
 * @route POST /api/stores/:id/favorite
 * @access Private
 */
exports.toggleFavoriteStore = async (req, res) => {
  try {
    const User = require('../models/User');
    const storeId = req.params.id;
    const store = await Store.findById(storeId);
    
    if (!store) {
      return res.status(404).json({ success: false, message: 'Store not found' });
    }

    const user = await User.findById(req.user.id);
    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }

    // Toggle favorite
    const isFavorite = user.favoriteStores.includes(storeId);
    if (isFavorite) {
      user.favoriteStores = user.favoriteStores.filter(id => id.toString() !== storeId);
    } else {
      user.favoriteStores.push(storeId);
    }

    await user.save();

    res.status(200).json({ 
      success: true, 
      isFavorite: !isFavorite, 
      message: isFavorite ? 'Store removed from favorites' : 'Store added to favorites' 
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

/**
 * Helper: Fetch OG image from a URL
 */
const fetchOGImage = (urlStr) => {
  return new Promise((resolve) => {
    try {
      const parsedUrl = new URL(urlStr);
      const protocol = parsedUrl.protocol === 'https:' ? https : http;
      const req = protocol.get(urlStr, { timeout: 7000, headers: { 'User-Agent': 'Mozilla/5.0 (compatible; CouponBot/1.0)' } }, (res) => {
        // Follow redirects
        if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
          return fetchOGImage(res.headers.location).then(resolve);
        }
        let html = '';
        res.on('data', (chunk) => {
          html += chunk;
          if (html.length > 50000) req.destroy(); // Stop after 50KB to save memory
        });
        res.on('end', () => {
          // Try og:image first
          let match = html.match(/<meta[^>]+property=["']og:image["'][^>]+content=["']([^"']+)["']/i);
          if (!match) match = html.match(/<meta[^>]+content=["']([^"']+)["'][^>]+property=["']og:image["']/i);
          // Try twitter:image as fallback
          if (!match) match = html.match(/<meta[^>]+name=["']twitter:image["'][^>]+content=["']([^"']+)["']/i);
          resolve(match ? match[1] : null);
        });
        res.on('error', () => resolve(null));
      });
      req.on('error', () => resolve(null));
      req.on('timeout', () => { req.destroy(); resolve(null); });
    } catch (e) {
      resolve(null);
    }
  });
};

/**
 * Fetch & save banner images for all stores
 * @route POST /api/stores/fetch-banners
 * @access Admin (call once to populate bannerImage)
 */
exports.fetchStoreBanners = async (req, res) => {
  try {
    const stores = await Store.find({ verifiedStore: true });
    const results = [];
    
    for (const store of stores) {
      if (store.bannerImage) { results.push({ name: store.name, status: 'skipped' }); continue; }
      const siteUrl = store.baseUrl || `https://www.${store.slug}.com`;
      const ogImage = await fetchOGImage(siteUrl);
      if (ogImage) {
        // Ensure absolute URL
        let banner = ogImage.startsWith('http') ? ogImage : `https://${store.slug}.com${ogImage}`;
        await Store.findByIdAndUpdate(store._id, { bannerImage: banner });
        results.push({ name: store.name, status: 'success', banner });
      } else {
        results.push({ name: store.name, status: 'no_og_image' });
      }
    }
    
    res.status(200).json({ success: true, results });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
