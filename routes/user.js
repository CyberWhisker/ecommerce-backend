// routes/user.js
const express = require('express');
const { getData, login, register, usingGoogle } = require('../controllers/UserController');
const router = express.Router();

// Get all users from Auth0
router.get('/', getData);

router.post('/login', login);

router.post('/register', register);

router.post('/usingGoogle', usingGoogle);

module.exports = router;
