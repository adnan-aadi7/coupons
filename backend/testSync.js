require('dotenv').config();
const admitadService = require('./src/services/admitadService');
const mongoose = require('mongoose');

const testSync = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('Connected to DB');
    
    console.log('Starting Sync from Admitad...');
    const result = await admitadService.syncAdmitadCoupons();
    
    if (result.success) {
      console.log(`SUCCESS: Synced ${result.count} real items from Admitad API.`);
    } else {
      console.log('FAILED:', result.message);
    }
    
    process.exit();
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};

testSync();
