const { handleInstructorApplication, handleLogout } = require('@/controllers/instructorController');
const express = require('express');
const verifyJwt = require('../middlewares/verifyJwt');

const router = express.Router();

// TODO: ADD VERIFYJWT to /dashboard
router.post('/instructor-application', handleInstructorApplication);

module.exports = router;