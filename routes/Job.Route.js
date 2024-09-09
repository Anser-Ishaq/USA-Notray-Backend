const express = require('express');
const router = express.Router();
const multer = require('multer');
const { createJob,getRoleBasedJobs } = require('../Controllers/Job.Controller');
const upload = require("../Middleware/Multer.Middleware")
const verifyToken = require("../Middleware/Auth.Middleware")
 




// @route   POST /api/v1/jobs/createjob
router.post('/createjob', upload.single('uploadedFile'), createJob);  

// @route   POST /api/v1/jobs/getjobs
router.get('/getjobs', verifyToken,getRoleBasedJobs)


module.exports = router;
