const express = require('express');
const router = express.Router();
const verifyJwt = require('../middlewares/verifyJwt');
const verifyRoles = require('../middlewares/verifyRole');

const {
    createCourse,
    updateCourse,
    deleteCourse,
    addSection,
    updateSection,
    deleteSection,
    enrollCourse,
    unenrollCourse,
    completeSection,
    submitQuiz,
    completeCourse,
    updateQuiz,
    getCourses,
    getCourse,
    getSections,
    getProgress
} = require('../controllers/courseController');

// Course management routes
router.post(
    '/create',
    verifyJwt('strict'),
    verifyRoles('instructor'),
    createCourse
);
router.put(
    '/:id',
    verifyJwt('strict'),
    verifyRoles('instructor'),
    updateCourse
);
router.delete(
    '/:id',
    verifyJwt('strict'),
    verifyRoles('instructor'),
    deleteCourse
);

// Course content routes
router.post(
    '/:id/sections',
    verifyJwt('strict'),
    verifyRoles('instructor'),
    addSection
);
router.put(
    '/:id/sections/:sectionId',
    verifyJwt('strict'),
    verifyRoles('instructor'),
    updateSection
);
router.delete(
    '/:id/sections/:sectionId',
    verifyJwt('strict'),
    verifyRoles('instructor'),
    deleteSection
);

// Course enrollment routes
router.post(
    '/:id/enroll',
    verifyJwt('strict'),
    enrollCourse
);
router.post(
    '/:id/unenroll',
    verifyJwt('strict'),
    unenrollCourse
);

// Course progress routes
router.post(
    '/:id/sections/:sectionId/complete',
    verifyJwt('strict'),
    completeSection
);
router.post(
    '/:id/sections/:sectionId/quiz/submit',
    verifyJwt('strict'),
    submitQuiz
);
router.post(
    '/:id/complete',
    verifyJwt('strict'),
    completeCourse
);

// Quiz routes
router.put(
    '/:id/sections/:sectionId/quiz',
    verifyJwt('strict'),
    updateQuiz
);

// Course retrieval routes
router.get(
    '/',
    getCourses
);
router.get(
    '/:id',
    getCourse
);
router.get(
    '/:id/sections',
    getSections
);
router.get(
    '/:id/progress',
    verifyJwt('strict'),
    getProgress
);

module.exports = router;
