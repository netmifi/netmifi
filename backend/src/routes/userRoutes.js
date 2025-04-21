const { handleFindUser, handleCheckUserAuth, updateProfile, updateNewPassword, changeTheme, handleEnrollCourse } = require('@/controllers/userController');
const express = require('express');
const verifyJwt = require('../middlewares/verifyJwt');
const router = express.Router();

router.get('/get-user', (req, res) => res.json('hello')) // ** work on letter ** get a user to display profile 
router.get('/check-user', verifyJwt, handleCheckUserAuth); // check if user is authenticated
router.post('/find-user', handleFindUser); // find current user
router.put('/update-profile', verifyJwt, updateProfile); // profile update
router.put('/update-password', verifyJwt, updateNewPassword); // password update from current to new
router.put('/change-theme', verifyJwt, changeTheme); // handling theming change
router.post('/enroll', handleEnrollCourse); // Route for course enrollment

module.exports = router;