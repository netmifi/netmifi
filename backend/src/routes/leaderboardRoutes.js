const express = require('express');
const router = express.Router();

// Validation Middlewares
const {
  validateLeaderboardCreate,
  validateLeaderboardUpdate,
  validateLeaderboardEntry,
  validateLeaderboardParams,
  validateLeaderboardQuery
} = require('../middlewares/leaderboardValidation');

// Destructure controller methods
const {
  getLeaderboards,
  getLeaderboard,
  getEntries,
  getUserEntry,
  createLeaderboard,
  updateLeaderboard,
  deleteLeaderboard,
  addEntry,
  deleteEntry
} = require('../controllers/leaderboardController');
const verifyRoles = require('../middlewares/verifyRole');

// Public routes
router.get(
  '/',
  validateLeaderboardQuery,
  getLeaderboards
);
router.get(
  '/:leaderboardId',
  validateLeaderboardParams,
  getLeaderboard
);
router.get(
  '/:leaderboardId/entries',
  validateLeaderboardParams,
  validateLeaderboardQuery,
  getEntries
);
router.get(
  '/:leaderboardId/entries/:userId',
  validateLeaderboardParams,
  getUserEntry
);

// Leaderboard management (admin & instructor)
router.post(
  '/',
  verifyRoles(['instructor', 'admin']),
  validateLeaderboardCreate,
  createLeaderboard
);
router.patch(
  '/:leaderboardId',
  verifyRoles(['instructor', 'admin']),
  validateLeaderboardParams,
  validateLeaderboardUpdate,
  updateLeaderboard
);
router.delete(
  '/:leaderboardId',
  verifyRoles(['instructor', 'admin']),
  validateLeaderboardParams,
  deleteLeaderboard
);

// Entry management routes
router.post(
  '/:leaderboardId/entries',
  validateLeaderboardParams,
  validateLeaderboardEntry,
  addEntry
);
router.delete(
  '/:leaderboardId/entries/:userId',
  validateLeaderboardParams,
  deleteEntry
);

module.exports = router;
