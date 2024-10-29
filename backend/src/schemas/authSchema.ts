import Joi from 'joi';

// Define Joi validation schema for the user
export const signUpSchema = Joi.object({
    firstName: Joi.string().trim().required(),
    lastName: Joi.string().trim().required(),
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
    phoneNumber: Joi.string().required().pattern(/^\+?[1-9]\d{1,14}$/), // Basic pattern for international phone numbers
    countryDialCode: Joi.string().required().pattern(/^\+\d+$/), // Ensures dial code starts with '+'
})