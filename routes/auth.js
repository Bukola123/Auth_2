const express = require('express');
const {
    authCredentialsValidation,
    registrationValidation,
    emailValidation,
    
} = require('../App/middleware/authValidation');
const {
    registerUser,
    loginUser,
    verifyUser,
    resendVerificationLink
    
} = require('../App/controllers/auth');
const auth = require('../App/middleware/authValidation');



const router = express.Router();

router.post('/register', registrationValidation, registerUser);
router.get('/verify', verifyUser);
router.post('/verify/resend', emailValidation, resendVerificationLink);
router.post('/login', authCredentialsValidation, loginUser);

module.exports = router;
