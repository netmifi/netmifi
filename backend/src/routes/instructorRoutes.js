const { uploadCourse } = require('@/controllers/instructorController');
const express = require('express');
const multer = require('multer');
const path = require('path');
const verifyRoles = require('../middlewares/verifyRole');

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        const destinationPath =
            file.fieldname === 'thumbnail'
                ? path.join(__dirname, '..', 'uploads', 'thumbnail')
                : path.join(__dirname, '..', 'uploads', 'courses');
        cb(null, destinationPath);
    },

    filename: (req, file, cb) => {
        // Initialize counter for dynamic fields if not set yet
        if (!req.dynamicFieldCounter) {
            req.dynamicFieldCounter = 1; // Initialize the counter for the current request
        }

        let filename;

        if (file.fieldname === 'thumbnail') {
            // Naming for thumbnail
            filename = `${req.user.username}-${Date.now()}${path.extname(file.originalname)}`;
        } else if (file.fieldname === 'introVideo') {
            // Naming for intro video
            filename = `${req.user.username}-intro-${Date.now()}${path.extname(file.originalname)}`;
        } else if (file.fieldname.startsWith('dynamicFields[') && file.fieldname.endsWith('][video]')) {
            // Naming for dynamic fields
            filename = `${req.dynamicFieldCounter++}-${req.user.username}-section-${Date.now()}${path.extname(file.originalname)}`;
        } else {
            // Default fallback
            filename = `${req.user.username}-${Date.now()}${path.extname(file.originalname)}`;
        }

        cb(null, filename);
    },
});

const upload = multer({ storage });
const router = express.Router();


router.get("/test", verifyRoles("Instructor"), (req, res) => res.json({ "message": 'hello' }))

// Correctly configure multer to handle the "thumbnail" field
router.post("/create",  verifyRoles("Instructor"), (req, res, next) => {
    req.dynamicFieldCounter = 1; // Reset counter for every request
    next();
},
    upload.any(), (req, res, next) => {
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
    }, uploadCourse);
module.exports = router;