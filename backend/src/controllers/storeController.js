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

    // Optimize payload size by excluding internal fields, and use .lean() for raw JSON performance
    const stores = await Store.find(query)
      .select('-createdAt -updatedAt -__v -bannerImage')
      .sort({ name: 1 })
      .lean();

    res.setHeader('Cache-Control', 'public, s-maxage=300, stale-while-revalidate=59');
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

    res.setHeader('Cache-Control', 'public, s-maxage=300, stale-while-revalidate=59');
    res.status(200).json({ success: true, data: store });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

/**
 * Track a direct store visit / cashback activation (no specific coupon)
 * @route GET /api/stores/:slug/visit
 */
exports.trackStoreVisit = async (req, res) => {
  try {
    const store = await Store.findOneAndUpdate(
      { slug: req.params.slug, verifiedStore: true },
      { $inc: { totalClicks: 1 } },
      { new: true }
    );

    if (!store) {
      return res.status(404).json({ success: false, message: 'Store not found' });
    }

    const redirectUrl = store.affiliateUrl || store.baseUrl || `https://www.${store.slug}.com`;
    res.redirect(redirectUrl);
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

/**
 * Proxy images to bypass mixed-content (HTTP) and client-side adblockers.
 * @route GET /api/stores/proxy-image
 */
exports.proxyImage = async (req, res) => {
  try {
    const imageUrl = req.query.url;
    if (!imageUrl) {
      return res.status(400).send('URL query parameter is required');
    }

    // Parse the URL
    const parsedUrl = new URL(imageUrl);
    const protocol = parsedUrl.protocol === 'https:' ? https : http;

    const options = {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/115.0.0.0 Safari/537.36',
        'Accept': 'image/avif,image/webp,image/apng,image/svg+xml,image/*,*/*;q=0.8'
      },
      timeout: 10000
    };

    const proxyRequest = protocol.get(imageUrl, options, (proxyResponse) => {
      // Handle redirects
      if (proxyResponse.statusCode >= 300 && proxyResponse.statusCode < 400 && proxyResponse.headers.location) {
        req.query.url = proxyResponse.headers.location;
        return exports.proxyImage(req, res);
      }

      // If successful, pipe the response back
      if (proxyResponse.statusCode === 200) {
        res.setHeader('Content-Type', proxyResponse.headers['content-type'] || 'image/png');
        res.setHeader('Cache-Control', 'public, max-age=604800'); // Cache for 7 days
        proxyResponse.pipe(res);
      } else {
        res.status(proxyResponse.statusCode).send('Failed to fetch image');
      }
    });

    proxyRequest.on('error', (err) => {
      res.status(500).send('Error proxying image: ' + err.message);
    });

    proxyRequest.on('timeout', () => {
      proxyRequest.destroy();
      res.status(504).send('Image request timed out');
    });

  } catch (error) {
    res.status(500).send('Invalid URL format');
  }
};
