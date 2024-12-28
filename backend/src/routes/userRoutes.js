const { handleFindUser } = require('@/controllers/userController');
const express = require('express');
const verifyJwt = require('../middlewares/verifyJwt');

const router = express.Router();

router.get('/get-user', (req, res) => res.json('hello'))
router.post('/find-user', handleFindUser);
// router.post('/sign-in', handleSignIn);
// router.post('/verify-code', handleSignIn);
// router.post('/instructor-application', verifyJwt, handleInstructorApplication);

module.exports = router;