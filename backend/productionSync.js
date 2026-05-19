require('dotenv').config();
const mongoose = require('mongoose');
const { syncAdmitadCoupons } = require('./src/services/admitadService');
const Store = require('./src/models/Store');
const Coupon = require('./src/models/Coupon');

const runProductionSync = async () => {
  try {
    console.log('🚀 Starting Production-Level Sync...');
    
    await mongoose.connect(process.env.MONGO_URI);
    console.log('✅ Connected to Database');

    // 1. CLEAR DUMMY DATA
    console.log('🧹 Clearing dummy stores and coupons...');
    await Store.deleteMany({});
    await Coupon.deleteMany({});
    console.log('✨ Database Cleared.');

    // 2. FETCH REAL DATA FROM ADMITAD
    console.log('📡 Fetching real programs and coupons from Admitad...');
    const result = await syncAdmitadCoupons();
    
    if (result.success) {
      console.log(`✅ Success! Synced ${result.count} real coupons from your joined programs.`);
      
      const storesCount = await Store.countDocuments();
      console.log(`🏢 Total Real Stores Found: ${storesCount}`);
    } else {
      console.log('❌ Sync Failed:', result.message);
    }

    console.log('🏁 Production Sync Finished. Your website is now live with real data.');
    process.exit(0);
  } catch (error) {
    console.error('💥 Fatal Error during Production Sync:', error);
    process.exit(1);
  }
};

runProductionSync();
