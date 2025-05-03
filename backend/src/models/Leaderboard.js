const mongoose = require('mongoose');

const leaderboardEntrySchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  username: {
    type: String,
    required: true
  },
  profileImage: String,
  score: {
    type: Number,
    required: true,
    default: 0
  },
  level: {
    type: Number,
    required: true,
    default: 1
  },
  rank: {
    type: String,
    required: true,
    default: 'Beginner'
  },
  xp: {
    type: Number,
    required: true,
    default: 0
  },
  completedCourses: {
    type: Number,
    required: true,
    default: 0
  },
  quizAccuracy: {
    type: Number,
    required: true,
    default: 0
  },
  streak: {
    type: Number,
    required: true,
    default: 0
  },
  lastActive: {
    type: Date,
    required: true,
    default: Date.now
  }
});

const leaderboardSchema = new mongoose.Schema({
  type: {
    type: String,
    required: true,
    enum: ['global', 'course', 'weekly', 'monthly', 'achievement']
  },
  courseId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Course'
  },
  title: {
    type: String,
    required: true
  },
  description: String,
  entries: [leaderboardEntrySchema],
  status: {
    type: String,
    required: true,
    enum: ['active', 'archived', 'draft'],
    default: 'active'
  },
  startDate: {
    type: Date,
    default: Date.now
  },
  endDate: Date,
  resetFrequency: {
    type: String,
    enum: ['never', 'daily', 'weekly', 'monthly'],
    default: 'never'
  }
}, {
  timestamps: true
});

// Indexes for better query performance
leaderboardSchema.index({ type: 1, courseId: 1 });
leaderboardSchema.index({ 'entries.score': -1 });
leaderboardSchema.index({ status: 1 });

// Pre-save middleware to sort entries by score
leaderboardSchema.pre('save', function(next) {
  if (this.entries && this.entries.length > 0) {
    this.entries.sort((a, b) => b.score - a.score);
  }
  next();
});

const Leaderboard = mongoose.model('Leaderboard', leaderboardSchema);

module.exports = Leaderboard; 