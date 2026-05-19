const express = require('express');
const { requestWithdrawal } = require('../controllers/withdrawalController');
const { protect } = require('../middleware/authMiddleware');

const router = express.Router();

router.post('/request', protect, requestWithdrawal);

module.exports = router;
