const mongoose = require("mongoose");

const companySchema = new mongoose.Schema(
  {
    companyName: { type: String  },
    preferredNotaryID: String,
    companyAddressLine1: String,
    companyAddressLine2: String,
    companyCity: String,
    companyState: String,
    companyZIP: String,
    primaryContactName: String,
    primaryContactNumber: String,
    primaryContactEmailAddress: String,
    timeZone1: String,
    secondaryContactName: String,
    secondaryContactNumber: String,
    secondaryContactEmailAddress: String,
    timeZone2: String,
    thirdContactName: String,
    thirdContactNumber: String,
    thirdContactEmailAddress: String,
    timeZone3: String,
    fourthContactName: String,
    fourthContactNumber: String,
    fourthContactEmailAddress: String,
    timeZone4: String,
    requireKBA: { type: Boolean, default: false },
    userId: String  
  },
  { timestamps: true }
);

module.exports = mongoose.model("Company", companySchema);
