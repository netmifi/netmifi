const express = require('express');
const router = express.Router();
const verifyJwt = require('../middlewares/verifyJwt');
const verifyRoles = require('../middlewares/verifyRole');

// Destructure all user controller methods
const {
    getProfile,
    updateProfile,
    updatePassword,
    changeTheme,
    getProgress,
    getCourseProgress,
    repeatCourse,
    promoteUser,
    demoteUser,
    searchUsers,
    getLeaderboard,
    getAchievements,
    updateUserXP
} = require('../controllers/userController');

// User profile routes
router.get(
    '/profile',
    verifyJwt('strict'),
    getProfile
);
router.put(
    '/profile',
    verifyJwt('strict'),
    updateProfile
);
router.put(
    '/update-password',
    verifyJwt('strict'),
    updatePassword
);
router.post(
    '/change-theme',
    verifyJwt('strict'),
    changeTheme
);

// User progress routes
router.get(
    '/progress',
    verifyJwt('strict'),
    getProgress
);
router.get(
    '/progress/:courseId',
    verifyJwt('strict'),
    getCourseProgress
);
router.post(
    '/progress/:courseId/repeat',
    verifyJwt('strict'),
    repeatCourse
);

// User level management routes
router.post(
    '/promote',
    verifyJwt('strict'),
    verifyRoles('admin'),
    promoteUser
);
router.post(
    '/demote',
    verifyJwt('strict'),
    verifyRoles('admin'),
    demoteUser
);

// User search and discovery routes
router.get(
    '/search',
    searchUsers
);
router.get(
    '/leaderboard',
    getLeaderboard
);
router.get(
    '/achievements',
    verifyJwt('strict'),
    getAchievements
);

// Update user XP
router.post(
    '/xp',
    updateUserXP
);

module.exports = router;
