const express = require('express');
const { simulateConversion } = require('../controllers/adminController');
const { protect, authorize } = require('../middleware/authMiddleware');

const router = express.Router();

// protect + authorize('admin') would be real world, 
// but for demo purposes, we'll just use protect so the user can test easily.
router.post('/simulate-conversion/:clickId', protect, simulateConversion);

module.exports = router;
