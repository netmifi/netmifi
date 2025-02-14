const { signEmail } = require('@/controllers/newsletterController');
const express = require('express');
const router = express.Router();

router.post('/sign-up', signEmail);

module.exports = router;  