const express = require('express');
const router = express.Router();
const leaderboardController = require('../controllers/leaderboardController');
const { protect, restrictTo } = require('../middleware/authMiddleware');
const {
  validateLeaderboardCreate,
  validateLeaderboardUpdate,
  validateLeaderboardEntry,
  validateLeaderboardParams,
  validateLeaderboardQuery
} = require('../middleware/leaderboardValidation');

// Public routes
router.get('/', validateLeaderboardQuery, leaderboardController.getLeaderboards);
router.get('/:leaderboardId', validateLeaderboardParams, leaderboardController.getLeaderboard);
router.get('/:leaderboardId/entries', validateLeaderboardParams, validateLeaderboardQuery, leaderboardController.getEntries);
router.get('/:leaderboardId/entries/:userId', validateLeaderboardParams, leaderboardController.getUserEntry);

// Protected routes
router.use(protect); // Apply authentication middleware to all routes below

// Leaderboard management routes (admin and instructor only)
router.post('/', restrictTo('admin', 'instructor'), validateLeaderboardCreate, leaderboardController.createLeaderboard);
router.patch('/:leaderboardId', restrictTo('admin', 'instructor'), validateLeaderboardParams, validateLeaderboardUpdate, leaderboardController.updateLeaderboard);
router.delete('/:leaderboardId', restrictTo('admin', 'instructor'), validateLeaderboardParams, leaderboardController.deleteLeaderboard);

// Entry management routes
router.post('/:leaderboardId/entries', validateLeaderboardParams, validateLeaderboardEntry, leaderboardController.addEntry);
router.delete('/:leaderboardId/entries/:userId', validateLeaderboardParams, leaderboardController.deleteEntry);

module.exports = router; 