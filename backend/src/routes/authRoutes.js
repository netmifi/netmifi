const { handleFindVerificationCode, handleVerifyCode, handleResendCode, handleSignUp, handleInterestsAndAdSource, handleSignIn, handleLogout, handleMailGenCode, handleChangePassword, handleInstructorRegister } = require('@/controllers/authController');
const express = require('express');
const verifyJwt = require('../middlewares/verifyJwt');

const router = express.Router();

router.get('/', (req, res) => res.clearCookie)

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