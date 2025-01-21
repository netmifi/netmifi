const { queryState } = require('../constants/queryState');
const User = require('../models/User');
const jwt = require('jsonwebtoken');
const { cookieOptions } = require('../constants/cookieOptions');
const { parseSafeUserData } = require('../utils');

const handleFindUser = async (req, res) => {
    try {
        const { id } = req.body;
        const user = await User.findById(id);

        if (!user) {
            res.status(500).json({
                message: 'user not found',
                state: queryState.error,
                data: undefined
            }); return;
        }
        res.status(201).json({
            message: 'user found',
            state: queryState.success,
            data: user,
        });

    } catch (error) {
        res.status(400).json({
            message: error.message,
            state: queryState.error,
            data: undefined,
        });
    }

}

const handleCheckUserAuth = async (req, res) => {
    try {
        const foundUser = await User.findById(req.user.id);
        console.log(req.user);

        if (!foundUser) {
            res.status(404).json({
                message: 'account not found',
                state: queryState.error,
                data: undefined
            }); return;
        }

        const safeUserData = parseSafeUserData(foundUser);

        res.status(200).json({
            message: 'user found',
            state: queryState.success,
            data: safeUserData,
        });

    } catch (error) {
        res.status(400).json({
            message: error.message,
            state: queryState.error,
            data: undefined,
        });
    }

}

module.exports = {
    handleFindUser,
    handleCheckUserAuth,
}