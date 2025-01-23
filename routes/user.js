const express = require('express');
const { getData } = require('../controllers/UserController');
const router = express.Router();

//Get All Users
router.get('/', getData)

module.exports = router