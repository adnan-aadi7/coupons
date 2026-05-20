const { getProductDetails } = require('./productController');
const Coupon = require('../models/Coupon');

/**
 * @desc    Search for coupons by barcode (UPC)
 * @route   POST /api/search/barcode
 */
exports.searchByBarcode = async (req, res) => {
  try {
    const { barcode } = req.body;

    if (!barcode) {
      return res.status(400).json({ success: false, message: 'Barcode is required' });
    }

    const product = await getProductDetails(barcode);

    if (!product) {
      return res.status(404).json({
        success: false,
        message: 'Product not found for this barcode.'
      });
    }

    res.status(200).json({
      success: true,
      data: product
    });

  } catch (error) {
    console.error('Search Error:', error.message);
    res.status(500).json({ success: false, message: 'Server Error during search' });
  }
};

/**
 * @desc    Global autocomplete search for stores & deals
 * @route   GET /api/search/global?q=nike
 */
exports.globalSearch = async (req, res) => {
  try {
    const { q } = req.query;

    if (!q || q.trim().length < 2) {
      return res.status(200).json({ success: true, stores: [], deals: [] });
    }

    const regex = new RegExp(q.trim(), 'i');

    // Get distinct matching stores with logo
    const storeResults = await Coupon.aggregate([
      { $match: { isActive: true, $or: [{ store: regex }, { brand: regex }] } },
      { $group: { _id: '$store', logo: { $first: '$brandLogo' }, slug: { $first: '$brand' } } },
      { $limit: 5 }
    ]);

    // Get matching deals/coupons
    const dealResults = await Coupon.find({
      isActive: true,
      $or: [{ title: regex }, { store: regex }, { category: regex }]
    })
      .select('title store brandLogo discountValue discountType type')
      .limit(5)
      .lean();

    res.setHeader('Cache-Control', 'public, s-maxage=300, stale-while-revalidate=59');
    return res.status(200).json({
      success: true,
      stores: storeResults.map(s => ({
        name: s._id,
        logo: s.logo || null,
        slug: (s._id || '').toLowerCase().replace(/\s+/g, '-'),
      })),
      deals: dealResults,
    });

  } catch (error) {
    console.error('Global Search Error:', error.message);
    res.status(500).json({ success: false, message: 'Search failed' });
  }
};
