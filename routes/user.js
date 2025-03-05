// routes/user.js
const express = require('express');
const multer = require('multer')
const { getData, login, register, usingGoogle, updateData, deleteData, verifyEmail, requestResetPassword, confirmResetPassword } = require('../controllers/UserController');
const router = express.Router();

// Multer Setup
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, '../MuiLayout/public/profileImg/')
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now()
        cb(null, uniqueSuffix + file.originalname)
    }
})

const upload = multer({ storage: storage })

// Get all users from Auth0
router.get('/', getData);

router.patch('/:id', upload.single('file'), updateData);

router.delete('/:id', deleteData);

router.post('/login', login);

router.post('/register', register);

router.post('/usingGoogle', usingGoogle);


// Verify Email
router.get('/verify', verifyEmail);

// Recovery
router.post('/requestResetPassword', requestResetPassword);

router.post('/confirm-reset-password', confirmResetPassword);

module.exports = router;
