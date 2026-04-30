const couponService = require('../services/couponService');

/**
 * @desc    Get all active coupons with optional filters
 * @route   GET /api/coupons
 */
exports.getCoupons = async (req, res) => {
  try {
    const { brand, category, store, sort } = req.query;
    const coupons = await couponService.getCoupons({ brand, category, store, sort });
    res.status(200).json({
      success: true,
      count: coupons.length,
      data: coupons
    });
  } catch (error) {
    console.error('Fetch Coupons Error:', error.message);
    res.status(500).json({ success: false, message: 'Server Error' });
  }
};

/**
 * @desc    Create a new coupon (Admin/Feeder API)
 * @route   POST /api/coupons
 */
exports.createCoupon = async (req, res) => {
  try {
    const coupon = await couponService.createCoupon(req.body);
    res.status(201).json({ success: true, data: coupon });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};
