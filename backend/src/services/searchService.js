const axios = require('axios');
const Cache = require('../models/Cache');
const Coupon = require('../models/Coupon');

/**
 * Service to handle barcode product search and matching
 */
class SearchService {
  /**
   * Search for product by barcode across multiple providers
   * @param {string} barcode 
   */
  async searchByBarcode(barcode) {
    // 1. Check MongoDB Cache
    let cachedProduct = await Cache.findOne({ barcode });
    if (cachedProduct) {
      return { productData: cachedProduct.productData, source: 'cache' };
    }

    // 2. Waterfall Search (Free Options)
    let productData = await this._fetchFromOpenFoodFacts(barcode);

    if (!productData) {
      productData = await this._fetchFromUPCitemdb(barcode);
    }

    // 3. Fallback and Cache
    if (!productData) {
      productData = {
        title: "Generic Product",
        brand: "Unknown",
        category: "General",
        imageUrl: null
      };
    }

    await Cache.create({ barcode, productData });
    return { productData, source: 'api' };
  }

  /**
   * Match product data to local coupons
   * @param {Object} productData 
   */
  async findMatchingCoupons(productData) {
    const { brand, category } = productData;
    return await Coupon.find({
      $or: [
        { brand: new RegExp(brand, 'i') },
        { category: new RegExp(category, 'i') }
      ],
      isActive: true
    }).sort({ popularity: -1 });
  }

  // --- Private Helpers ---

  async _fetchFromOpenFoodFacts(barcode) {
    try {
      const response = await axios.get(`https://world.openfoodfacts.org/api/v0/product/${barcode}.json`, { timeout: 3000 });
      if (response.data && response.data.status === 1) {
        const p = response.data.product;
        return {
          title: p.product_name || "Unknown Product",
          brand: p.brands || "Unknown Brand",
          category: p.categories ? p.categories.split(',')[0] : "General",
          imageUrl: p.image_url || null
        };
      }
    } catch (err) {
      console.warn('Open Food Facts failed');
    }
    return null;
  }

  async _fetchFromUPCitemdb(barcode) {
    try {
      const response = await axios.get(`https://api.upcitemdb.com/prod/trial/lookup?upc=${barcode}`, { timeout: 5000 });
      if (response.data && response.data.items && response.data.items.length > 0) {
        const item = response.data.items[0];
        return {
          title: item.title,
          brand: item.brand,
          category: item.category ? item.category.split('>')[0].trim() : "General",
          imageUrl: item.images && item.images.length > 0 ? item.images[0] : null
        };
      }
    } catch (err) {
      console.warn('UPCitemdb Trial failed');
    }
    return null;
  }
}

module.exports = new SearchService();
