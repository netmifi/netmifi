const { NotFoundError, ValidationError } = require('../utils/errors');
const Leaderboard = require('../models/Leaderboard');
const LeaderboardEntry = require('../models/LeaderboardEntry');
const User = require('../models/User');
const Course = require('../models/Course');
const { AppError } = require('../utils/errorHandler');
const { catchAsync } = require('../utils/catchAsync');

// Create a new leaderboard
exports.createLeaderboard = catchAsync(async (req, res) => {
  const { title, description, type, settings } = req.body;
  
  const leaderboard = await Leaderboard.create({
    title,
    description,
    type,
    settings,
    createdBy: req.user.id
  });

  res.status(201).json({
    status: 'success',
    data: { leaderboard }
  });
});

// Get all leaderboards
exports.getLeaderboards = catchAsync(async (req, res) => {
  const leaderboards = await Leaderboard.find()
    .populate('createdBy', 'name email')
    .sort('-createdAt');

  res.status(200).json({
    status: 'success',
    results: leaderboards.length,
    data: { leaderboards }
  });
});

// Get a single leaderboard
exports.getLeaderboard = catchAsync(async (req, res) => {
  const leaderboard = await Leaderboard.findById(req.params.leaderboardId)
    .populate('createdBy', 'name email');

  if (!leaderboard) {
    throw new AppError('Leaderboard not found', 404);
  }

  res.status(200).json({
    status: 'success',
    data: { leaderboard }
  });
});

// Update a leaderboard
exports.updateLeaderboard = catchAsync(async (req, res) => {
  const leaderboard = await Leaderboard.findById(req.params.leaderboardId);

  if (!leaderboard) {
    throw new AppError('Leaderboard not found', 404);
  }

  // Check if user has permission to update
  if (leaderboard.createdBy.toString() !== req.user.id && req.user.role !== 'admin') {
    throw new AppError('You do not have permission to update this leaderboard', 403);
  }

  Object.assign(leaderboard, req.body);
  await leaderboard.save();

  res.status(200).json({
    status: 'success',
    data: { leaderboard }
  });
});

// Delete a leaderboard
exports.deleteLeaderboard = catchAsync(async (req, res) => {
  const leaderboard = await Leaderboard.findById(req.params.leaderboardId);

  if (!leaderboard) {
    throw new AppError('Leaderboard not found', 404);
  }

  // Check if user has permission to delete
  if (leaderboard.createdBy.toString() !== req.user.id && req.user.role !== 'admin') {
    throw new AppError('You do not have permission to delete this leaderboard', 403);
  }

  // Delete all entries associated with this leaderboard
  await LeaderboardEntry.deleteMany({ leaderboard: req.params.leaderboardId });
  await leaderboard.remove();

  res.status(204).json({
    status: 'success',
    data: null
  });
});

// Add an entry to a leaderboard
exports.addEntry = catchAsync(async (req, res) => {
  const { leaderboardId } = req.params;
  const { score, metadata } = req.body;

  // Check if leaderboard exists
  const leaderboard = await Leaderboard.findById(leaderboardId);
  if (!leaderboard) {
    throw new AppError('Leaderboard not found', 404);
  }

  // Check if entry already exists
  let entry = await LeaderboardEntry.findOne({
    leaderboard: leaderboardId,
    user: req.user.id
  });

  if (entry) {
    // Update existing entry if new score is higher
    if (score > entry.score) {
      entry.score = score;
      entry.metadata = metadata;
      entry.updatedAt = Date.now();
      await entry.save();
    }
  } else {
    // Create new entry
    entry = await LeaderboardEntry.create({
      leaderboard: leaderboardId,
      user: req.user.id,
      score,
      metadata
    });
  }

  res.status(200).json({
    status: 'success',
    data: { entry }
  });
});

// Get leaderboard entries
exports.getEntries = catchAsync(async (req, res) => {
  const { leaderboardId } = req.params;
  const { page = 1, limit = 10, sort = '-score' } = req.query;

  // Check if leaderboard exists
  const leaderboard = await Leaderboard.findById(leaderboardId);
  if (!leaderboard) {
    throw new AppError('Leaderboard not found', 404);
  }

  const entries = await LeaderboardEntry.find({ leaderboard: leaderboardId })
    .populate('user', 'name email')
    .sort(sort)
    .skip((page - 1) * limit)
    .limit(parseInt(limit));

  const total = await LeaderboardEntry.countDocuments({ leaderboard: leaderboardId });

  res.status(200).json({
    status: 'success',
    results: entries.length,
    total,
    data: { entries }
  });
});

// Get user's entry
exports.getUserEntry = catchAsync(async (req, res) => {
  const { leaderboardId, userId } = req.params;

  const entry = await LeaderboardEntry.findOne({
    leaderboard: leaderboardId,
    user: userId
  }).populate('user', 'name email');

  if (!entry) {
    throw new AppError('Entry not found', 404);
  }

  res.status(200).json({
    status: 'success',
    data: { entry }
  });
});

