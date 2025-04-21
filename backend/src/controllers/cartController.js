const User = require('../models/User');
const { queryState } = require('../constants/queryState');

const handleAddToCart = async (req, res) => {
    try {
        const { userId, productId, quantity,title, price } = req.body;
        const user = await User.findById(userId);

        if (!user) {
            res.status(404).json({
                message: 'User not found',
                state: queryState.error,
                data: undefined,
            });
            return;
        }

        const productIndex = user.cart.findIndex(item => item.productId.toString() === productId);
        if (productIndex > -1) {
            user.cart[productIndex].quantity += quantity;
        } else {
            user.cart.push({ productId, quantity, title, price });
        }
        
        const result = await user.save();

        res.status(200).json({
            message: 'Product added to cart',
            state: queryState.success,
            data: result.cart,
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
        const { userId, productId, id } = req.body;
        const user = await User.findById(id);

        if (!user) {
            res.status(404).json({
                message: 'User not found',
                state: queryState.error,
                data: undefined,
            });
            return;
        }

        user.cart = user.cart.filter(item => item.productId.toString() !== productId);
        
        const result = await user.save();

        res.status(200).json({
            message: 'Product removed from cart',
            state: queryState.success,
            data: result.cart,
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
