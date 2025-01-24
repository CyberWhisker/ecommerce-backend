// routes/user.js
const express = require('express');
const { getData } = require('../controllers/UserController');
const router = express.Router();

// Get all users from Auth0
router.get('/', getData);

module.exports = router;
