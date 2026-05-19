const express = require('express');
const router = express.Router();
const { searchByBarcode, globalSearch } = require('../controllers/searchController');

router.post('/barcode', searchByBarcode);
router.get('/global', globalSearch);

module.exports = router;
