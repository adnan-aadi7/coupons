const express = require('express');
const router = express.Router();
const { getStores, getStoreBySlug, toggleFavoriteStore, fetchStoreBanners, proxyImage } = require('../controllers/storeController');
const { protect } = require('../middleware/authMiddleware');

router.get('/', getStores);
router.get('/proxy-image', proxyImage); // Bypasses adblockers/mixed content
router.post('/fetch-banners', fetchStoreBanners); // Admin: one-time call to populate banners
router.get('/:slug', getStoreBySlug);
router.post('/:id/favorite', protect, toggleFavoriteStore);

module.exports = router;
