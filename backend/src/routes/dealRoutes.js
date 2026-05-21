const express = require('express');
const router = express.Router();
const { getDeals, createDeal } = require('../controllers/dealController');

router.get('/', getDeals);
router.post('/', createDeal);

module.exports = router;
