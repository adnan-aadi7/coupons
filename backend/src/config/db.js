const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config();

let cachedConnection = null;

const connectDB = async () => {
  // 1. If connection is fully active, reuse it instantly
  if (mongoose.connection.readyState === 1) {
    return mongoose.connection;
  }

  // 2. If it is currently connecting, wait for it to complete
  if (mongoose.connection.readyState === 2) {
    console.log('MongoDB is connecting... waiting for connection to establish');
    await new Promise((resolve) => {
      mongoose.connection.once('open', resolve);
    });
    return mongoose.connection;
  }

  // 3. If we have a cached connection promise, return it
  if (cachedConnection) {
    return cachedConnection;
  }

  try {
    const opts = {
      bufferCommands: true,          // Allow Mongoose to buffer commands during startup phase
      maxPoolSize: 10,              // Maintain up to 10 reusable connections
      serverSelectionTimeoutMS: 5000, // Timeout after 5s instead of 30s
      socketTimeoutMS: 45000,        // Close socket after 45s of inactivity
    };

    cachedConnection = await mongoose.connect(process.env.MONGO_URI, opts);
    console.log(`MongoDB Connected (New Connection Initiated)`);
    return cachedConnection;
  } catch (error) {
    console.error(`MongoDB Connection Error: ${error.message}`);
    cachedConnection = null; // Reset cache on failure to allow self-healing retries
    throw error;
  }
};

module.exports = connectDB;
