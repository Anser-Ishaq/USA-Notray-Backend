const mongoose = require("mongoose");

const jobSchema = new mongoose.Schema({
    titleCompany: String,
    closingType: String,
    internalReference: String,
    kbaRequired: String,
    propertyAddressOne: String,
    propertyAddressTwo: String,
    propertyCity: String,
    propertyState: String,
    propertyZipCode: String,
    signers: [{ type: mongoose.Schema.Types.ObjectId, ref: "Signer" }],
    notaryOption: String,
    selectedNotary: String,
    selectedDate: Date,
    selectedTime: String,
    uploadedFile: String,
    notarizedFile: {
        type: String,
        default: null
      },
    userId: String,
    JobStatus: String,
}, { timestamps: true });

module.exports = mongoose.model("Job", jobSchema);
