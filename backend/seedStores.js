const mongoose = require('mongoose');
const Coupon = require('./src/models/Coupon');
const Store = require('./src/models/Store');
require('dotenv').config();

const seedStoresFromCoupons = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/coupons');
    console.log('Connected to MongoDB');

    const stores = await Coupon.distinct('store');
    console.log('Found unique stores in coupons:', stores);

    for (const storeName of stores) {
      const slug = storeName.toLowerCase().replace(/\s+/g, '-').replace(/[^\w-]/g, '');
      
      const existingStore = await Store.findOne({ slug });
      if (!existingStore) {
        // Find a coupon for this store to get brand logo
        const sampleCoupon = await Coupon.findOne({ store: storeName });
        
        await Store.create({
          name: storeName,
          slug,
          logoUrl: sampleCoupon?.brandLogo || `https://icon.horse/icon/${slug}.com`,
          category: sampleCoupon?.category || 'General',
          cashbackRate: Math.floor(Math.random() * 15) + 2, // Random cashback between 2-17%
          verifiedStore: true
        });
        console.log(`Created store: ${storeName}`);
      }
    }

    console.log('Stores seeded successfully');
    process.exit();
  } catch (error) {
    console.error('Error seeding stores:', error);
    process.exit(1);
  }
};

seedStoresFromCoupons();
