const express = require('express');
const { 
  simulateConversion, 
  syncAdmitad, 
  getAdminClicks 
} = require('../controllers/adminController');
const { protect, authorize } = require('../middleware/authMiddleware');

const router = express.Router();

// Get recent clicks (Admin Only)
router.get('/clicks', protect, authorize('admin'), getAdminClicks);

// Simulate affiliate conversion (Admin Only)
router.post('/simulate-conversion/:clickId', protect, authorize('admin'), simulateConversion);

// Manual sync from Admitad (Admin Only)
router.post('/sync-admitad', protect, authorize('admin'), syncAdmitad);

module.exports = router;
