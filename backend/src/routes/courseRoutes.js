const express = require('express');
const router = express.Router();
const { handleEnrollCourse, handleCancelEnrollment } = require('../controllers/courseController');
const verifyJwt = require('../middlewares/verifyJwt');

// Route for course enrollment
router.post('/enroll', verifyJwt, handleEnrollCourse);

// Route for canceling course enrollment
router.post('/cancel-enrollment', verifyJwt, handleCancelEnrollment);

module.exports = router;