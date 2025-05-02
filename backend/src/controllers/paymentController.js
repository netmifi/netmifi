const { initializePayment, verifyPayment } = require('../services/paystackService');

// Initialize a payment
const handleInitializePayment = async (req, res) => {
    try {
        const { email, amount } = req.body;

        // Prepare data for Paystack
        const paymentData = {
            email,
            amount: amount * 100, // Convert to kobo (smallest currency unit)
            callback_url: `${process.env.FRONTEND_URL}/payment/callback`,
        };

        const response = await initializePayment(paymentData);
        res.status(200).json({ message: 'Payment initialized', data: response });
    } catch (error) {
        res.status(500).json({ message: 'Error initializing payment', error: error.message });
    }
};

// Verify a payment
const handleVerifyPayment = async (req, res) => {
    try {
        const { reference } = req.query;

        const response = await verifyPayment(reference);
        res.status(200).json({ message: 'Payment verified', data: response });
    } catch (error) {
        res.status(500).json({ message: 'Error verifying payment', error: error.message });
    }
};

module.exports = {
    handleInitializePayment,
    handleVerifyPayment,
};