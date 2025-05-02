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
  id: { type: String, required: true },
  title: { type: String, required: true },
  type: { 
    type: String, 
    required: true,
    enum: ['video', 'audio', 'interactive', 'storytelling', 'quiz']
  },
  contentUrl: { type: String },
  description: { type: String, required: true },
  duration: { type: Number, required: true }, // in minutes
  quiz: quizSchema,
  xpReward: { type: Number, default: 0 },
  order: { type: Number, required: true }
}, { _id: false });

// Course Schema
const courseSchema = new Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  instructor: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  thumbnail: { type: String },
  price: { type: Number, required: true },
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
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

// Update timestamps on save
courseSchema.pre('save', function(next) {
  this.updatedAt = Date.now();
  next();
});

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
