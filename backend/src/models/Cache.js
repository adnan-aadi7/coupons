const mongoose = require('mongoose');

const CacheSchema = new mongoose.Schema({
  barcode: { type: String, required: true, unique: true },
  productData: {
    title: String,
    brand: String,
    category: String,
    imageUrl: String,
    description: String
  },
  lastUpdated: { type: Date, default: Date.now, expires: '24h' } // Auto-delete after 24 hours
});

module.exports = mongoose.model('Cache', CacheSchema);
