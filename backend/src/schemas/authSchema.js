const Joi = require('joi');

// Define Joi validation schema for the user
export const signUpSchema = Joi.object({
    firstName: Joi.string().alphanum().min(3).max(30).trim().required(),
    lastName: Joi.string().alphanum().min(3).max(30).trim().required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(5)
        .pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')).required(),
});

export const welcomeFormSchema = Joi.object({
    interests: Joi.array().items(Joi.string()).default([]),
    adSources: Joi.array().items(Joi.string()).default([]),
});

export const signInSchema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().min(5)
        .pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')).required(),
});

export const instructorApplicationSchema = Joi.object({
    username: Joi.string().alphanum().min(3).max(30).trim().required(),
    phoneNumber: Joi.string().required().pattern(/^\+?[1-9]\d{1,14}$/), // Basic pattern for international phone numbers
    countryDetails: Joi.object({
        name: Joi.string(),
        dialCode: Joi.string().pattern(/^\+\d+$/), // Ensures dial code starts with '+'
        code: Joi.string(),
    }),
    residentialAddress: Joi.string().alphanum().min(3).max(30).trim().required(),
    facebook: Joi.string().uri().optional().allow(''),
    instagram: Joi.string().uri().optional().allow(''),
    twitter: Joi.string().uri().optional().allow(''),
    tiktok: Joi.string().uri().optional().allow(''),
    youtube: Joi.string().uri().optional().allow(''),
    website: Joi.string().uri().optional(),

    niche: Joi.string().uri(),
    whyInterest: Joi.string().optional(),
    taughtOnlineBefore: Joi.string().valid('yes', 'no').required(),
    beenMentor: Joi.string().valid('yes', 'no').required(),
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