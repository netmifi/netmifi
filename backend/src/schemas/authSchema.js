const Joi = require('joi');


// Define Joi validation schema for the user
module.exports.signUpSchema = Joi.object({
    firstName: Joi.string().alphanum().min(3).max(30).trim().required(),
    lastName: Joi.string().alphanum().min(3).max(30).trim().required(),
    username: Joi.string().alphanum().min(3).max(30).trim().required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(8)
        .required(),
    // pattern(new RegExp('^[a-zA-Z0-9]{3,30}$'))
});


module.exports.signInSchema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().min(5).required()
    // .pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')).required(),
});
module.exports.welcomeFormSchema = Joi.object({
    interests: Joi.array().items(Joi.string()).default([]),
    adSources: Joi.array().items(Joi.string()).default([]),
});

module.exports.instructorApplicationSchema = Joi.object({
    fullName: Joi.string().min(3).max(100).trim().required(),
    phone: Joi.string().required().pattern(/^\+?[1-9]\d{1,14}$/), // Basic pattern for international phone numbers
    country: Joi.object({
        name: Joi.string(),
        dialCode: Joi.string().pattern(/^\+\d+$/), // Ensures dial code starts with '+'
        code: Joi.string(),
        flag: Joi.string(),
    }),
    residentialAddress: Joi.string().min(3).max(30).trim().required(),
    facebook: Joi.string().uri().optional().allow(''),
    instagram: Joi.string().uri().optional().allow(''),
    twitter: Joi.string().uri().optional().allow(''),
    tiktok: Joi.string().uri().optional().allow(''),
    youtube: Joi.string().uri().optional().allow(''),
    website: Joi.string().uri().optional(),

    niche: Joi.string().required(),
    whyInterest: Joi.string().optional(),
    taughtBefore: Joi.string().valid('yes', 'no').required(),
    mentoredPreviously: Joi.string().valid('yes', 'no').required(),
    about: Joi.string(),
}).custom((obj, helpers) => {
    // Count how many of the social handles are not empty
    const socialMediaHandles = ['facebook', 'twitter', 'instagram', 'tiktok', 'youtube'];
    const filledHandles = socialMediaHandles.filter(handle => obj[handle]);

    if (filledHandles.length < 2) {
        return helpers.error('any.custom', { message: 'At least 2 social media handles must be filled.' });
    }

    return obj; // Valid object
}, 'Social Media Handles Check');