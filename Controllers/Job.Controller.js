const Job = require("../models/Job.Model");
const Signer = require("../models/Signer.Model");

const createJob = async (req, res) => {
  try {
    const {
      titleCompany,
      closingType,
      internalReference,
      kbaRequired,
      propertyAddressOne,
      propertyAddressTwo,
      propertyCity,
      propertyState,
      propertyZipCode,
      signers,
      notaryOption,
      selectedNotary,
      selectedDate,
      selectedTime,
      userId,
      JobStatus,
    } = req.body;

    console.log("File upload info:", req.file);

    // Parse signers if it's a JSON string
    let signersArray;
    try {
      signersArray = JSON.parse(signers); // Parse the JSON string to an array
    } catch (e) {
      throw new Error("Signers JSON parsing error");
    }

    // Check if signers is an array
    if (!Array.isArray(signersArray)) {
      throw new Error("Signers should be an array");
    }

    const uploadedFile = req.file ? `/uploads/${req.file.filename}` : null; // Relative URL

    // Create multiple signer documents if needed
    const signerIds = [];
    for (const signerData of signersArray) {
      const newSigner = await Signer.create(signerData);
      signerIds.push(newSigner._id);
    }

    // Create a new job document
    const newJob = await Job.create({
      titleCompany,
      closingType,
      internalReference,
      kbaRequired,
      propertyAddressOne,
      propertyAddressTwo,
      propertyCity,
      propertyState,
      propertyZipCode,
      signers: signerIds, // Array of signer references
      notaryOption,
      selectedNotary,
      selectedDate,
      selectedTime,
      uploadedFile,
      userId,
      JobStatus,
    });

    res
      .status(201)
      .json({ newJob: newJob, message: "Job Created successfully" });
  } catch (error) {
    console.error("Error creating job:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

const getRoleBasedJobs = async (req, res) => {
  try {
    const userRole = req.user.role;  
    const userId = req.user.userId;  

    console.log("user rOLE role",userRole, userId);

    let jobs;

    if (userRole === "Admin Users") {
      // Fetch all jobs and populate signers
      jobs = await Job.find().populate("signers");
    } else if (userRole === "Notary Users") {
      // Fetch jobs for a specific user and populate signers
      jobs = await Job.find({ userId: userId }).populate("signers");
    } else {
      return res.status(403).json({ message: "Access denied" });
    }

    res.status(200).json(jobs);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = {
  createJob,
  getRoleBasedJobs,
};
