// routes/user.js
const express = require('express');
const { getData, updateData, deleteData, storeData } = require('../controllers/OrderController');
const router = express.Router();

// Get all users from Auth0

router.post('/', storeData);

router.patch('/:id', updateData);

router.delete('/:id', deleteData);

router.get('/', getData);

module.exports = router;
