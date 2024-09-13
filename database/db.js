// database/db.js
const mongoose = require("mongoose");

// MongoDB connection URL
// const mongoURI = 'mongodb://localhost:27017/USA_Notary';
const mongoURI =
  "mongodb+srv://aabanatif5:kzIJaKjE3RNjPeAD@usanotary.bomzl.mongodb.net/USA_Notary";

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
