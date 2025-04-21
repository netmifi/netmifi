const { handleAddToCart, handleRemoveFromCart, handleViewCart } = require('@/controllers/cartController');
const express = require('express');
const router = express.Router();

router.post('/add', handleAddToCart); // add to cart
router.post('/remove', handleRemoveFromCart); // remove from cart
router.get('/view/', handleViewCart); // view cart

module.exports = router;
