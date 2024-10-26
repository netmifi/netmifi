import Joi from 'joi';

// Define Joi validation schema for the user
export const userSchema = Joi.object({
    firstName: Joi.string().trim().required(),
    lastName: Joi.string().trim().required(),
    email: Joi.string().email().required(),
    password: Joi.string()
        .pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')),
    phoneNumber: Joi.string().required().pattern(/^\+?[1-9]\d{1,14}$/), // Basic pattern for international phone numbers
    country: Joi.string().required(),
    countryDialCode: Joi.string().required().pattern(/^\+\d+$/), // Ensures dial code starts with '+'
    interests: Joi.array().items(Joi.string()).default([]), // Default role set to 'user'
    // roles: Joi.array().items(Joi.string()).default(['user']) // Default role set to 'user'
});