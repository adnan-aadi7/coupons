const mongoose = require('mongoose');

const StoreSchema = new mongoose.Schema({
  name: { type: String, required: true },
  slug: { type: String, required: true, unique: true },
  logoUrl: { type: String },
  description: { type: String },
  baseUrl: { type: String },
  affiliateUrl: { type: String },
  cashbackRate: { type: Number, default: 0 },
  category: { type: String },
  rating: { type: Number, default: 4.5 },
  verifiedStore: { type: Boolean, default: true },
  totalSavingsProvided: { type: Number, default: 0 },
}, { timestamps: true });

module.exports = mongoose.model('Store', StoreSchema);
