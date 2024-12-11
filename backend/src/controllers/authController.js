// require('dotenv').config();
const { signUpSchema, signInSchema, instructorApplicationSchema } = require('../schemas/authSchema');
const { queryState } = require('../constants/queryState');
const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { cookieOptions } = require('../constants/cookieOptions');

const SALT_ROUNDS = 12;

const MAX_AGE = 60 * 60 * 1000 * 24 * 5; // this is in milliseconds for 5 days
const handleSignUp = async (req, res) => {
    const bodyValues = req.body;
    try {
        const values = await signUpSchema.validateAsync({ ...bodyValues });
        const hashedPassword = await bcrypt.hash(bodyValues.password, SALT_ROUNDS);

        const existingEmail = await User.findOne({ email: bodyValues.email });

        if (existingEmail) {
            res.status(409).json({
                message: 'Email already exists',
                state: queryState.error,
                data: undefined
            });
            return;
        }

        const user = await User.create({ ...values, password: hashedPassword });

        if (!user) {
            res.status(500).json({
                message: 'signup failed due to server error, try again later',
                state: queryState.error,
                data: undefined
            }); return;
        }

        res.cookie('user', JSON.stringify({ id: user.id, email: user.email }), {
            maxAge: MAX_AGE,
            ...cookieOptions,
        });

        res.status(201).json({
            message: 'user creation successful',
            state: queryState.success,
            data: user,
        });
    } catch (error) {
        res.status(400).json({
            message: error.details[0].message || error.message,
            state: queryState.error,
            data: undefined,
        });
    }
}


const handleSignIn = async (req, res) => {
    const bodyValues = req.body;
    const accessTokenSecret = process.env.ACCESS_TOKEN_SECRET;


    try {
        const values = await signInSchema.validateAsync({ ...bodyValues });
        const user = await User.findOne({ email: bodyValues.email });

        if (!user) {
            res.status(404).json({
                message: 'email not found',
                state: queryState.error,
                data: undefined,
            });
            return;
        }

        const math = await bcrypt.compare(values.password, user?.password || '');
        if (!math) {
            res.status(400).json({
                message: 'incorrect password',
                state: queryState.blocked,
                data: undefined,
            });
            return;
        }

        const accessToken = jwt.sign({
            user: user,
        },
            accessTokenSecret, {
            expiresIn: MAX_AGE,
        });

        // const refreshToken = jwt.sign({
        //     user: {
        //         id: user.id,
        //         email: user.email,
        //     }
        // },
        //     refreshTokenSecret, {
        //     expiresIn: '1d'
        // });

        // user.refreshToken = refreshToken;
        // const result = await user.save();

        res.cookie('jwt', accessToken, {
            ...cookieOptions,
            maxAge: MAX_AGE * 1000,
        });

        res.cookie('user', JSON.stringify({
            id: user.id,
            email: user.email,
        }), {
            ...cookieOptions,
            maxAge: MAX_AGE * 1000
        });

        res.status(202).json({
            message: 'login successful',
            state: queryState.success,
            data: user,
            accessToken
        });
    } catch (error) {
        res.status(405).json({
            message: error.details[0].message || error.message,
            state: queryState.error,
            data: undefined,
        });
        return
    }
}

const handleLogout = async (req, res) => {
    const cookies = req.cookies;

    const clearAllCookies = () => {
        Object.keys(req.cookies).forEach((cookieName) => {
            res.clearCookie(cookieName);
        });
    }

    try {
        if (!cookies.jwt) {
            clearAllCookies();
            res.status(204).json({
                message: "already logged out",
                state: queryState.success,
                data: null,
            });
            return;
        }

        const userCookie = cookies?.user;
        const user = await User.findOne({ id: userCookie?.id });

        if (!user) {
            clearAllCookies();
            res.status(204).json({
                message: "already logged out",
                state: queryState.success,
                data: null,
            });
            return;
        }
        // user.refreshToken = '';
        // const result = await user.save();
        // console.log(result);

        res.status(205).json({
            message: "you have logged out",
            state: queryState.success,
            data: null,
        });
        clearAllCookies();
    } catch (error) {
        res.status(405).json({
            message: error.details[0].message || error.message,
            state: queryState.error,
            data: undefined,
        });
        return
    }
}

const handleInstructorApplication = async (req, res) => {
    const bodyValues = req.body;
    try {
        const values = await instructorApplicationSchema.validateAsync({ ...bodyValues });
        const user = await User.findById(req.user);


    } catch (error) {
        res.status(405).json({
            message: error.details[0].message || error.message,
            state: queryState.error,
            data: undefined,
        });
        return
    }
}

module.exports = {
    handleSignUp,
    handleSignIn,
    handleLogout,
    handleInstructorApplication,
}