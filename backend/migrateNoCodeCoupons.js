const mongoose = require('mongoose');
const Coupon = require('./src/models/Coupon');
const Deal = require('./src/models/Deal');
require('dotenv').config();

async function migrate() {
  const uri = process.env.MONGO_URI || 'mongodb://localhost:27017/coupons';
  console.log('Connecting to database...');
  await mongoose.connect(uri);
  console.log('Connected to MongoDB successfully!');

  // A coupon is actually a deal if it has no code, or isCode is false
  console.log('Finding coupons without codes in coupons collection...');
  const noCodeCoupons = await Coupon.find({
    $or: [
      { code: { $in: [null, undefined, ''] } },
      { isCode: false }
    ]
  });
  console.log(`Found ${noCodeCoupons.length} coupons without code in coupons collection.`);

  if (noCodeCoupons.length === 0) {
    console.log('No no-code coupons to migrate!');
    process.exit(0);
  }

  let migratedCount = 0;
  let skippedCount = 0;

  for (const doc of noCodeCoupons) {
    const rawData = doc.toObject();
    const originalId = rawData._id;

    // Check if it already exists in Deals collection
    const query = rawData.admitadId 
      ? { $or: [{ _id: originalId }, { admitadId: rawData.admitadId }] } 
      : { _id: originalId };

    const alreadyExists = await Deal.findOne(query);

    // Set type to deal and isCode to false
    rawData.type = 'deal';
    rawData.isCode = false;

    if (!alreadyExists) {
      await Deal.create(rawData);
      migratedCount++;
    } else {
      skippedCount++;
    }

    // Delete from Coupons collection
    await Coupon.deleteOne({ _id: originalId });
  }

  console.log('--- Migration Completed ---');
  console.log(`Total No-Code Coupons Migrated to 'deals' Collection: ${migratedCount}`);
  console.log(`Total Already Present/Skipped: ${skippedCount}`);

  // Let's verify final counts in both collections
  const finalCoupons = await Coupon.countDocuments({});
  const finalDeals = await Deal.countDocuments({});
  console.log(`Final Real Coupons count in DB: ${finalCoupons}`);
  console.log(`Final Real Deals count in DB: ${finalDeals}`);

  process.exit(0);
}

migrate().catch(err => {
  console.error('Migration failed with critical error:', err);
  process.exit(1);
});
