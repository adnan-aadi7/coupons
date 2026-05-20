const mongoose = require('mongoose');
require('dotenv').config();

const { syncAdmitadCoupons } = require('./src/services/admitadService');

async function run() {
  await mongoose.connect(process.env.MONGO_URI);
  console.log('Connected to DB. Starting Admitad sync...');
  
  try {
    const result = await syncAdmitadCoupons();
    console.log('Sync result:', result);
  } catch (err) {
    console.error('Error during manual sync:', err.message);
  }

  await mongoose.disconnect();
}

run();
