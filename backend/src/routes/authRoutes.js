const { handleFindVerificationCode, handleVerifyCode, handleResendCode, handleSignUp, handleInterestsAndAdSource, handleSignIn, handleLogout, handleMailGenCode, handleChangePassword, handleInstructorRegister } = require('@/controllers/authController');
const express = require('express');
const verifyJwt = require('../middlewares/verifyJwt');
const { sendEmail } = require('../config/emailService');

const router = express.Router();

router.get('/test-mail', async (req, res) => {
    // sendEmail('okenwavictor003@gmail.com', 'Hi we are just testing a mail', "This is just the body");
    sendEmail('okenwavictor003@gmail.com', 'Test Subject', 'Hello from Nodemailer!')
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

router.post('/find-code', handleFindVerificationCode);
router.post('/sign-up', handleSignUp);
router.post('/sign-in', handleSignIn);
router.post('/verify-code', handleVerifyCode);
router.post('/resend-code', handleResendCode);
router.put('/interests-adsource', verifyJwt, handleInterestsAndAdSource);
router.delete('/logout', handleLogout);
router.post('/mail-code', handleMailGenCode);
router.put('/change-password', handleChangePassword);
router.post('/register-instructor', verifyJwt, handleInstructorRegister);

module.exports = router;  