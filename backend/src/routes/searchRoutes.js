const express = require('express');
const router = express.Router();
const { searchByBarcode } = require('../controllers/searchController');

router.post('/barcode', searchByBarcode);

module.exports = router;
