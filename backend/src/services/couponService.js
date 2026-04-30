const Coupon = require('../models/Coupon');

/**
 * Service to handle coupon-related business logic
 */
class CouponService {
  /**
   * Get filtered and sorted coupons
   * @param {Object} filters - brand, category, store
   * @param {string} sort - popularity, newest, expiry
   * @param {number} limit - max results
   */
  async getCoupons({ brand, category, store, sort, limit = 20 }) {
    let query = { isActive: true };

    if (brand) query.brand = new RegExp(brand, 'i');
    if (category) query.category = new RegExp(category, 'i');
    if (store) query.store = new RegExp(store, 'i');

    let sortBy = { popularity: -1 };
    if (sort === 'newest') sortBy = { createdAt: -1 };
    if (sort === 'expiry') sortBy = { expiryDate: 1 };
    if (sort === 'cashback') sortBy = { discountValue: -1 };

    return await Coupon.find(query).sort(sortBy).limit(limit);
  }

  /**
   * Create a new coupon
   * @param {Object} couponData 
   */
  async createCoupon(couponData) {
    return await Coupon.create(couponData);
  }
}

module.exports = new CouponService();
