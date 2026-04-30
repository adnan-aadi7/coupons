const express = require('express');
const router = express.Router();
const { trackClick } = require('../controllers/trackController');

router.get('/:id', trackClick);

module.exports = router;
