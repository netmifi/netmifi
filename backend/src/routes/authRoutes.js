const { handleSignUp, handleSignIn, handleInstructorApplication, handleLogout } = require('@/controllers/authController');
const express = require('express');
const verifyJwt = require('../middlewares/verifyJwt');

const router = express.Router();

router.post('/sign-up', handleSignUp);
router.post('/sign-in', handleSignIn);
router.post('/instructor-application', verifyJwt, handleInstructorApplication);
router.delete('/logout', handleLogout);

module.exports = router;