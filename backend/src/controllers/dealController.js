const couponService = require('../services/couponService');

/**
 * @desc    Get all active deals with optional filters
 * @route   GET /api/deals
 */
exports.getDeals = async (req, res) => {
  try {
    const { brand, category, store, sort, limit } = req.query;
    const deals = await couponService.getCoupons({
      brand,
      category,
      store,
      sort,
      type: 'deal',
      limit: limit ? parseInt(limit, 10) : undefined
    });
    res.setHeader('Cache-Control', 'public, s-maxage=300, stale-while-revalidate=59');
    res.status(200).json({
      success: true,
      count: deals.length,
      data: deals
    });
  } catch (error) {
    console.error('Fetch Deals Error:', error.message);
    res.status(500).json({ success: false, message: 'Server Error' });
  }
};

/**
 * @desc    Create a new deal (Admin/Feeder API)
 * @route   POST /api/deals
 */
exports.createDeal = async (req, res) => {
  try {
    const deal = await couponService.createCoupon({ ...req.body, type: 'deal' });
    res.status(201).json({ success: true, data: deal });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};
