const mongoose = require('mongoose');

const StoreSchema = new mongoose.Schema({
  name: { type: String, required: true },
  slug: { type: String, required: true, unique: true },
  logoUrl: { type: String },
  bannerImage: { type: String }, // OG/hero banner image from the store website
  description: { type: String },
  baseUrl: { type: String },
  affiliateUrl: { type: String },
  cashbackRate: { type: Number, default: 0 },
  category: { type: String },
  rating: { type: Number, default: 4.5 },
  verifiedStore: { type: Boolean, default: true },
  totalSavingsProvided: { type: Number, default: 0 },
}, { timestamps: true });

// Optimize directory listings & category filters
StoreSchema.index({ verifiedStore: 1 });
StoreSchema.index({ category: 1 });

module.exports = mongoose.model('Store', StoreSchema);
