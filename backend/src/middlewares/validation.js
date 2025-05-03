const { body, param, validationResult } = require('express-validator');
const { ValidationError } = require('../utils/errors');

// Validation middleware
const validate = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
};

// Leaderboard validation rules6
const validateLeaderboard = {
  create: (req, res, next) => {
    const { title, type, status } = req.body;
    const errors = [];

    if (!title || typeof title !== 'string' || title.length < 3 || title.length > 100) {
      errors.push('Title must be between 3 and 100 characters');
    }

    if (!type || !['course', 'global'].includes(type)) {
      errors.push('Type must be either "course" or "global"');
    }

    if (status && !['active', 'inactive'].includes(status)) {
      errors.push('Status must be either "active" or "inactive"');
    }

    if (errors.length > 0) {
      throw new ValidationError(errors.join(', '));
    }

    next();
  },

  update: (req, res, next) => {
    const { title, type, status } = req.body;
    const errors = [];

    if (title && (typeof title !== 'string' || title.length < 3 || title.length > 100)) {
      errors.push('Title must be between 3 and 100 characters');
    }

    if (type && !['course', 'global'].includes(type)) {
      errors.push('Type must be either "course" or "global"');
    }

    if (status && !['active', 'inactive'].includes(status)) {
      errors.push('Status must be either "active" or "inactive"');
    }

    if (errors.length > 0) {
      throw new ValidationError(errors.join(', '));
    }

    next();
  }
};

// Entry validation rules
const validateEntry = {
  create: (req, res, next) => {
    const { userId, score, metadata } = req.body;
    const errors = [];

    if (!userId || typeof userId !== 'string') {
      errors.push('Valid userId is required');
    }

    if (typeof score !== 'number') {
      errors.push('Score must be a number');
    }

    if (metadata && typeof metadata !== 'object') {
      errors.push('Metadata must be an object');
    }

    if (errors.length > 0) {
      throw new ValidationError(errors.join(', '));
    }

    next();
  },

  update: (req, res, next) => {
    const { score, metadata } = req.body;
    const errors = [];

    if (score !== undefined && typeof score !== 'number') {
      errors.push('Score must be a number');
    }

    if (metadata !== undefined && typeof metadata !== 'object') {
      errors.push('Metadata must be an object');
    }

    if (errors.length > 0) {
      throw new ValidationError(errors.join(', '));
    }

    next();
  }
};

// Parameter validation rules
const validateLeaderboardId = [
  param('id')
    .isMongoId()
    .withMessage('Invalid leaderboard ID'),
  validate
];

const validateUserId = [
  param('userId')
    .isMongoId()
    .withMessage('Invalid user ID'),
  validate
];

const validateParams = {
  leaderboardId: (req, res, next) => {
    const { id } = req.params;
    if (!id || typeof id !== 'string') {
      throw new ValidationError('Valid leaderboard ID is required');
    }
    next();
  },

  leaderboardAndUserId: (req, res, next) => {
    const { id, userId } = req.params;
    const errors = [];

    if (!id || typeof id !== 'string') {
      errors.push('Valid leaderboard ID is required');
    }

    if (!userId || typeof userId !== 'string') {
      errors.push('Valid user ID is required');
    }

    if (errors.length > 0) {
      throw new ValidationError(errors.join(', '));
    }

    next();
  }
};

module.exports = {
  validateLeaderboard,
  validateEntry,
  validateLeaderboardId,
  validateUserId,
  validateParams
}; 