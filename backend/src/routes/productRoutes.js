const express = require('express');
const router = express.Router();
const { lookupProduct } = require('../controllers/productController');

// GET /api/products/lookup/:barcode
router.get('/lookup/:barcode', lookupProduct);

module.exports = router;
