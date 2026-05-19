const Store = require('../models/Store');

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
