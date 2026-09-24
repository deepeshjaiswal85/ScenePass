const mongoose = require('mongoose');

let isConnected = false;

const connectDB = async () => {
  try {
    const connStr = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/scenepass';
    console.log(`Connecting to MongoDB at ${connStr}...`);
    
    // Set short timeout for local fallback check
    await mongoose.connect(connStr, {
      serverSelectionTimeoutMS: 3000
    });
    
    isConnected = true;
    console.log(`MongoDB Connected: ${mongoose.connection.host}`);
  } catch (error) {
    console.warn(`MongoDB Connection Notice: ${error.message}. Running server in-memory database fallback mode.`);
    isConnected = false;
  }
};

const getDBStatus = () => isConnected;

module.exports = { connectDB, getDBStatus };
