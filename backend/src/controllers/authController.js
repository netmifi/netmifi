// require('dotenv').config();
const { signUpSchema, signInSchema, instructorApplicationSchema } = require('../schemas/authSchema');
const { queryState } = require('../constants/queryState');
const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { cookieOptions } = require('../constants/cookieOptions');
const { generateOtp, parseSafeUserData } = require('../utils');
const Instructor = require('../models/Instructor');

const accessTokenSecret = process.env.ACCESS_TOKEN_SECRET;
const SALT_ROUNDS = 12;
const MAX_AGE = 60 * 60 * 1000 * 24 * 5; // this is in milliseconds for 5 days

const handleFindVerificationCode = async (req, res) => {
    try {
        const { id } = req.body;
        const user = await User.findById(id);

        if (!user) {
            res.status(404).json({
                message: 'user not found',
                state: queryState.error,
                data: undefined,
            });
            return;
        }

        if (!user.generatedCode) {
            res.status(404).json({
                message: 'code expired or not found',
                state: queryState.error,
                data: undefined,
            });
            return;
        }

        res.status(202).json({
            message: 'code found',
            state: queryState.success,
            data: {
                state: user.generatedCode.state,
                expiresIn: user.generatedCode.expiresIn
            },
        });


    } catch (error) {
        res.status(405).json({
            message: error.message,
            state: queryState.error,
            data: undefined,
        });
        return
    }
}

const handleVerifyCode = async (req, res) => {
    try {
        const { id, state, code } = req.body;

        const foundUser = await User.findById(id)

        if (!foundUser) {
            res.status(404).json({
                message: 'user not found',
                state: queryState.error,
                data: undefined,
            });
            return;
        }

        if (!foundUser.generatedCode) {
            res.status(404).json({
                message: 'Code not found or expired',
                state: queryState.error,
                data: undefined,
            });
            return;
        }

        if (foundUser.generatedCode.state !== state) {
            res.status(417).json({
                message: 'code request state does not match',
                state: queryState.error,
                data: undefined,
            });
            return;
        }

        if (foundUser.generatedCode.code !== code) {
            res.status(417).json({
                message: 'inputted code does not match',
                state: queryState.error,
                data: undefined,
            });
            return;
        }

        if (state === 'verify') {
            foundUser.isEmailVerified = true
        }

        foundUser.generatedCode = null;


        const result = await foundUser.save();;
        const safeUserData = parseSafeUserData(result);

        if (state === 'verify') {
            const accessToken = jwt.sign({
                user: safeUserData,
            },
                accessTokenSecret, {
                expiresIn: MAX_AGE,
            });

            res.cookie('jwt', accessToken, {
                ...cookieOptions,
                maxAge: MAX_AGE * 1000,
            });
        }


        res.cookie('user', JSON.stringify(safeUserData), {
            ...cookieOptions,
            maxAge: MAX_AGE * 1000
        });

        res.status(202).json({
            message: 'code matched',
            state: queryState.success,
            data: safeUserData,
        });
    }
    catch (error) {
        res.status(405).json({
            message: error.message,
            state: queryState.error,
            data: undefined,
        });
        return;
    }
}

const handleResendCode = async (req, res) => {
    try {
        const { state, email } = req.body;
        const user = await User.findOne({ email });

        if (!user) {
            res.status(404).json({
                message: 'email not found',
                state: queryState.error,
                data: undefined,
            });
            return;
        }

        const generatedCode = generateOtp(state);
        user.generatedCode = generatedCode;
        const result = await user.save();

        const safeUserData = parseSafeUserData(result, true)

        // TODO: Resend email here
        res.status(202).json({
            message: 'code has been resent',
            state: queryState.success,
            data: safeUserData,
        });

    } catch (error) {
        res.status(405).json({
            message: error.message,
            state: queryState.error,
            data: undefined,
        });
        return
    }
}

