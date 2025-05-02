const express = require('express');
const router = express.Router();
const { handleInitializePayment, handleVerifyPayment } = require('../controllers/paymentController');

// Route to initialize a payment
router.post('/initialize', handleInitializePayment);

// Route to verify a payment
router.get('/verify', handleVerifyPayment);

module.exports = router;