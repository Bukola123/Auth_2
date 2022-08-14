const { loginUser } = require('./loginUser');
const { verifyUser, resendVerificationLink } = require('./verifyUser');
const { registerUser } = require('./registerUser');
const { changePassword, forgotPassword, resetPassword , newuserchangePassword} = require('./password');



module.exports = {
    loginUser,
    registerUser,
    verifyUser,
    resendVerificationLink
};