const handleSignUp = async (req, res) => {
    try {
        const bodyValues = req.body;
        const values = await signUpSchema.validateAsync({ ...bodyValues });
        const hashedPassword = await bcrypt.hash(bodyValues.password, SALT_ROUNDS);

        const existingEmail = await User.findOne({ email: bodyValues.email });
        const existingUsername = await User.findOne({ username: bodyValues.username });

        if (existingEmail) {
            res.status(409).json({
                message: 'Email already exists',
                state: queryState.blocked,
                data: undefined
            });
            return;
        }
        if (existingUsername) {
            res.status(409).json({
                message: 'Username already exists',
                state: queryState.blocked,
                data: undefined
            });
            return;
        }

        const generatedCode = generateOtp('verify');
        const user = await User.create({ ...values, password: hashedPassword, generatedCode });

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

        const safeUserData = parseSafeUserData(user, true);

        res.status(201).json({
            message: 'user creation successful',
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

const handleInterestsAndAdSource = async (req, res) => {
    try {
        const { interests, adSource } = req.body;
        // console.log(req.user, interests, adSource)
        const foundUser = await User.findById(req.user.id);
        if (!foundUser) {
            res.status(404).json({
                message: 'account not found',
                state: queryState.error,
                data: undefined,
            });
            return;
        }

        foundUser.interests = interests;
        foundUser.adSources = adSource;

        const result = await foundUser.save();
        const safeUserData = parseSafeUserData(result);

        const accessToken = jwt.sign({
            user: result,
        },
            accessTokenSecret, {
            expiresIn: MAX_AGE,
        });
        res.cookie('jwt', accessToken, {
            ...cookieOptions,
            maxAge: MAX_AGE * 1000,
        });

        res.cookie('user', JSON.stringify(safeUserData), {
            ...cookieOptions,
            maxAge: MAX_AGE * 1000
        });

        res.status(200).json({
            message: 'update taken',
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

const handleSignIn = async (req, res) => {
    const bodyValues = req.body;

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

        res.cookie('jwt', accessToken, {
            ...cookieOptions,
            maxAge: MAX_AGE * 1000,
        });
        const safeUserData = parseSafeUserData(user);

        res.cookie('user', JSON.stringify(safeUserData), {
            ...cookieOptions,
            maxAge: MAX_AGE * 1000
        });
        res.status(202).json({
            message: 'login successful',
            state: queryState.success,
            data: safeUserData,
            // accessToken
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
        console.log(req.cookies)
        res.clearCookie('user');
        res.clearCookie('jwt');
        // Object.keys(req.cookies).forEach((cookieName) => {
        //     res.clearCookie(cookieName);
        // });
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

        clearAllCookies();
        res.status(205).json({
            message: "logged out",
            state: queryState.success,
            data: null,
        });
    } catch (error) {
        res.status(405).json({
            message: error.message,
            state: queryState.error,
            data: undefined,
        });
        return
    }
}

const handleMailGenCode = async (req, res) => {
    try {
        const { email } = req.body;
        const foundUser = await User.findOne({ email })

        if (!foundUser) {
            res.status(404).json({
                message: 'email not found',
                state: queryState.error,
                data: undefined,
            });
            return;
        }

        const generatedCode = generateOtp('forgot');
        foundUser.generatedCode = generatedCode;
        const user = await foundUser.save();
        if (!user) {
            res.status(405).json({
                message: 'code generation error',
                state: queryState.error,
                data: undefined,
            });
            return;
        }

        // TODO: send gen code to user
        const safeUserData = parseSafeUserData(user, true);
        res.status(200).json({
            message: 'verification code sent to your email',
            state: queryState.success,
            data: safeUserData,
        });
    } catch (error) {
        res.status(405).json({
            message: error.message,
            state: queryState.error,
            data: undefined,
        });
        return;
    }
}

const handleChangePassword = async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email });
        if (!user) {
            res.status(404).json({
                message: 'account not found',
                state: queryState.error,
                data: undefined,
            });
            return;
        }

        const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);
        const accessToken = jwt.sign({
            user: user,
        },
            accessTokenSecret, {
            expiresIn: MAX_AGE,
        });

        user.password = hashedPassword;
        const result = await user.save();
        const safeUserData = parseSafeUserData(result);

        res.cookie('jwt', accessToken, {
            ...cookieOptions,
            maxAge: MAX_AGE * 1000,
        });

        res.cookie('user', JSON.stringify(safeUserData), {
            ...cookieOptions,
            maxAge: MAX_AGE * 1000
        });

        res.status(202).json({
            message: 'password update successful',
            state: queryState.success,
            data: safeUserData,
        });
    } catch (error) {
        res.status(405).json({
            message: error.message,
            state: queryState.error,
            data: undefined,
        });
        return
    }
}

const handleInstructorRegister = async (req, res) => {
    const bodyValues = req.body;
    try {
        const values = await instructorApplicationSchema.validateAsync({ ...bodyValues });
        const foundUser = await User.findById(req.user.id);

        if (!foundUser) {
            res.status(404).json({
                message: 'account not found',
                state: queryState.error,
                data: undefined
            }); return;
        }

        const handles = {
            facebook: values.facebook || '',
            instagram: values.instagram || '',
            tiktok: values.tiktok || '',
            youtube: values.youtube || '',
            website: values.website || '',
        }
        foundUser.handles = handles;
        foundUser.residentialAddress = values.residentialAddress;
        foundUser.country = values.country || '';
        foundUser.phone = values.phone || '';

        const instructor = await Instructor.create({
            userId: foundUser._id,
            fullName: values.fullName,
            niche: values.niche,
            whyInterest: values.whyInterest,
            taughtBefore: values.taughtBefore,
            mentoredPreviously: values.mentoredPreviously,
        });

        const user = await foundUser.save();
        const safeUserData = parseSafeUserData(user);

        res.status(202).json({
            message: 'req received',
            state: queryState.success,
            data: {
                user: safeUserData,
                instructor
            },
        });
    } catch (error) {
        res.status(405).json({
            message: error.message,
            state: queryState.error,
            data: undefined,
        });
        return
    }
}

module.exports = {
    handleFindVerificationCode,
    handleVerifyCode,
    handleResendCode,
    handleSignUp,
    handleInterestsAndAdSource,
    handleSignIn,
    handleLogout,
    handleMailGenCode,
    handleChangePassword,
    handleInstructorRegister
}