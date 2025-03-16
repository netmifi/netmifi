const { newsletter } = require('@/controllers/servicesController')
const express = require('express');
const router = express.Router();

router.post('/newsletter', newsletter);

module.exports = router;  