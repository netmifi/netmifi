const { handleAddToCart, handleRemoveFromCart, handleViewCart } = require('@/controllers/cartController');
const express = require('express');
const verifyJwt = require('../middlewares/verifyJwt');

const router = express.Router();

router.post('/add', verifyJwt, handleAddToCart); // add to cart
router.post('/remove', verifyJwt, handleRemoveFromCart); // remove from cart
router.get('/view/:userId', verifyJwt, handleViewCart); // view cart

module.exports = router;
