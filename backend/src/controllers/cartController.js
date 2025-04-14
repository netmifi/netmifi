const User = require('../models/User');
const { queryState } = require('../constants/queryState');
const { parseSafeUserData } = require('../utils');
const { authCookieService } = require('../services/cookieService');

const handleAddToCart = async (req, res) => {
    try {
        const data = req.body;
        const user = await User.findById(req.user.id || req.user._id);

        if (!user) {
            res.status(404).json({
                message: 'User not found',
                state: queryState.error,
                data: undefined,
            });
            return;
        }

        const itemExists = user.cart.find(item => item.productId == (data.productId || data.id));
        if (itemExists) {
            res.status(409).json({
                message: 'Item already in cart',
                state: queryState.error,
                data: undefined,
            });
            return;
        }

        const newItem = {
            productId: data.id || data._id,
            instructorId: data.userId || data.id, // remove item.id on new data update
            instructorName: data.instructorName,
            title: data.title,
            price: data.price,
            oldPrice: data.oldPrice,
            category: data.category || data.subject
        }

        user.cart = [...user.cart, newItem];
        const result = await user.save();
        authCookieService(res, result);
        const safeUser = parseSafeUserData(result);
        res.status(200).json({
            message: 'Product added to cart',
            state: queryState.success,
            data: safeUser,
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
        const data = req.body;
        const user = await User.findById(req.user.id);
        
        console.log('USER FILTERED', user.cart.filter(item => item.productId != (data.productId || data.id)));
        if (!user) {
        res.status(404).json({
            message: 'User not found',
            state: queryState.error,
            data: undefined,
        });
        return;
        }
        
        user.cart =user.cart.filter(item => item.productId != (data.productId || data.id));

        const result = await user.save();

        authCookieService(res, result);
        const safeUser = parseSafeUserData(result);

        console.log('safe user', safeUser.cart);
        res.status(200).json({
            message: 'Product removed from cart',
            state: queryState.success,
            data: safeUser,
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
        const { userId } = req.params;
        const user = await User.findById(userId);

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
