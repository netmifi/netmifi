const Joi = require('joi');


// Define Joi validation schema for the user sign up/register
module.exports.signUpSchema = Joi.object({
    firstName: Joi.string().alphanum().min(3).max(30).trim().required(),
    lastName: Joi.string().alphanum().min(3).max(30).trim().required(),
    username: Joi.string().alphanum().min(3).max(30).trim().required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(8)
        .required(),
    // pattern(new RegExp('^[a-zA-Z0-9]{3,30}$'))
});

// schema for login 
module.exports.signInSchema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().min(5).required()
    // .pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')).required(),
});

// schema for intrest and advert sources
module.exports.welcomeFormSchema = Joi.object({
    interests: Joi.array().items(Joi.string()).default([]),
    adSources: Joi.array().items(Joi.string()).default([]),
});

// instructor application validation schema
module.exports.instructorApplicationSchema = Joi.object({
    phone: Joi.string().required().pattern(/^\+?[1-9]\d{1,14}$/)
        .messages({
            'string.pattern.base': 'Phone number must be a valid international format',
            'any.required': 'Phone number is required'
        }),
    country: Joi.object({
        name: Joi.string().required(),
        dialCode: Joi.string().pattern(/^\+\d+$/).required(),
        code: Joi.string().required(),
        flag: Joi.string().required(),
    }).required().messages({
        'any.required': 'Country information is required'
    }),
    residentialAddress: Joi.string().allow('').optional().min(3).max(200).trim()
        .messages({
            'string.min': 'Residential address must be at least 3 characters long',
            'string.max': 'Residential address cannot exceed 200 characters',
        }),
    facebook: Joi.string()
        .uri({ scheme: ['http', 'https'] })
        .allow('')
        .pattern(/^(?:(?:http|https):\/\/)?(?:www\.)?facebook\.com(?:\/.*)*$/)
        .messages({
            'string.uri': 'Facebook URL must be a valid URL',
            'string.pattern.base': 'Please enter a valid Facebook URL (e.g., www.facebook.com or https://facebook.com/username)'
        }),
    instagram: Joi.string()
        .uri({ scheme: ['http', 'https'] })
        .allow('')
        .pattern(/^(?:(?:http|https):\/\/)?(?:www\.)?instagram\.com(?:\/.*)*$/)
        .messages({
            'string.uri': 'Instagram URL must be a valid URL',
            'string.pattern.base': 'Please enter a valid Instagram URL (e.g., www.instagram.com/username)'
        }),
    twitter: Joi.string()
        .uri({ scheme: ['http', 'https'] })
        .allow('')
        .pattern(/^(?:(?:http|https):\/\/)?(?:www\.)?(?:twitter\.com|x\.com)(?:\/.*)*$/)
        .messages({
            'string.uri': 'Twitter/X URL must be a valid URL',
            'string.pattern.base': 'Please enter a valid Twitter/X URL (e.g., www.twitter.com/username or www.x.com/username)'
        }),
    tiktok: Joi.string()
        .uri({ scheme: ['http', 'https'] })
        .allow('')
        .pattern(/^(?:(?:http|https):\/\/)?(?:www\.)?tiktok\.com(?:\/.*)*$/)
        .messages({
            'string.uri': 'TikTok URL must be a valid URL',
            'string.pattern.base': 'Please enter a valid TikTok URL (e.g., www.tiktok.com/@username)'
        }),
    youtube: Joi.string()
        .uri({ scheme: ['http', 'https'] })
        .allow('')
        .pattern(/^(?:(?:http|https):\/\/)?(?:www\.)?(?:youtube\.com|youtu\.be)(?:\/.*)*$/)
        .messages({
            'string.uri': 'YouTube URL must be a valid URL',
            'string.pattern.base': 'Please enter a valid YouTube URL (e.g., www.youtube.com/channel/... or www.youtube.com/c/...)'
        }),
    website: Joi.string()
        .uri({ scheme: ['http', 'https'] })
        .allow('')
        .messages({
            'string.uri': 'Please enter a valid website URL (e.g., www.example.com)'
        }),
    niche: Joi.string().required()
        .messages({
            'any.required': 'Niche is required'
        }),
    whyInterest: Joi.string().allow('').optional(),
    taughtBefore: Joi.string().valid('yes', 'no').required()
        .messages({
            'any.only': 'Taught before must be either "yes" or "no"',
            'any.required': 'Taught before information is required'
        }),
    mentoredPreviously: Joi.string().valid('yes', 'no').required()
        .messages({
            'any.only': 'Mentored previously must be either "yes" or "no"',
            'any.required': 'Mentored previously information is required'
        }),
    about: Joi.string().optional(),
}).custom((obj, helpers) => {
    const socialMediaHandles = ['facebook', 'twitter', 'instagram', 'tiktok', 'youtube'];
    const filledHandles = socialMediaHandles.filter(handle => obj[handle]);

    if (filledHandles.length < 2) {
        return helpers.error('custom.socialMedia', {
            message: 'At least 2 social media handles must be filled.'
        });
    }

    return obj;
}, 'Social Media Handles Check').messages({
    'custom.socialMedia': 'At least 2 social media handles must be filled.'
});