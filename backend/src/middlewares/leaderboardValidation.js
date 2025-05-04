const { body, param, query } = require('express-validator');
const { validateRequest } = require('./validationMiddleware');

// Validation for creating a leaderboard
const validateLeaderboardCreate = [
  body('title')
    .trim()
    .notEmpty()
    .withMessage('Title is required')
    .isLength({ min: 3, max: 100 })
    .withMessage('Title must be between 3 and 100 characters'),
  
  body('description')
    .optional()
    .trim()
    .isLength({ max: 500 })
    .withMessage('Description must not exceed 500 characters'),
  
  body('type')
    .isIn(['course', 'global', 'custom'])
    .withMessage('Invalid leaderboard type'),
  
  body('settings')
    .optional()
    .isObject()
    .withMessage('Settings must be an object'),
  
  body('settings.startDate')
    .optional()
    .isISO8601()
    .withMessage('Start date must be a valid date'),
  
  body('settings.endDate')
    .optional()
    .isISO8601()
    .withMessage('End date must be a valid date')
    .custom((value, { req }) => {
      if (req.body.settings?.startDate && new Date(value) <= new Date(req.body.settings.startDate)) {
        throw new Error('End date must be after start date');
      }
      return true;
    }),
  
  body('settings.displayOptions')
    .optional()
    .isObject()
    .withMessage('Display options must be an object'),
  
  validateRequest
];

// Validation for updating a leaderboard
const validateLeaderboardUpdate = [
  param('leaderboardId')
    .isMongoId()
    .withMessage('Invalid leaderboard ID'),
  
  body('title')
    .optional()
    .trim()
    .isLength({ min: 3, max: 100 })
    .withMessage('Title must be between 3 and 100 characters'),
  
  body('description')
    .optional()
    .trim()
    .isLength({ max: 500 })
    .withMessage('Description must not exceed 500 characters'),
  
  body('type')
    .optional()
    .isIn(['course', 'global', 'custom'])
    .withMessage('Invalid leaderboard type'),
  
  body('settings')
    .optional()
    .isObject()
    .withMessage('Settings must be an object'),
  
  body('settings.startDate')
    .optional()
    .isISO8601()
    .withMessage('Start date must be a valid date'),
  
  body('settings.endDate')
    .optional()
    .isISO8601()
    .withMessage('End date must be a valid date')
    .custom((value, { req }) => {
      if (req.body.settings?.startDate && new Date(value) <= new Date(req.body.settings.startDate)) {
        throw new Error('End date must be after start date');
      }
      return true;
    }),
  
  validateRequest
];

// Validation for leaderboard entry
const validateLeaderboardEntry = [
  param('leaderboardId')
    .isMongoId()
    .withMessage('Invalid leaderboard ID'),
  
  body('score')
    .isNumeric()
    .withMessage('Score must be a number'),
  
  body('metadata')
    .optional()
    .isObject()
    .withMessage('Metadata must be an object'),
  
  validateRequest
];

// Validation for leaderboard parameters
const validateLeaderboardParams = [
  param('leaderboardId')
    .isMongoId()
    .withMessage('Invalid leaderboard ID'),
  
  param('userId')
    .isMongoId()
    .withMessage('Invalid user ID'),
  
  validateRequest
];

// Validation for query parameters
const validateLeaderboardQuery = [
  query('page')
    .optional()
    .isInt({ min: 1 })
    .withMessage('Page must be a positive integer'),
  
  query('limit')
    .optional()
    .isInt({ min: 1, max: 100 })
    .withMessage('Limit must be between 1 and 100'),
  
  query('sort')
    .optional()
    .isIn(['score', '-score', 'createdAt', '-createdAt'])
    .withMessage('Invalid sort parameter'),
  
  validateRequest
];

module.exports = {
  validateLeaderboardCreate,
  validateLeaderboardUpdate,
  validateLeaderboardEntry,
  validateLeaderboardParams,
  validateLeaderboardQuery
}; 