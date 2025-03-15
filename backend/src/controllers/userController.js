// this file handles user business login like updates, profiles, getting user

const { queryState } = require('../constants/queryState');
const User = require('../models/User');
const jwt = require('jsonwebtoken');
const { cookieOptions } = require('../constants/cookieOptions');
const { parseSafeUserData } = require('../utils');
const fs = require('fs/promises');
const fsSync = require('fs');
const multer = require('multer');
const path = require('path');
const bcrypt = require('bcrypt');
const { authCookieService } = require('../services/cookieService');
const SALT_ROUNDS = 12;

const storage = multer.diskStorage({
    // multer storage for user profile photo and cover photo
    destination: (req, file, cb) => {
        console.log(file.fieldname);
        const destinationPath =
            file.fieldname == 'cover'
                ? path.join(__dirname, '..', 'uploads', 'cover')
                : file.fieldname == 'profile' ? path.join(__dirname, '..', 'uploads', 'profile') : null;
        cb(null, destinationPath);
    },

    filename: (req, file, cb) => {
        const filename = `${req.user.username}-${Date.now()}${path.extname(file.originalname)}`;
        cb(null, filename);
    },
});

const upload = multer({ storage });

const handleFindUser = async (req, res) => {
    // this function gets th currently logged in user
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

        const safeUser = parseSafeUserData(user)

        res.status(201).json({
            message: 'user found',
            state: queryState.success,
            data: safeUser,
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
    // this function checks if current user is signed in
    //  it has extra features compared to the verifyJWT middleware
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
        authCookieService(res, foundUser);

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


// th e update profile function handles profile updates including profile image and cover image
const updateProfile = [upload.any(), async (req, res) => {
    let uploadedFiles = {};
    try {
        const { phone, country, residentialAddress, facebook, instagram, tiktok, youtube, website, about } = req.body;

        const existingPhoneNumber = await User.findOne({ phone });
        console.log(existingPhoneNumber)
        if (existingPhoneNumber && existingPhoneNumber._id !== req.user.id) {
            res.status(409).json({
                message: 'phone number already exists',
                state: queryState.error,
                data: undefined
            }); return;
        }

        if (req.files) {
            req.files.forEach((file) => {
                uploadedFiles[file.fieldname] = file.filename;
            });
        }
        console.log("files", uploadedFiles);
        const foundUser = await User.findById(req.user.id);
        const profilePath = path.join(__dirname, '..', 'uploads', 'profile', foundUser.profile ?? "");
        const coverPath = path.join(__dirname, '..', 'uploads', 'cover', foundUser.cover ?? "");
        if (uploadedFiles.profile && foundUser.profile && fsSync.existsSync(String(profilePath))) await fs.unlink(profilePath);
        if (uploadedFiles.cover && foundUser.cover && fsSync.existsSync(String(coverPath))) await fs.unlink(coverPath);

        if (uploadedFiles.profile) foundUser.profile = uploadedFiles.profile;
        if (uploadedFiles.cover) foundUser.cover = uploadedFiles.cover;
        if (phone) foundUser.phone = phone;
        if (country && country.dialCode) foundUser.country = country;
        if (residentialAddress) foundUser.residentialAddress = residentialAddress;
        if (facebook) foundUser.handles.facebook = facebook;
        if (instagram) foundUser.handles.instagram = instagram;
        if (tiktok) foundUser.handles.tiktok = tiktok;
        if (youtube) foundUser.handles.youtube = youtube;
        if (website) foundUser.handles.web = website;
        if (about) foundUser.about = about;

        const result = await foundUser.save();

        const safeUserData = parseSafeUserData(result);
        authCookieService(res, result);

        res.status(202).json({
            message: 'profile update successful',
            state: queryState.success,
            data: safeUserData,
        });

    } catch (error) {
        console.log(error)
        res.status(400).json({
            message: error.message,
            state: queryState.error,
            data: undefined,
        });
    }
}];

const updateNewPassword = async (req, res) => {
    // this function handles password change
    // unlike the auth forgotten password, this guy does not send any verification therefore it checks is the current password matches the hashed in the db then updates the password
    try {
        const { currentPassword, newPassword, confirmPassword } = req.body;
        const foundUser = await User.findById(req.user.id);

        if (!foundUser) {
            res.status(404).json({
                message: 'account not found',
                state: queryState.error,
                data: undefined
            }); return;
        }

        if (newPassword !== confirmPassword) {
            res.status(409).json({
                message: 'New password does not match confirm password',
                state: queryState.error,
                data: undefined,
            }); return;
        }

        const match = await bcrypt.compare(currentPassword, foundUser.password);

        if (!match) {
            res.status(409).json({
                message: 'Current password is incorrect',
                state: queryState.error,
                data: undefined,
            }); return;
        }


        const newHashedPwd = await bcrypt.hash(confirmPassword, SALT_ROUNDS);
        foundUser.password = newHashedPwd;

        const result = await foundUser.save();
        authCookieService(res, result);

        const safeUserData = parseSafeUserData(result);

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

const changeTheme = async (req, res) => {
    // simply for changing background theme
    try {
        const { theme } = req.body;
        const foundUser = await User.findById(req.user.id);

        if (!foundUser) {
            res.status(404).json({
                message: 'account not found please signin',
                state: queryState.error,
                data: undefined
            }); return;
        }

        foundUser.theme = theme;
        const result = await foundUser.save();

        authCookieService(res, result);

        const safeUserData = parseSafeUserData(result);
        res.status(201).json({
            message: 'user found',
            state: queryState.success,
            data: safeUserData,
        });
    } catch (error) {
        console.log(error)
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
    updateProfile,
    updateNewPassword,
    changeTheme
}