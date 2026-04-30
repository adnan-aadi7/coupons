const searchService = require('../services/searchService');

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

    const { productData, source } = await searchService.searchByBarcode(barcode);
    const coupons = await searchService.findMatchingCoupons(productData);

    res.status(200).json({
      success: true,
      product: productData,
      coupons,
      source
    });

  } catch (error) {
    console.error('Search Error:', error.message);
    res.status(500).json({ success: false, message: 'Server Error during search' });
  }
};
