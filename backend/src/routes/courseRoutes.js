const express = require('express');
const router = express.Router();
const { auth } = require('../middleware/auth');
const courseController = require('../controllers/courseController');

// Course Management Routes
router.post('/', auth, courseController.createCourse);
router.put('/:id', auth, courseController.updateCourse);
router.delete('/:id', auth, courseController.deleteCourse);

// Section Management Routes
router.post('/:id/sections', auth, courseController.addSection);
router.put('/:id/sections/:sectionId', auth, courseController.updateSection);
router.delete('/:id/sections/:sectionId', auth, courseController.deleteSection);

// Course Enrollment Routes
router.post('/:id/enroll', auth, courseController.enrollCourse);
router.delete('/:id/enroll', auth, courseController.unenrollCourse);

// Course Progress Routes
router.post('/:id/sections/:sectionId/complete', auth, courseController.completeSection);
router.post('/:id/sections/:sectionId/quiz', auth, courseController.submitQuiz);
router.put('/:id/sections/:sectionId/quiz', auth, courseController.updateQuiz);

// Course Retrieval Routes
router.get('/', courseController.getCourses);
router.get('/:id', courseController.getCourse);
router.get('/:id/sections', courseController.getSections);
router.get('/:id/progress', auth, courseController.getProgress);

// Course Completion Route
router.post('/:id/complete', auth, courseController.completeCourse);

module.exports = router;