// Delete an entry
exports.deleteEntry = catchAsync(async (req, res) => {
  const { leaderboardId, userId } = req.params;

  const entry = await LeaderboardEntry.findOne({
    leaderboard: leaderboardId,
    user: userId
  });

  if (!entry) {
    throw new AppError('Entry not found', 404);
  }

  // Check if user has permission to delete
  const leaderboard = await Leaderboard.findById(leaderboardId);
  if (leaderboard.createdBy.toString() !== req.user.id && req.user.role !== 'admin') {
    throw new AppError('You do not have permission to delete this entry', 403);
  }

  await entry.remove();

  res.status(204).json({
    status: 'success',
    data: null
  });
});

// Leaderboard Retrieval
exports.getLeaderboards = async (req, res) => {
  try {
    const { type, courseId, status } = req.query;
const { NotFoundError, ValidationError } = require('../utils/errors');
const Leaderboard = require('../models/Leaderboard');
const LeaderboardEntry = require('../models/LeaderboardEntry');
const User = require('../models/User');
const Course = require('../models/Course');

// Create a new leaderboard
exports.createLeaderboard = async (req, res) => {
  const { title, description, type, settings } = req.body;
  
  const leaderboard = await Leaderboard.create({
    title,
    description,
    type,
    settings,
    createdBy: req.user.id
  });

  res.status(201).json({
    status: 'success',
    data: leaderboard
  });
};

// Get all leaderboards
exports.getLeaderboards = async (req, res) => {
  const leaderboards = await Leaderboard.find()
    .populate('createdBy', 'name email')
    .sort('-createdAt');

  res.status(200).json({
    status: 'success',
    results: leaderboards.length,
    data: leaderboards
  });
};

// Get a single leaderboard
exports.getLeaderboard = async (req, res) => {
  const leaderboard = await Leaderboard.findById(req.params.leaderboardId)
    .populate('createdBy', 'name email');

  if (!leaderboard) {
    throw new NotFoundError('Leaderboard not found');
  }

  res.status(200).json({
    status: 'success',
    data: leaderboard
  });
};

// Update a leaderboard
exports.updateLeaderboard = async (req, res) => {
  const leaderboard = await Leaderboard.findById(req.params.leaderboardId);

  if (!leaderboard) {
    throw new NotFoundError('Leaderboard not found');
  }

  // Check if user is the creator
  if (leaderboard.createdBy.toString() !== req.user.id) {
    throw new ValidationError('You can only update leaderboards you created');
  }

  const updatedLeaderboard = await Leaderboard.findByIdAndUpdate(
    req.params.leaderboardId,
    req.body,
    { new: true, runValidators: true }
  );

  res.status(200).json({
    status: 'success',
    data: updatedLeaderboard
  });
};

// Delete a leaderboard
exports.deleteLeaderboard = async (req, res) => {
  const leaderboard = await Leaderboard.findById(req.params.leaderboardId);

  if (!leaderboard) {
    throw new NotFoundError('Leaderboard not found');
  }

  // Check if user is the creator
  if (leaderboard.createdBy.toString() !== req.user.id) {
    throw new ValidationError('You can only delete leaderboards you created');
  }

  await leaderboard.remove();

  res.status(204).json({
    status: 'success',
    data: null
  });
};

// Add an entry to a leaderboard
exports.addEntry = async (req, res) => {
  const { userId, score, metadata } = req.body;
  const leaderboard = await Leaderboard.findById(req.params.leaderboardId);

  if (!leaderboard) {
    throw new NotFoundError('Leaderboard not found');
  }

  // Check if leaderboard is active
  if (leaderboard.settings?.time?.endDate && new Date(leaderboard.settings.time.endDate) < new Date()) {
    throw new ValidationError('This leaderboard has ended');
  }

  // Create or update entry
  const entry = await LeaderboardEntry.findOneAndUpdate(
    { leaderboard: req.params.leaderboardId, user: userId },
    { score, metadata },
    { new: true, upsert: true }
  );

  res.status(201).json({
    status: 'success',
    data: entry
  });
};

// Get leaderboard entries
exports.getEntries = async (req, res) => {
  const { leaderboardId } = req.params;
  const { limit = 10, page = 1 } = req.query;

  const leaderboard = await Leaderboard.findById(leaderboardId);
  if (!leaderboard) {
    throw new NotFoundError('Leaderboard not found');
  }

  const entries = await LeaderboardEntry.find({ leaderboard: leaderboardId })
    .populate('user', 'name email')
    .sort({ score: -1 })
    .skip((page - 1) * limit)
    .limit(parseInt(limit));

  const total = await LeaderboardEntry.countDocuments({ leaderboard: leaderboardId });

  res.status(200).json({
    status: 'success',
    results: entries.length,
    total,
    data: entries
  });
};

// Get user's entry
exports.getUserEntry = async (req, res) => {
  const { leaderboardId, userId } = req.params;

  const entry = await LeaderboardEntry.findOne({
    leaderboard: leaderboardId,
    user: userId
  }).populate('user', 'name email');

  if (!entry) {
    throw new NotFoundError('Entry not found');
  }

  res.status(200).json({
    status: 'success',
    data: entry
  });
};

// Delete an entry
exports.deleteEntry = async (req, res) => {
  const { leaderboardId, userId } = req.params;

  const leaderboard = await Leaderboard.findById(leaderboardId);
  if (!leaderboard) {
    throw new NotFoundError('Leaderboard not found');
  }

  // Check if user is the creator
  if (leaderboard.createdBy.toString() !== req.user.id) {
    throw new ValidationError('You can only delete entries from leaderboards you created');
  }

  const entry = await LeaderboardEntry.findOneAndDelete({
    leaderboard: leaderboardId,
    user: userId
  });

  if (!entry) {
    throw new NotFoundError('Entry not found');
  }

  res.status(204).json({
    status: 'success',
    data: null
  });
};

// Leaderboard Retrieval
exports.getLeaderboards = async (req, res) => {
  try {
    const { type, courseId, status } = req.query;
    const query = {};
    if (type) query.type = type;
    if (courseId) query.courseId = courseId;
    if (status) query.status = status;

    const leaderboards = await Leaderboard.find(query)
      .populate('courseId', 'title thumbnail')
      .sort('-createdAt');
    res.json(leaderboards);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.getTopEntries = async (req, res) => {
  try {
    const { limit = 10 } = req.query;
    const leaderboard = await Leaderboard.findById(req.params.id);
    if (!leaderboard) {
      return res.status(404).json({ message: 'Leaderboard not found' });
    }

    const topEntries = leaderboard.entries
      .sort((a, b) => b.score - a.score)
      .slice(0, parseInt(limit));

    res.json(topEntries);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.getUserRank = async (req, res) => {
  try {
    const leaderboard = await Leaderboard.findById(req.params.id);
    if (!leaderboard) {
      return res.status(404).json({ message: 'Leaderboard not found' });
    }

    const entryIndex = leaderboard.entries.findIndex(
      entry => entry.userId.toString() === req.params.userId
    );

    if (entryIndex === -1) {
      return res.status(404).json({ message: 'User not found in leaderboard' });
    }

    const rank = entryIndex + 1;
    const totalEntries = leaderboard.entries.length;
    const percentile = ((totalEntries - rank) / totalEntries) * 100;

    res.json({
      rank,
      totalEntries,
      percentile: Math.round(percentile * 100) / 100,
      entry: leaderboard.entries[entryIndex]
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Helper Functions
function calculateQuizAccuracy(user) {
  let totalQuizzes = 0;
  let totalScore = 0;

  user.enrolledCourses.forEach(course => {
    course.quizScores.forEach(quiz => {
      totalQuizzes++;
      totalScore += quiz.score;
    });
  });

  return totalQuizzes > 0 ? totalScore / totalQuizzes : 0;
}

function calculateStreak(user) {
  // Implement streak calculation logic based on user's activity
  return 0; // Placeholder
}

// Get all leaderboards
exports.getAllLeaderboards = async (req, res) => {
  try {
    const leaderboards = await Leaderboard.find()
      .select('title type status startDate endDate')
      .sort({ createdAt: -1 });
    
    res.json(leaderboards);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching leaderboards' });
  }
};

// Get specific leaderboard
exports.getLeaderboard = async (req, res) => {
  try {
    const leaderboard = await Leaderboard.findById(req.params.id);
    if (!leaderboard) {
      throw new NotFoundError('Leaderboard not found');
    }
    res.json(leaderboard);
  } catch (error) {
    if (error instanceof NotFoundError) {
      res.status(404).json({ error: error.message });
    } else {
      res.status(500).json({ error: 'Error fetching leaderboard' });
    }
  }
};

// Get top entries
exports.getTopEntries = async (req, res) => {
  try {
    const { limit = 10 } = req.query;
    const leaderboard = await Leaderboard.findById(req.params.id);
    
    if (!leaderboard) {
      throw new NotFoundError('Leaderboard not found');
    }
    
    const topEntries = leaderboard.entries
      .sort((a, b) => b.score - a.score)
      .slice(0, parseInt(limit));
    
    res.json(topEntries);
  } catch (error) {
    if (error instanceof NotFoundError) {
      res.status(404).json({ error: error.message });
    } else {
      res.status(500).json({ error: 'Error fetching top entries' });
    }
  }
};

// Get user's rank
exports.getUserRank = async (req, res) => {
  try {
    const leaderboard = await Leaderboard.findById(req.params.id);
    
    if (!leaderboard) {
      throw new NotFoundError('Leaderboard not found');
    }
    
    const userEntry = leaderboard.entries.find(
      entry => entry.userId.toString() === req.params.userId
    );
    
    if (!userEntry) {
      throw new NotFoundError('User not found in leaderboard');
    }
    
    const rank = leaderboard.entries
      .sort((a, b) => b.score - a.score)
      .findIndex(entry => entry.userId.toString() === req.params.userId) + 1;
    
    res.json({
      rank,
      entry: userEntry
    });
  } catch (error) {
    if (error instanceof NotFoundError) {
      res.status(404).json({ error: error.message });
    } else {
      res.status(500).json({ error: 'Error fetching user rank' });
    }
  }
};

// Create course leaderboard
exports.createCourseLeaderboard = async (req, res) => {
  try {
    const { courseId } = req.params;
    const leaderboardData = {
      ...req.body,
      type: 'course',
      courseId
    };
    
    const leaderboard = new Leaderboard(leaderboardData);
    await leaderboard.save();
    
    res.status(201).json(leaderboard);
  } catch (error) {
    res.status(500).json({ error: 'Error creating leaderboard' });
  }
};

// Update leaderboard
exports.updateLeaderboard = async (req, res) => {
  try {
    const leaderboard = await Leaderboard.findById(req.params.id);
    
    if (!leaderboard) {
      throw new NotFoundError('Leaderboard not found');
    }
    
    Object.assign(leaderboard, req.body);
    await leaderboard.save();
    
    res.json(leaderboard);
  } catch (error) {
    if (error instanceof NotFoundError) {
      res.status(404).json({ error: error.message });
    } else {
      res.status(500).json({ error: 'Error updating leaderboard' });
    }
  }
};

// Delete leaderboard
exports.deleteLeaderboard = async (req, res) => {
  try {
    const leaderboard = await Leaderboard.findById(req.params.id);
    
    if (!leaderboard) {
      throw new NotFoundError('Leaderboard not found');
    }
    
    await leaderboard.remove();
    res.status(204).send();
  } catch (error) {
    if (error instanceof NotFoundError) {
      res.status(404).json({ error: error.message });
    } else {
      res.status(500).json({ error: 'Error deleting leaderboard' });
    }
  }
};

// Add entry
exports.addEntry = async (req, res) => {
  try {
    const leaderboard = await Leaderboard.findById(req.params.id);
    
    if (!leaderboard) {
      throw new NotFoundError('Leaderboard not found');
    }
    
    const existingEntry = leaderboard.entries.find(
      entry => entry.userId.toString() === req.body.userId
    );
    
    if (existingEntry) {
      throw new ValidationError('Entry already exists for this user');
    }
    
    leaderboard.entries.push(req.body);
    await leaderboard.save();
    
    res.status(201).json(leaderboard);
  } catch (error) {
    if (error instanceof NotFoundError) {
      res.status(404).json({ error: error.message });
    } else if (error instanceof ValidationError) {
      res.status(400).json({ error: error.message });
    } else {
      res.status(500).json({ error: 'Error adding entry' });
    }
  }
};

// Update entry
exports.updateEntry = async (req, res) => {
  try {
    const leaderboard = await Leaderboard.findById(req.params.id);
    
    if (!leaderboard) {
      throw new NotFoundError('Leaderboard not found');
    }
    
    const entryIndex = leaderboard.entries.findIndex(
      entry => entry.userId.toString() === req.params.userId
    );
    
    if (entryIndex === -1) {
      throw new NotFoundError('Entry not found');
    }
    
    leaderboard.entries[entryIndex] = {
      ...leaderboard.entries[entryIndex],
      ...req.body
    };
    
    await leaderboard.save();
    res.json(leaderboard);
  } catch (error) {
    if (error instanceof NotFoundError) {
      res.status(404).json({ error: error.message });
    } else {
      res.status(500).json({ error: 'Error updating entry' });
    }
  }
};

// Remove entry
exports.removeEntry = async (req, res) => {
  try {
    const leaderboard = await Leaderboard.findById(req.params.id);
    
    if (!leaderboard) {
      throw new NotFoundError('Leaderboard not found');
    }
    
    const entryIndex = leaderboard.entries.findIndex(
      entry => entry.userId.toString() === req.params.userId
    );
    
    if (entryIndex === -1) {
      throw new NotFoundError('Entry not found');
    }
    
    leaderboard.entries.splice(entryIndex, 1);
    await leaderboard.save();
    
    res.status(204).send();
  } catch (error) {
    if (error instanceof NotFoundError) {
      res.status(404).json({ error: error.message });
    } else {
      res.status(500).json({ error: 'Error removing entry' });
    }
  }
}; 