const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config();

let cachedConnection = null;

const connectDB = async () => {
  // 1. If connection is already active, reuse it instantly
  if (mongoose.connection.readyState >= 1) {
    return mongoose.connection;
  }

  // 2. If we have a cached connection promise, wait for it
  if (cachedConnection) {
    return cachedConnection;
  }

  try {
    const opts = {
      bufferCommands: false,
      maxPoolSize: 10,              // Maintain up to 10 reusable connections
      serverSelectionTimeoutMS: 5000, // Timeout after 5s instead of 30s
      socketTimeoutMS: 45000,        // Close socket after 45s of inactivity
    };

    cachedConnection = await mongoose.connect(process.env.MONGO_URI, opts);
    console.log(`MongoDB Connected (New Connection Initiated)`);
    return cachedConnection;
  } catch (error) {
    console.error(`MongoDB Connection Error: ${error.message}`);
    throw error; // Let serverless container manage error recovery
  }
};

module.exports = connectDB;
