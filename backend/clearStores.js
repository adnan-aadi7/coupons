/**
 * clearStores.js
 * Run this script to remove all dummy/seeded stores from MongoDB.
 * Usage: node clearStores.js
 */
const mongoose = require('mongoose');
const Store = require('./src/models/Store');
require('dotenv').config();

const clearAllStores = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/coupons');
    console.log('✅ Connected to MongoDB');

    const result = await Store.deleteMany({});
    console.log(`🗑️  Deleted ${result.deletedCount} dummy stores from database.`);
    console.log('✅ Done! Stores collection is now empty.');
    console.log('ℹ️  Real stores will be populated from Skimlinks once your account is approved.');
    process.exit(0);
  } catch (error) {
    console.error('❌ Error clearing stores:', error);
    process.exit(1);
  }
};

clearAllStores();
