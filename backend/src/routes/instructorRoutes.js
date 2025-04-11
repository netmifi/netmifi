const { uploadCourse } = require('@/controllers/instructorController');
const express = require('express');
const verifyRoles = require('../middlewares/verifyRole');
const router = express.Router();


router.get("/test", verifyRoles("Instructor"), (req, res) => res.json({ "message": 'hello' }))

router.post("/create", verifyRoles("Instructor"), uploadCourse); // new course upload  route
module.exports = router;