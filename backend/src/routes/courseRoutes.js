const express = require('express');
const router = express.Router();
const verifyJwt = require('../middlewares/verifyJwt');
const verifyRoles = require('../middlewares/verifyRole');

// Course management routes
router.post('/create', verifyJwt, verifyRoles('instructor'), require('../controllers/courseController').createCourse);
router.put('/:id', verifyJwt, verifyRoles('instructor'), require('../controllers/courseController').updateCourse);
router.delete('/:id', verifyJwt, verifyRoles('instructor'), require('../controllers/courseController').deleteCourse);

// Course content routes
router.post('/:id/sections', verifyJwt, verifyRoles('instructor'), require('../controllers/courseController').addSection);
router.put('/:id/sections/:sectionId', verifyJwt, verifyRoles('instructor'), require('../controllers/courseController').updateSection);
router.delete('/:id/sections/:sectionId', verifyJwt, verifyRoles('instructor'), require('../controllers/courseController').deleteSection);

// Course enrollment routes
router.post('/:id/enroll', verifyJwt, require('../controllers/courseController').enrollCourse);
router.post('/:id/unenroll', verifyJwt, require('../controllers/courseController').unenrollCourse);

// Course progress routes
router.post('/:id/sections/:sectionId/complete', verifyJwt, require('../controllers/courseController').completeSection);
router.post('/:id/sections/:sectionId/quiz/submit', verifyJwt, require('../controllers/courseController').submitQuiz);
router.post('/:id/complete', verifyJwt, require('../controllers/courseController').completeCourse);

// Quiz routes
router.put('/:id/sections/:sectionId/quiz', verifyJwt, require('../controllers/courseController').updateQuiz);

// Course retrieval routes
router.get('/', require('../controllers/courseController').getCourses);
router.get('/:id', require('../controllers/courseController').getCourse);
router.get('/:id/sections', require('../controllers/courseController').getSections);
router.get('/:id/progress', verifyJwt, require('../controllers/courseController').getProgress);

module.exports = router;