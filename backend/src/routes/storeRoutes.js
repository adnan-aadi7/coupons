const express = require('express');
const router = express.Router();
const { getStores, getStoreBySlug, toggleFavoriteStore } = require('../controllers/storeController');
const { protect } = require('../middleware/authMiddleware');

router.get('/', getStores);
router.get('/:slug', getStoreBySlug);
router.post('/:id/favorite', protect, toggleFavoriteStore);

module.exports = router;
