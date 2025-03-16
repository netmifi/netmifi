const Joi = require('joi');

const fileValidation = Joi.object({
  originalname: Joi.string().required().messages({
    "string.empty": "File must have a name",
  }),
  mimetype: Joi.string()
    .valid("image/jpg", "image/jpeg", "image/png", "video/mp4", "video/mpeg")
    .required()
    .messages({
      "any.only": "Only jpg, jpeg, png, mp4, or mpeg files are allowed.",
    }),
  size: Joi.number()
    .max(50 * 1024 * 1024) // Max file size: 50MB
    .required()
    .messages({
      "number.max": "The file size exceeds the maximum allowed size.",
    }),
}).required();

const videoValidation = Joi.object()
  .custom((value, helpers) => {
    if (!(value instanceof FileList) || value.length === 0) {
      return helpers.error("any.invalid", { message: "Please select a video file." });
    }
    return value.item(0);
  }, "Video validation")
  .custom((file, helpers) => {
    if (!["video/mp4", "video/mpeg"].includes(file.type)) {
      return helpers.error("any.invalid", {
        message: "Only mp4 and mpeg files are allowed.",
      });
    }
    // if (file.size > 50 * 1024 * 1024) {
    //   return helpers.error("any.invalid", {
    //     message: "File size has exceeded 50MB.",
    //   });
    // }
    return file;
  });

module.exports.courseSchema = Joi.object({
    title: Joi.string()
      .min(5)
      .required()
      .messages({ "string.min": "Course title cannot be less than 5 characters" }),
    description: Joi.string()
      .min(20)
      .required()
      .messages({
        "string.min": "Description cannot be less than 20 characters long",
      }),
      thumbnail: fileValidation.messages({
        "any.required": "Thumbnail file is required.",
      }),
      introVideo: fileValidation.messages({
        "any.required": "Intro video file is required.",
      }),
    requirements: Joi.array()
      .items(Joi.string())
      .min(1)
      .required()
      .messages({ "array.min": "Field required" }),
    price: Joi.string()
      .regex(/^\d+$/)
      .required()
      .messages({ "string.pattern.base": "Only numbers are allowed" }),
    mentorshipAvailability: Joi.string().required(),
    mentorshipAvailabilityDays: Joi.array()
      .items(Joi.string())
      .min(1)
      .optional(),
    from: Joi.string()
    //   .regex(timeRegex)
      .optional(),
    //   .messages({ "string.pattern.base": "Select a valid time (HH:mm)" }),
    to: Joi.string()
    //   .regex(timeRegex)
      .optional(),
    //   .messages({ "string.pattern.base": "Select a valid time (HH:mm)" }),
    dynamicFields: Joi.object().pattern(
      Joi.string(),
      Joi.object({
        title: Joi.string()
          .min(5)
          .required()
          .messages({
            "string.min": "Title must be at least 5 characters",
          }),
          video: fileValidation.messages({
            "any.required": "Intro video file is required.",
          }),
        description: Joi.string().optional(),
      })
    ),
  });
