const { signUpSchema, signInSchema, instructorApplicationSchema } = require('../schemas/authSchema');
const { queryState } = require('../constants/queryState');
const User = require('../models/User');
const jwt = require('jsonwebtoken');
const { cookieOptions } = require('../constants/cookieOptions');
const path = require('path');
const fs = require('fs/promises');

// const { generateOtp, parseSafeUserData } = require('../utils');
const { courseSchema } = require('../schemas/instructorSchema');
const Course = require('../models/Course');
const MAX_AGE = 60 * 60 * 1000 * 24 * 5; // this is in milliseconds for 5 days

const removeUnwanted = async (filesObject) => {
    await fs.unlink(path.join(__dirname, '..', 'uploads', 'thumbnails', filesObject.thumbnail));
    await fs.unlink(path.join(__dirname, '..', 'uploads', 'courses', filesObject.introVideo));
    filesObject.map(async (filePath) => {
        if (filePath.includes('-section-')) {
            await fs.unlink(path.join(__dirname, '..', 'uploads', 'courses', filePath));
        }
    });
}

const uploadCourse = async (req, res) => {
    let uploadedFiles = {};
    try {
        const bodyValues = req.body;
        let sections = {};
        let sectionCounter = 1;

        if (req.files) {
            req.files.forEach((file) => {
                uploadedFiles[file.fieldname] = file.filename;
            });
        }

        // Process dynamic fields and create sections
        if (bodyValues.dynamicFields) {
            for (const fieldKey in bodyValues.dynamicFields) {
                const field = bodyValues.dynamicFields[fieldKey];
                const sectionKey = `section${sectionCounter}`;

                sections[sectionKey] = {
                    title: field.title,
                    description: field.description || '',
                    video: uploadedFiles[`dynamicFields[${fieldKey}][video]`] || null,
                };

                sectionCounter++;
            }

            // Remove dynamicFields from bodyValues
            delete bodyValues.dynamicFields;
        }

        const courseData = {
            ...bodyValues,
            userId: req.user.id,
            thumbnail: uploadedFiles.thumbnail,
            slugUrl: req.user.username + bodyValues.title.slice(0, 5).trim() + Math.round(Math.random() * 10000),
            introVideo: uploadedFiles.introVideo,
            sections,
        };

        const newCourse = await Course.create(courseData);

        // Log the validated values
        console.log(newCourse);

        if (!newCourse) {
            res.status(400).json({
                message: error.message,
                state: queryState.error,
                data: undefined,
            });
            removeUnwanted(uploadedFiles);
            return;
        }

        // Send back the successfully created course data with sections
        res.status(201).json({
            message: 'Course created successfully',
            state: 'success',
            data: newCourse,
        });

    } catch (error) {
        console.error(error);
        res.status(405).json({
            message: error.message,
            state: queryState.error,
            data: undefined,
        });
        removeUnwanted(uploadedFiles)
        return;
    }
};

module.exports = {
    uploadCourse
}


