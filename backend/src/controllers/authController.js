//  THIS FILE IS STRICTLY AUTHENTICATION LOGIC
// this file handles all auth business logic especially those that tamper with the user collection in our database

const { signUpSchema, signInSchema, instructorApplicationSchema } = require('../schemas/authSchema');
const { queryState } = require('../constants/queryState');
const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { generateOtp, parseSafeUserData } = require('../utils');
const Instructor = require('../models/Instructor');
const { sendEmail } = require('../services/emailService');
const ACCESS_LEVELS = require('../constants/accessLevels');
const { authCookieService } = require('../services/cookieService');
const { OAuth2Client } = require('google-auth-library');
const { fetchGoogleUserInfo, createGoogleUser } = require('../services/googleAuthService');
const { emailSubjects, instructorAcceptedTemplate } = require('../constants/emailTemplates');
const { emailBody } = require('../services/emailService');

const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);
const accessTokenSecret = process.env.ACCESS_TOKEN_SECRET;
const SALT_ROUNDS = 12; // PLEASE DO NOT ALTER

const handleFindVerificationCode = async (req, res) => {
    // finds verification code and sends what the code is for and the expiration time left upon request from client
    // NOTE: THIS FUNCTION IS ONLY SHOULD NOT AND NEVER RETURN THE CODE BUT ITS OPTIONS
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
    // THIS FUNCTION VERIFIES CODE
    // # checks if the user that wants to verify exists
    // # checks if the code exists in the users document that is user.generated code ** refrence User schema for more info **
    // # checks if code state (i.e. what the code was generated for) is a match
    // # checks if sent code matches database save code
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
            await sendEmail(foundUser.email, 'email_verified');
            await sendEmail(foundUser.email, 'registration_successful', result.firstName);
        }

        authCookieService(res, result);
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
    // this just generates a new code and sends it to the user's email
    //  then updates the users generated codce to the new one
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
    // this just handles the signup/register logic
    const bodyValues = req.body;
    try {
        const { error, value } = signUpSchema.validate(bodyValues, { abortEarly: false }); // using joi to check if values from client all obey what we want in our schema such as types, length, empty or null, etc ** REF  schema/authSchema for more info**
        const hashedPassword = await bcrypt.hash(bodyValues.password, SALT_ROUNDS);

        const existingEmail = await User.findOne({ email: bodyValues.email });
        const existingUsername = await User.findOne({ username: bodyValues.username });

        if (error) {
            // if there was a validation violation of the clients values to the joi standard schema
            res.status(403).json({
                message: 'errors found',
                state: queryState.error,
                data: undefined,
                errors: error
            }); return;
        }

        if (existingEmail) {
            // email must be unoque
            res.status(409).json({
                message: 'Email already exists',
                state: queryState.blocked,
                data: undefined
            });
            return;
        }
        if (existingUsername) {
            // username must be unique
            res.status(409).json({
                message: 'Username already exists',
                state: queryState.blocked,
                data: undefined
            });
            return;
        }

        const generatedCode = generateOtp('verify'); // generate code for user with state verify (which indicates user wants to verify email)
        sendEmail(bodyValues.email, 'verification_code', generatedCode.code) // send email (send to email, template we want to use, then code tosnd)
            .then(async () => {
                console.log("emailed");
                const user = await User.create({ ...value, password: hashedPassword, generatedCode });

                if (!user) {
                    res.status(500).json({
                        message: 'signup failed due to server error, try again later',
                        state: queryState.error,
                        data: undefined
                    }); return;
                }
                console.log("user found");


                const safeUserData = parseSafeUserData(user, true); // send back a safe user data to client ** REF utils/index.js**
                authCookieService(res, user); // ** REF services/cookieService **
                res.status(201).json({
                    message: 'user creation successful',
                    state: queryState.success,
                    data: safeUserData,
                });
                console.log("req successful");
            }).catch(() => {
                console.log("failed mail");
                res.status(400).json({
                    message: "Email not sent, please check your network and try again.",
                    state: queryState.error,
                    data: undefined,
                });
                return;
            });
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
    // This function takes the request from the welcome page, its for taking the courses of interests of users and their referral point
    //  # checks if user exists
    //  # picks the client's courses of interests and advert sources
    //  # updates user

    try {
        const { interests, adSource } = req.body;

        // please ** REF middleware/verifyJWT to see req.user** 
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

        authCookieService(res, result);
        res.status(200).json({
            message: 'update success',
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
    // this function is for handling signin/login request from client
    //  # takes signin values and parses then to the joi validation to make sure necessary fields are init
    //  # checks if the user's email exists 
    //  # checks if  password matches the HASHED password from the database
    //  # update authentication cookies

    const bodyValues = req.body;
    // console.log("body values:",bodyValues)
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

        // console.log("math:", await bcrypt.compare(value.password, user.password)
        // )
        const match = await bcrypt.compare(value.password, user.password);

        if (!match) {
            res.status(400).json({
                message: 'incorrect password',
                state: queryState.blocked,
                data: undefined,
            });
            return;
        }

        authCookieService(res, user);
        const safeUserData = parseSafeUserData(user);
        console.log(safeUserData)
        res.status(202).json({
            message: 'login successful',
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

const handleGoogleAuth = async (req, res) => {
    try {
        const { access_token } = req.body
        console.log(access_token);
        if (!access_token) {
            return res.status(400).json({
                message: "Access token is required",
                state: queryState.error,
                data: undefined,
            });
        }

        // Get user info from Google using the access token
        const googleUserInfo = await fetchGoogleUserInfo(access_token)

        if (!googleUserInfo) {
            return res.status(401).json({
                message: "Invalid Google token",
                state: queryState.error,
                data: undefined,
            })
        }
        console.log(googleUserInfo)
        const { sub: googleId, email, name, picture } = googleUserInfo;

        // Check if user exists by googleId or email
        let user = await User.findOne({ $or: [{ googleId }, { email }] })
        let isNewUser = false

        if (!user) {
            // New user - create account
            isNewUser = true
            user = await createGoogleUser(googleId, email, name, picture); // Ref /services/googleAuthService
        } else if (user.email === email) {
            // Existing user with same email
            if (user.password && !user.googleId) {
                // User exists with password login but no Google ID
                return res.status(409).json({
                    message: "Email already registered with password. Please login with your password or use account linking.",
                    state: queryState.blocked,
                    data: undefined,
                })
            } else if (!user.googleId) {
                // User exists but doesn't have Google ID - update their account
                user.googleId = googleId
                if (picture && !user.profilePicture) {
                    user.profilePicture = picture
                }
                await user.save()
            }
        }

        // Set auth cookies
        authCookieService(res, user);

        // Return safe user data
        const safeUserData = parseSafeUserData(user)

        // Return success with 200 status code
        return res.status(200).json({
            message: "Google authentication successful",
            state: queryState.success,
            data: { ...safeUserData, isNewUser },
        })
    } catch (error) {
        console.error("Google auth error:", error)
        return res.status(500).json({
            message: error.message || "Authentication failed",
            state: queryState.error,
            data: undefined,
        })
    }
}

const handleLogout = async (req, res) => {
    // this function handles logout requests
    // here we destroy all authentication cookies
    const cookies = req.cookies;

    const clearAllCookies = () => {
        console.log(req.cookies)
        res.clearCookie('user');
        res.clearCookie('jwt');
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
    // this function handles code generation for forgotten password requests
    // # collect user's email and check if it exists in DB
    // # send email with code generated to this email
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

        if (user.googleId) {
            res.status(409).json({
                message: 'You signed in through google.',
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
    // password change request, updates uses's password with new password
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

        if (user.googleId) {
            res.status(409).json({
                message: 'You signed in through google.',
                state: queryState.error,
                data: undefined,
            });
            return;
        }

        const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);
        user.password = hashedPassword;

        const result = await user.save();
        const safeUserData = parseSafeUserData(result);

        authCookieService(res, result);
        await sendEmail(email, 'password_changed');
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
    console.log("Received instructor registration data:", bodyValues);
    
    try {
        const { error, value } = instructorApplicationSchema.validate(bodyValues, { abortEarly: false });
        const foundUser = await User.findById(req.user.id);
        const foundInstructor = await Instructor.findOne({ userId: foundUser._id });
        const existingPhoneNumber = await User.findOne({ phone: value.phone });

        if (error) {
            console.log("Validation error:", error);
            return res.status(400).json({
                message: 'Validation error',
                state: 'error',
                errors: error.details
            });
        }

        if (!foundUser) {
            return res.status(404).json({
                message: 'User not found',
                state: 'error'
            });
        }

        if (foundInstructor) {
            return res.status(409).json({
                message: 'You are already registered as an instructor',
                state: 'error'
            });
        }

        if (existingPhoneNumber && existingPhoneNumber._id.toString() !== foundUser._id.toString()) {
            return res.status(409).json({
                message: 'Phone number already in use',
                state: 'error'
            });
        }

        const handles = {
            facebook: value.facebook || '',
            instagram: value.instagram || '',
            tiktok: value.tiktok || '',
            youtube: value.youtube || '',
            website: value.website || '',
        };

        // Update user profile
        foundUser.handles = handles;
        foundUser.residentialAddress = value.residentialAddress;
        foundUser.country = value.country;
        foundUser.phone = value.phone;
        foundUser.about = value.about || '';
        foundUser.roles = { ...foundUser.roles, Instructor: ACCESS_LEVELS.Instructor };

        // Create instructor profile
        const instructor = await Instructor.create({
            userId: foundUser._id,
            niche: value.niche,
            whyInterest: value.whyInterest,
            taughtBefore: value.taughtBefore,
            mentoredPreviously: value.mentoredPreviously,
            status: 'pending'
        });

        const user = await foundUser.save();
        const safeUserData = parseSafeUserData(user);

        // Send welcome email
        await sendEmail({
            to: user.email,
            subject: emailSubjects.instructor_accepted,
            templateType: 'instructor_accepted'
        });

        return res.status(200).json({
            message: 'Instructor registration successful',
            state: 'success',
            data: {
                user: safeUserData,
                instructor
            }
        });

    } catch (error) {
        console.error("Instructor registration error:", error);
        return res.status(500).json({
            message: error.message || 'Failed to process instructor registration',
            state: 'error'
        });
    }
};

module.exports = {
    handleFindVerificationCode,
    handleVerifyCode,
    handleResendCode,
    handleSignUp,
    handleInterestsAndAdSource,
    handleSignIn,
    handleGoogleAuth,
    handleLogout,
    handleMailGenCode,
    handleChangePassword,
    handleInstructorRegister
}