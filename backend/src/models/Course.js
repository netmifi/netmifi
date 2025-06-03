const mongoose = require('mongoose');
const { Schema } = mongoose;

// Quiz Question Schema
const quizQuestionSchema = new Schema({
  id: { type: String, required: true },
  text: { type: String, required: true },
  type: {
    type: String,
    required: true,
    enum: ['MULTIPLE_CHOICE', 'TRUE_FALSE']
  },
  options: [{ type: String, required: true }],
  correctAnswer: { type: Number, required: true },
  explanation: { type: String }
}, { _id: false });

// Quiz Schema
const quizSchema = new Schema({
  id: { type: String, required: true },
  title: { type: String, required: true },
  description: { type: String, required: true },
  passingScore: { type: Number, required: true, default: 70 },
  questions: [quizQuestionSchema]
}, { _id: false });

// Section Schema
const sectionSchema = new Schema({
  title: { type: String, required: true },
  type: {
    type: String,
    required: true,
    default: 'video',
    enum: ['video', 'audio', 'interactive', 'storytelling', 'quiz']
  },
  description: { type: String, required: false },
  video: { type: String, required: false }, // Will store the file path for video
  contentUrl: { type: String },
  duration: { type: Number, required: true }, // in minutes
  quiz: quizSchema,
  xpReward: { type: Number, default: 0 },
}, { _id: false });

// Course Schema
const courseSchema = new Schema({
  userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  title: { type: String, required: true },
  category: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, default: 0, required: true },
  oldPrice: { type: Number, required: false },
  mentorshipAvailability: { type: String, enum: ['yes', 'no'], default: 'no', required: false },
  mentorshipAvailabilityDays: { type: [String], required: false }, // array of days
  from: { type: String, required: false }, // Could store time as a string (e.g., '14:00')
  to: { type: String, required: false },

  // File uploads
  thumbnail: { type: String, required: true }, // Path to thumbnail file
  introVideo: { type: String, required: true }, // Path to intro video file
  slugUrl: { type: String, required: true },
  sections: [sectionSchema],

  enrolledUsers: [{
    userId: { type: Schema.Types.ObjectId, ref: 'User' },
    enrolledAt: { type: Date, default: Date.now },
    progress: { type: Number, default: 0 },
    currentSection: { type: Number, default: 0 },
    completedSections: [{ type: String }],
    quizScores: [{
      sectionId: { type: String },
      score: { type: Number },
      attempts: { type: Number, default: 0 },
      lastAttempt: { type: Date }
    }]
  }],
}, { timestamps: true });

// Indexes
courseSchema.index({
  title: 'text',
  description: 'text'
}, {
  weights: {
    title: 10,
    description: 3
  }
});

courseSchema.index({ title: 1 });
courseSchema.index({ price: 1 });

module.exports = mongoose.model('Course', courseSchema);
