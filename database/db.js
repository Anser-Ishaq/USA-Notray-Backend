// database/db.js
const mongoose = require('mongoose');

// MongoDB connection URL
const mongoURI = 'mongodb://localhost:27017/USA_Notary'; // Replace with your actual database name

const connectDB = async () => {
  try {
    await mongoose.connect(mongoURI);
    console.log('MongoDB connected successfully');
  } catch (err) {
    console.error('Failed to connect to MongoDB', err.message);
    process.exit(1); // Exit process with failure
  }
};

module.exports = connectDB;
