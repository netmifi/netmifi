const { signUpSchema, signInSchema, instructorApplicationSchema } = require('../schemas/authSchema');
const { queryState } = require('../constants/queryState');
const User = require('../models/User');
const jwt = require('jsonwebtoken');
const { cookieOptions } = require('../constants/cookieOptions');

const { generateOtp, parseSafeUserData } = require('../utils');
const MAX_AGE = 60 * 60 * 1000 * 24 * 5; // this is in milliseconds for 5 days

const uploadCourse = async (req, res)=> {
    try {
        const bodyValues = req.body;
    } catch (error) {
        uploadCourse
    }
}

module.exports = {
    uploadCourse
}


