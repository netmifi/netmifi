const { queryState } = require('../constants/queryState');
const User = require('../models/User');
const jwt = require('jsonwebtoken');
const { cookieOptions } = require('../constants/cookieOptions');


const verifyJwt = (req, res, next) => {
    const cookies = req.cookies;
    const token = cookies?.jwt;

    const accessTokenSecret = process.env.ACCESS_TOKEN_SECRET;
    // try {
    if (!token) {
        res.status(401).json({
            message: "You have to be signed in to access this feature",
            state: queryState.blocked,
            data: undefined
        });
        return;
    }

    jwt.verify(
        token,
        accessTokenSecret,
        async (err, decoded) => {
            try {
                if (err) {
                    console.log(err);
                    res.status(401).json({
                        message: "unauthorized access",
                        state: queryState.blocked,
                        data: undefined
                    });
                    return;
                }
                const user = await User.findOne({ email: decoded?.user?.email });
                req.user = user;
                req.roles = user.roles;

                if (!cookies.user) {
                    res.cookie('user', JSON.stringify(user), {
                        ...cookieOptions,
                        maxAge: 60 * 60 * 1000 * 24 * 5
                    });
                }
                next();
            } catch (error) {
                console.log(err);
                res.status(401).json({
                    message: error.message,
                    state: queryState.error,
                    data: undefined
                });
                return;
            }
        }
    );
}

module.exports = verifyJwt;