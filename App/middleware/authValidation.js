const { check } = require('express-validator');

exports.authCredentialsValidation = [
    check('email', 'Enter a valid email address').isEmail(),
    check('password', 'Password must be at least 6 characters').isLength({
        min: 6
    })
];

exports.registrationValidation = [
    check('email', 'Enter a valid email address').isEmail(),
    check('password', 'Password must be at least 6 characters').isLength({
        min: 6
    })
];

exports.emailValidation = [
    check('email', 'Enter a valid email address').isEmail()
];

exports.passwordValidation = [
    check('password', 'Password must be at least 6 characters')
        .isString()
        .isLength({ min: 6 })
];