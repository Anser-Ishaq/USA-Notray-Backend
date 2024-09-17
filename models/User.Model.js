const mongoose = require("mongoose");

const ROLES = [
  "Admin Users",
  "Title Company Users",
  "Notary Users",
  "Client Users",
];

const PRIVILEGES = [
  "Dashboard",
  "Notary Dashboard",
  "Create Job",
  "Jobs List",
  "Notarize a Document",
  "Title Company",
  "Notary Management",
  "User Management",
  "Services",
  "Client Management",
  "Menu Management",
  "Notarization Logs",
];

// Define the User Schema
const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    enum: ROLES,
    required: true,
  },
  label:String,
  value:String,
  privileges: [
    {
      type: String,
      enum: PRIVILEGES,
    },
  ],
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("User", UserSchema);
