const { handleFindVerificationCode, handleVerifyCode, handleResendCode, handleSignUp, handleGoogleAuth, handleInterestsAndAdSource, handleSignIn, handleLogout, handleMailGenCode, handleChangePassword, handleInstructorRegister } = require('@/controllers/authController');
const express = require('express');
const verifyJwt = require('../middlewares/verifyJwt');
const { sendEmail } = require('../services/emailService');

const router = express.Router();

router.post('/find-code', handleFindVerificationCode); // getting code details (i.e. expires in, state)
router.post('/sign-up', handleSignUp); // sign up route
router.post('/sign-in', handleSignIn); // sign in/login route
router.post('/google', handleGoogleAuth); // google signin route
router.post('/verify-code', handleVerifyCode);// verify code route
router.post('/resend-code', handleResendCode); // resend code route
router.put('/interests-adsource', verifyJwt, handleInterestsAndAdSource); // update users with interests and advert sources from welcome page
router.delete('/logout', handleLogout); // logout
router.post('/mail-code', handleMailGenCode); // generate code for forgotten password
router.put('/change-password', handleChangePassword); // change password from forgotten password
router.post('/register-instructor', verifyJwt, handleInstructorRegister); // sign up instructor

router.get('/test-mail', async (req, res) => {
    // sendEmail('okenwavictor003@gmail.com', 'Hi we are just testing a mail', "This is just the body");
    sendEmail('okenwavictor003@gmail.com', 'registration_successful')
        .then(() => {
            res.status('200').json({
                message: 'Mail sent',
            });
            console.log('Email sent successfully')
        })
        .catch((error) => {
            res.status(401).json({
                message: error.message,
                error: error
            });
            console.error('Failed to send email:', error)
        });
});
module.exports = router;  