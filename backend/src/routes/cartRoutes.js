const { handleAddToCart, handleRemoveFromCart, handleViewCart } = require('@/controllers/cartController');
const express = require('express');

const router = express.Router();

<<<<<<< HEAD
router.post('/add', handleAddToCart); // add to cart
router.post('/remove', verifyJwt, handleRemoveFromCart); // remove from cart
router.get('/view/:userId', verifyJwt, handleViewCart); // view cart
=======
router.get('/view/', handleViewCart); // view cart
router.post('/add', handleAddToCart); // add to cart
router.post('/remove', handleRemoveFromCart); // remove from cart
>>>>>>> 6db0ad61c33f5ae5c8224d1f8d58993a12838245

module.exports = router;
