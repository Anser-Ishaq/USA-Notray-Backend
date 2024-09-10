const express = require("express");
const router = express.Router();
const multer = require("multer");
const {
  createJob,
  getRoleBasedJobs,
  getJobsById,
  updateJobStatus,
} = require("../Controllers/Job.Controller");
const upload = require("../Middleware/Multer.Middleware");
const verifyToken = require("../Middleware/Auth.Middleware");

// @route   POST /api/v1/jobs/createjob
router.post("/createjob", upload.single("uploadedFile"), createJob);

// @route   POST /api/v1/jobs/:id/updateJobStatus
router.post("/:id/updatejobstatus", updateJobStatus);

// @route   GET /api/v1/jobs/getjobs
router.get("/getjobs", verifyToken, getRoleBasedJobs);

// @route   GET  /api/v1/jobs/getjobsByid/:id
router.get("/getjobsByid/:id", getJobsById);

module.exports = router;
