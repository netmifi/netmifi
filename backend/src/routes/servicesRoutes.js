const { newsletter } = require('@/controllers/servicesController');
const { waitlist } = require('@/controllers/waitlistController'); // Import waitlist controller
const express = require('express');
const router = express.Router();

router.post('/newsletter', newsletter);
router.post('/waitlist', waitlist); // Add waitlist route

module.exports = router;
