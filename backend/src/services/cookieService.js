// this is a reusable function for setting up authentication cookies
require('dotenv/config')
const cookieOptions = require('../constants/cookieOptions');
const { parseSafeUserData } = require("../utils");
const jwt = require('jsonwebtoken');
const accessTokenSecret = process.env.ACCESS_TOKEN_SECRET;
const MAX_AGE = 60 * 60 * 1000 * 24 * 7; // this is in milliseconds for 7 days

const authCookieService = (res, user) => {
    const accessToken = jwt.sign({
        user: user,
    },
        accessTokenSecret, {
        expiresIn: MAX_AGE,
    });

    res.cookie('jwt', accessToken, {
        ...cookieOptions,
        maxAge: MAX_AGE,
    });

    const safeUserData = parseSafeUserData(user);

    res.cookie('user', JSON.stringify(safeUserData), {
        ...cookieOptions,
        maxAge: MAX_AGE
    });
}

module.exports = { authCookieService };
