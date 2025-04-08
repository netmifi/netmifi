const { queryState } = require('../constants/queryState');
const path = require('path');
const fs = require('fs/promises');
const multer = require('multer');
const Course = require('../models/Course');
const MAX_AGE = 60 * 60 * 1000 * 24 * 5; // this is in milliseconds for 5 days

const removeUnwanted = async (filesObject) => {
    // this function maps through all data provided in objects and checks if file exists and deletes them
    await fs.unlink(path.join(__dirname, '..', 'uploads', 'thumbnails', filesObject.thumbnail)); // if thumbnail exists
    await fs.unlink(path.join(__dirname, '..', 'uploads', 'courses', filesObject.introVideo)); // if intro video exists
    filesObject.map(async (filePath) => {
        // checks for course section videos
        if (filePath.includes('-section-')) {
            await fs.unlink(path.join(__dirname, '..', 'uploads', 'courses', filePath));
        }
    });
}

const storage = multer.diskStorage({
    // multer storage which directs to the uploads folder and the relevant folder respectively
    destination: (req, file, cb) => {
        const destinationPath =
            file.fieldname === 'thumbnail'
                ? path.join(__dirname, '..', 'uploads', 'thumbnail')
                : path.join(__dirname, '..', 'uploads', 'courses');
        cb(null, destinationPath /* destination of file */)
    },

    // the logic here is for course section, we want to have section 1, section 2, respectively
    // # we want to start a counter
    // # checks if file is not a thumbnail or intro video od a course section
    // # unique filename

    filename: (req, file, cb) => {
        // Initialize counter for dynamic fields if not set yet
        if (!req.dynamicFieldCounter) {
            req.dynamicFieldCounter = 1; // Initialize the counter for the current request
        }

        let filename;

        if (file.fieldname === 'thumbnail') {
            // Naming for thumbnail
            // e.g "username-189019201-.jpg"
            filename = `${req.user.username}-${Date.now()}${path.extname(file.originalname)}`;
        } else if (file.fieldname === 'introVideo') {
            // Naming for intro video
            // e.g "username-189019201-.mp4"
            filename = `${req.user.username}-intro-${Date.now()}${path.extname(file.originalname)}`;
        } else if (file.fieldname.startsWith('dynamicFields[') && file.fieldname.endsWith('][video]')) {
            // Naming for dynamic fields
            // e.g "1-username-section-5467890.mp4"

            filename = `${req.dynamicFieldCounter++}-${req.user.username}-section-${Date.now()}${path.extname(file.originalname)}`;
        } else {
            // Default fallback
            filename = `${req.user.username}-${Date.now()}${path.extname(file.originalname)}`;
        }
        cb(null, filename);
    },
});

const upload = multer({ storage });

//  the upload course function is a complex function 
// ----- it has two middlewares and then a final handler
const uploadCourse = [(req, res, next) => {
    // middleware for initializing count
    req.dynamicFieldCounter = 1; // Reset counter for every request to prevent one client's request count to affect another
    next();
},
upload.any(), (req, res, next) => {
    // miulter middleware for file upload 
    const validFiles = {};
    req.files.forEach((file) => {
        // Check if the field name starts with "dynamicFields[" and ends with "][video]"
        if (file.fieldname.startsWith("dynamicFields[") && file.fieldname.endsWith("][video]")) {
            validFiles[file.fieldname] = file;
        } else {
            console.warn(`Unexpected field: ${file.fieldname}`);
        }
    });
    next();
}, async (req, res) => {
    //  this handler handles the upload and course creation
    let uploadedFiles = {}; //init uploaded files to an empty object
    try {
        const bodyValues = req.body;
        let sections = {};
        let sectionCounter = 1; // init section counter as one

        if (req.files) {
            //  add all filename into a db the object is to look like this { thumbnail: 'image.jpg' }
            req.files.forEach((file) => {
                uploadedFiles[file.fieldname] = file.filename;
            });
        }

        // Process dynamic fields and create sections
        if (bodyValues.dynamicFields) {
            //  this function process dynamic fields for sections
            // we call oit dynamic field because we do not know the number of section videos coming in
            for (const fieldKey in bodyValues.dynamicFields) {
                const field = bodyValues.dynamicFields[fieldKey];
                const sectionKey = `section${sectionCounter}`;
                sections[sectionKey] = {
                    title: field.title, // title of the section
                    description: field.description || '', //  section description
                    video: uploadedFiles[`dynamicFields[${fieldKey}][video]`] || null, // vidoe
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
            slugUrl: req.user.username + bodyValues.title.slice(0, 5).trim() + Math.round(Math.random() * 10000), //. unique url for our access course on get request
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
            removeUnwanted(uploadedFiles); // if request failed remove files redundant files
            return;
        }

        // Send back the successfully created course data with sections
        res.status(201).json({
            message: 'Course created successfully',
            state: queryState.success,
            data: newCourse,
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({
            message: error.message,
            state: queryState.error,
            data: undefined,
        });
        removeUnwanted(uploadedFiles)
        return;
    }
}]

module.exports = {
    uploadCourse
}


