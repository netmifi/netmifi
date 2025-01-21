// require('dotenv').config();
const { signUpSchema, signInSchema, instructorApplicationSchema } = require('../schemas/authSchema');
const { queryState } = require('../constants/queryState');
const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { cookieOptions } = require('../constants/cookieOptions');
const { generateOtp, parseSafeUserData } = require('../utils');
const Instructor = require('../models/Instructor');
const { sendEmail } = require('../config/emailService');

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


        const result = await foundUser.save();
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

            await sendEmail(foundUser.email, 'email_verified');
            await sendEmail(foundUser.email, 'registration_successful');
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
        await sendEmail(email, 'verification_code', generatedCode.code).then(async () => {
            user.generatedCode = generatedCode;
            const result = await user.save();

            const safeUserData = parseSafeUserData(result, true)

            res.status(202).json({
                message: 'code has been resent',
                state: queryState.success,
                data: safeUserData,
            });
        }).catch(() => {
            res.status(400).json({
                message: "Email not sent, please check your network and try again.",
                state: queryState.error,
                data: undefined,
            });
            return;
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

const handleSignUp = async (req, res) => {
    const bodyValues = req.body;
    console.log()
    try {
        const { error, value } = signUpSchema.validate(bodyValues, { abortEarly: false });
        const hashedPassword = await bcrypt.hash(bodyValues.password, SALT_ROUNDS);

        console.log("gotten");

        const existingEmail = await User.findOne({ email: bodyValues.email });
        const existingUsername = await User.findOne({ username: bodyValues.username });
        if (error) {
            // console.log(error);
            res.status(403).json({
                message: 'errors found',
                state: queryState.error,
                data: undefined,
                errors: error
            }); return;
        }

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
        sendEmail(bodyValues.email, 'verification_code', generatedCode.code)
        
        //     .then(async () => {
        //     console.log("emailed");
        //     const user = await User.create({ ...value, password: hashedPassword, generatedCode });

        //     if (!user) {
        //         res.status(500).json({
        //             message: 'signup failed due to server error, try again later',
        //             state: queryState.error,
        //             data: undefined
        //         }); return;
        //     }
        //     console.log("user found");


        //     res.cookie('user', JSON.stringify({ id: user.id, email: user.email }), {
        //         maxAge: MAX_AGE,
        //         ...cookieOptions,
        //     });

        //     const safeUserData = parseSafeUserData(user, true);
        //     res.status(201).json({
        //         message: 'user creation successful',
        //         state: queryState.success,
        //         data: safeUserData,
        //     });
        //     console.log("req successful");
        // }).catch(() => {
        //     console.log("failed mail");
        //     res.status(400).json({
        //         message: "Email not sent, please check your network and try again.",
        //         state: queryState.error,
        //         data: undefined,
        //     });
        //     return;
        // });
        console.log("not gotten");

    } catch (error) {
        console.log("func error");
        res.status(400).json({
            message: error.message,
            state: queryState.error,
            data: undefined,
        });
        return;
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
        const { error, value } = signInSchema.validate(bodyValues, { abortEarly: false });
        const user = await User.findOne({ email: bodyValues.email });

        if (error) {
            console.log(error);
            res.status(403).json({
                message: 'errors found',
                state: queryState.error,
                data: undefined,
                errors: error
            }); return;
        }

        if (!user) {
            res.status(404).json({
                message: 'email not found',
                state: queryState.error,
                data: undefined,
            });
            return;
        }

        const math = await bcrypt.compare(value.password, user.password);
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
            message: error.message,
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
        await sendEmail(email, 'verification_code', generatedCode.code).then(async () => {
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

            const safeUserData = parseSafeUserData(user, true);
            res.status(200).json({
                message: 'verification code sent to your email',
                state: queryState.success,
                data: safeUserData,
            });
        }).catch(() => {
            res.status(400).json({
                message: "Email not sent, please check your network and try again.",
                state: queryState.error,
                data: undefined,
            });
            return;
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
        const { error, value } = instructorApplicationSchema.validate(bodyValues, { abortEarly: false });
        console.log(value)
        const foundUser = await User.findById(req.user.id);
        const foundInstructor = await Instructor.findOne({ userId: foundUser._id });
        const exitingPhoneNumber = await User.findOne({ phone: value.phone })

        if (error) {
            console.log(error);
            res.status(403).json({
                message: 'validation error',
                state: queryState.error,
                data: undefined,
                errors: error
            }); return;
        }

        if (!foundUser) {
            res.status(404).json({
                message: 'account not found',
                state: queryState.error,
                data: undefined
            }); return;
        }
        if (foundInstructor) {
            res.status(409).json({
                message: 'account already found to be an instructor',
                state: queryState.error,
                data: undefined
            }); return;
        }
        if (exitingPhoneNumber) {
            res.status(409).json({
                message: 'phone number already exists',
                state: queryState.error,
                data: undefined
            }); return;
        }

        const checkNameInclusion = value.fullName.toLowerCase().includes(foundUser.firstName.toLowerCase()) && value.fullName.toLowerCase().includes(foundUser.lastName.toLowerCase());

        if (!checkNameInclusion) {
            res.status(409).json({
                message: 'Full name specified does not have already registered first and last name',
                state: queryState.error,
                data: value
            }); return;
        }

        const handles = {
            facebook: value.facebook || '',
            instagram: value.instagram || '',
            tiktok: value.tiktok || '',
            youtube: value.youtube || '',
            website: value.website || '',
        }
        foundUser.handles = handles;
        foundUser.residentialAddress = value.residentialAddress;
        foundUser.country = value.country || '';
        foundUser.phone = value.phone || '';
        foundUser.roles = { ...foundUser.roles, instructor: true };

        const instructor = await Instructor.create({
            userId: foundUser._id,
            fullName: value.fullName,
            niche: value.niche,
            whyInterest: value.whyInterest,
            taughtBefore: value.taughtBefore,
            mentoredPreviously: value.mentoredPreviously,
            status: 'accepted',
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
        await sendEmail(foundUser.email, 'instructor_accepted');
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