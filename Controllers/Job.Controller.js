const Job = require("../models/Job.Model");
const Signer = require("../models/Signer.Model");
const sendEmail = require("../utils/emailUtil");
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
      signers, // This should be a JSON string
      notaryOption,
      selectedNotary,
      selectedDate,
      selectedTime,
      userId,
      JobStatus,
      notarizedFile
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
    if (!Array.isArray(signersArray) || signersArray.length === 0) {
      throw new Error("Signers should be a non-empty array");
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
      notarizedFile
    });

    // Send email to all signers
    for (const signer of signersArray) {
      const email = signer.signerEmail; // Update this to use the correct field name

      if (email) {
        await sendEmail(
          email,
          "Job Created Notification",
          "A new job has been created. Please check your details.",
          `<p>Hey ${signer.signerName},</p>
           <p>A new job has been created and you are listed as a ${signer.signerRole}. Please check your details.</p>
           <p>Your contact number: ${signer.signerPhoneNumber}</p>
           <p>Thank you,</p>
           <p>The Notary Team</p>`
        );
      } else {
        console.error("Signer email is missing:", signer);
      }
    }

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

    console.log("user rOLE role", userRole, userId);

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

const getJobsById = async (req, res) => {
  try {
    const { id } = req.params;
    const job = await Job.findById(id).populate("signers");
    if (!job) {
      return res.status(404).json({ message: "Job not found" });
    }
    res.status(200).json({ job });
  } catch (error) {
    console.error("Error fetching job:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

const updateJobStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { JobStatus } = req.body; // Expect the new status in the request body

    const validStatuses = ["Pending", "Cancelled", "Accepted","Completed"];
    if (!validStatuses.includes(JobStatus)) {
      return res.status(400).json({ message: "Invalid status value" });
    }

    // Find and update the job status
    const job = await Job.findByIdAndUpdate(id, { JobStatus }, { new: true });
    if (!job) {
      return res.status(404).json({ message: "Job not found" });
    }

    res
      .status(200)
      .json({ message: "Job Status Changes Successfully", job: job });
  } catch (error) {
    // console.error("Error updating job status:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};




const updateJobFileandStatus =  async (req, res) => {
  try {
    const { id } = req.params;
    const { JobStatus } = req.body;
    const notarizedFile = req.file ? `/uploads/${req.file.filename}` : null;

    const validStatuses = ["Pending", "Cancelled", "Accepted", "Completed"];
    if (!validStatuses.includes(JobStatus)) {
      return res.status(400).json({ message: "Invalid status value" });
    }
    

    // Find and update the job status and file
    const job = await Job.findByIdAndUpdate(id, { JobStatus, notarizedFile }, { new: true });
    if (!job) {
      return res.status(404).json({ message: "Job not found" });
    }

    res.status(200).json({ message: "Job updated successfully", job: job });
  } catch (error) {
    console.error("Error updating job:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

module.exports = {
  createJob,
  getRoleBasedJobs,
  getJobsById,
  updateJobStatus,
  updateJobFileandStatus
};
