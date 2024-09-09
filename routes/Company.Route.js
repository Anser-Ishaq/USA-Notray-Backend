const express = require('express');
const router = express.Router();
const { createCompany,getAllCompanies,getCompanyById,updateCompany,deleteCompany } = require('../Controllers/Company.Controller');

// @route   POST /api/v1/company/createCompany
router.post('/createCompany' , createCompany);  

// @route   GET /api/v1/company/companybyid
router.get('/companybyid/:id' , getCompanyById);

// @route   PUT /api/v1/company/updateCompany/:id
router.put('/updateCompany/:id' , updateCompany);

// @route   GET /api/v1/company/getCompany
router.get('/getCompany' , getAllCompanies);

// @route   DELETE /api/v1/deleteCompany/:id
router.delete('/deleteCompany/:id' , deleteCompany);

module.exports = router;

