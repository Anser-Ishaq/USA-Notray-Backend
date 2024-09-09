const express = require('express');
const { loginUser } = require('../Controllers/Auth.Controller');

const router = express.Router();

// @route   POST /api/v1/auth/login
router.post('/login', loginUser);

module.exports = router;