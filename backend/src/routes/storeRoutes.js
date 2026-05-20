const express = require('express');
const router = express.Router();
const { getStores, getStoreBySlug, trackStoreVisit, toggleFavoriteStore, fetchStoreBanners, proxyImage } = require('../controllers/storeController');
const { protect } = require('../middleware/authMiddleware');

router.get('/', getStores);
router.get('/proxy-image', proxyImage); // Bypasses adblockers/mixed content
router.post('/fetch-banners', fetchStoreBanners); // Admin: one-time call to populate banners
router.get('/:slug/visit', trackStoreVisit); // Track store-level cashback activation
router.get('/:slug', getStoreBySlug);
router.post('/:id/favorite', protect, toggleFavoriteStore);

module.exports = router;
