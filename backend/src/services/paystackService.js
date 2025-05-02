const axios = require('axios');

const paystack = axios.create({
    baseURL: 'https://api.paystack.co',
    headers: {
        Authorization: `Bearer ${process.env.PAYSTACK_SECRET_KEY}`,
        'Content-Type': 'application/json',
    },
});

// Initialize a payment
async function initializePayment(data) {
    try {
        const response = await paystack.post('/transaction/initialize', data);
        return response.data;
    } catch (error) {
        console.error('Error initializing payment:', error.response?.data || error.message);
        throw error;
    }
}

// Verify a payment
async function verifyPayment(reference) {
    try {
        const response = await paystack.get(`/transaction/verify/${reference}`);
        return response.data;
    } catch (error) {
        console.error('Error verifying payment:', error.response?.data || error.message);
        throw error;
    }
}

module.exports = {
    initializePayment,
    verifyPayment,
};