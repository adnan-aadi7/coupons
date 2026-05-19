const mongoose = require('mongoose');
require('dotenv').config();
const Coupon = require('./src/models/Coupon');
const Store = require('./src/models/Store');

async function run() {
  await mongoose.connect(process.env.MONGO_URI);
  console.log('Connected to Database.');
  
  const couponCats = await Coupon.distinct('category');
  console.log('Unique Coupon Categories in DB:', couponCats);
  
  const storeCats = await Store.distinct('category');
  console.log('Unique Store Categories in DB:', storeCats);
  
  const coupons = await Coupon.find({});
  console.log(`Total Coupons: ${coupons.length}`);
  if (coupons.length > 0) {
    console.log('Sample Coupon Category:', coupons[0].category);
    console.log('Sample Coupon Info:', { 
      title: coupons[0].title, 
      store: coupons[0].store, 
      category: coupons[0].category 
    });
  }

  process.exit(0);
}
run();
