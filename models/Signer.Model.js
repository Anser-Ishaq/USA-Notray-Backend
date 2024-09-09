const mongoose = require("mongoose");

const signerSchema = new mongoose.Schema({
    signerName: String,
    signerEmail: String,
    signerPhoneNumber: String,
    signerRole: String,
}, { timestamps: true });

module.exports = mongoose.model("Signer", signerSchema);
