module.exports.uploadCourse = Joi.object({
    title: Joi.string().min(3).max(30).trim().required(),
    lastName: Joi.string().alphanum().min(3).max(30).trim().required(),
    username: Joi.string().alphanum().min(3).max(30).trim().required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(8)
        .required(),
    // pattern(new RegExp('^[a-zA-Z0-9]{3,30}$'))
});
