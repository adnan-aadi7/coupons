const mongoose = require('mongoose');
const Coupon = require('./src/models/Coupon');
const Deal = require('./src/models/Deal');
require('dotenv').config();

async function migrate() {
  const uri = process.env.MONGO_URI || 'mongodb://localhost:27017/coupons';
  console.log('Connecting to database...');
  await mongoose.connect(uri);
  console.log('Connected to MongoDB successfully!');

  console.log('Finding all deals stored in coupons collection...');
  const dealsInCoupons = await Coupon.find({ type: 'deal' });
  console.log(`Found ${dealsInCoupons.length} deals in coupons collection.`);

  if (dealsInCoupons.length === 0) {
    console.log('No deals to migrate!');
    process.exit(0);
  }

  let migratedCount = 0;
  let skippedCount = 0;

  for (const dealData of dealsInCoupons) {
    const rawData = dealData.toObject();
    // Delete the original _id to let MongoDB generate a new one in the deals collection (or keep same _id to maintain reference!)
    // Keeping same _id is actually safer if there are tracking click models referencing it! Yes!
    // But since Mongoose Coupon and Deal are separate collections, we can keep the exact same _id safely.
    const originalId = rawData._id;

    // Check if a deal with same _id or admitadId already exists in deals collection
    const query = rawData.admitadId 
      ? { $or: [{ _id: originalId }, { admitadId: rawData.admitadId }] } 
      : { _id: originalId };

    const alreadyExists = await Deal.findOne(query);

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
  console.log(`Total Deals Migrated to 'deals' Collection: ${migratedCount}`);
  console.log(`Total Deals Already Present/Skipped: ${skippedCount}`);

  // Let's verify final counts in both collections
  const finalCoupons = await Coupon.countDocuments({});
  const finalDeals = await Deal.countDocuments({});
  console.log(`Final Coupons count in DB: ${finalCoupons}`);
  console.log(`Final Deals count in DB: ${finalDeals}`);

  process.exit(0);
}

migrate().catch(err => {
  console.error('Migration failed with critical error:', err);
  process.exit(1);
});
