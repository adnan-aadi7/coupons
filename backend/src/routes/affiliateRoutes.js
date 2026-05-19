const express = require('express');
const router = express.Router();
const affiliateController = require('../controllers/affiliateController');

// Route to monetize a specific link
router.post('/monetize', affiliateController.monetizeUrl);

// Route to get list of supported/active affiliate programs
router.get('/programs', affiliateController.getPrograms);

// Postback/Webhook for affiliate conversions
router.all('/postback', affiliateController.handlePostback);

module.exports = router;
