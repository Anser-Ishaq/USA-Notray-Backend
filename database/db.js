require("dotenv").config();
const mongoose = require("mongoose");

// MongoDB connection URL
// const mongoURI = 'mongodb://localhost:27017/USA_Notary';
const mongoURI = process.env.MONGO_URL;

const connectDB = async () => {
  try {
    await mongoose.connect(mongoURI);
    console.log("MongoDB connected successfully");
  } catch (err) {
    console.error("Failed to connect to MongoDB", err.message);
    process.exit(1); // Exit process with failure
  }
};

module.exports = connectDB;
