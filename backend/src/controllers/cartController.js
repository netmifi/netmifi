const User = require('../models/User');
const { queryState } = require('../constants/queryState');
const { authCookieService } = require('../services/cookieService');
const { parseSafeUserData } = require('../utils');

const handleAddToCart = async (req, res) => {
    try {
        const { id: productId, quantity = 1, instructorId, instructorName, title, price, oldPrice, category } = req.body;
        const user = await User.findById(req.user.id || req.user._id);

        // console.log(req.body, user.cart)
        if (!user) {
            res.status(404).json({
                message: 'User not found',
                state: queryState.error,
                data: undefined,
            });
            return;
        }

        const existingProduct = user.cart.find(item => item.productId == productId);
        console.log(user.cart)
        console.log(existingProduct);
        if (existingProduct) {
            res.status(409).json({
                message: 'Item already in cart',
                state: queryState.error,
                data: undefined,
            });
            return;
        }

        const newItem = {
            productId,
            quantity,
            instructorId, instructorName, title, price, oldPrice, category
        }

        user.cart = [...user.cart, newItem]; // update existing cart with the  new item
        const result = await user.save();

        authCookieService(res, result);

        const safeUserData = parseSafeUserData(result);
        res.status(200).json({
            message: 'Product added to cart',
            state: queryState.success,
            data: safeUserData,
        });
    } catch (error) {
        res.status(500).json({
            message: error.message,
            state: queryState.error,
            data: undefined,
        });
    }
};

const handleRemoveFromCart = async (req, res) => {
    try {
        const { productId } = req.body;
        const user = await User.findById(req.user.id || req.user._id);
        console.log("BODY", req.body, "FILTERED CART", user.cart.filter(item => item.productId != productId))
        if (!user) {
            res.status(404).json({
                message: 'User not found',
                state: queryState.error,
                data: undefined,
            });
            return;
        }

        user.cart = user.cart.filter(item => item.productId != productId);

        const result = await user.save();
        authCookieService(res, result);
        const safeUserData = parseSafeUserData(result);
        res.status(200).json({
            message: 'Product removed from cart',
            state: queryState.success,
            data: safeUserData,
        });
    } catch (error) {
        res.status(500).json({
            message: error.message,
            state: queryState.error,
            data: undefined,
        });
    }
};

const handleViewCart = async (req, res) => {
    try {
        const user = await User.findById(req.user.id || req.user._id);

        if (!user) {
            res.status(404).json({
                message: 'User not found',
                state: queryState.error,
                data: undefined,
            });
            return;
        }

        res.status(200).json({
            message: 'Cart retrieved successfully',
            state: queryState.success,
            data: user.cart,
        });

    } catch (error) {
        res.status(500).json({
            message: error.message,
            state: queryState.error,
            data: undefined,
        });
    }
};

module.exports = {
    handleAddToCart,
    handleRemoveFromCart,
    handleViewCart
};
