const { newsletter } = require('@/controllers/servicesController')
const express = require('express');
const router = express.Router();

router.post('/newsletter', newsletter); // newsletter ecosystem sign up

module.exports = router;  