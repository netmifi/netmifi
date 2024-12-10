const { handleSignIn, handleSignUp, handleLogout, handleInstructorApplication } = require('@/controllers/authController');
const { verifyJwt } = require('@/middlewares/verifyJwt');
const express = require('express');

const router = express.Router();

router.post('/sign-up', handleSignUp);
router.post('/sign-in', handleSignIn);
router.post('/instructor-application', verifyJwt, handleInstructorApplication);
router.delete('/logout', handleLogout);

export default router;