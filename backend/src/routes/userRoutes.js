const express = require('express');
const router = express.Router();
const verifyJwt = require('../middlewares/verifyJwt');
const verifyRoles = require('../middlewares/verifyRole');
const authMiddleware = require('../middlewares/authMiddleware');

// User profile routes
router.get('/profile', verifyJwt, require('../controllers/userController').getProfile);
router.put('/profile', verifyJwt, require('../controllers/userController').updateProfile);
router.put('/password', verifyJwt, require('../controllers/userController').updatePassword);
router.put('/theme', verifyJwt, require('../controllers/userController').updateTheme);

// User progress routes
router.get('/progress', verifyJwt, require('../controllers/userController').getProgress);
router.get('/progress/:courseId', verifyJwt, require('../controllers/userController').getCourseProgress);
router.post('/progress/:courseId/repeat', verifyJwt, require('../controllers/userController').repeatCourse);

// User level management routes
router.post('/promote', verifyJwt, verifyRoles('admin'), require('../controllers/userController').promoteUser);
router.post('/demote', verifyJwt, verifyRoles('admin'), require('../controllers/userController').demoteUser);

// User search and discovery routes
router.get('/search', require('../controllers/userController').searchUsers);
router.get('/leaderboard', require('../controllers/userController').getLeaderboard);
router.get('/achievements', verifyJwt, require('../controllers/userController').getAchievements);

// Protected routes
router.use(authMiddleware);

// Update user XP
router.post('/xp', require('../controllers/userController').updateUserXP);

module.exports = router;