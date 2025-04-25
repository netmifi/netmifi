const mongoose = require('mongoose');
const { Schema } = mongoose;

// Quiz Schema
const quizSchema = new Schema({
  question: { type: String, required: true },
  options: [{ type: String, required: true }],
  correctAnswer: { type: String, required: true },
  explanation: { type: String, required: true },
  points: { type: Number, default: 10 }
}, { _id: false });

// Section Schema
const sectionSchema = new Schema({
  id: { type: String, required: true },
  title: { type: String, required: true },
  type: { 
    type: String, 
    required: true,
    enum: ['video', 'audio', 'interactive', 'storytelling']
  },
  contentUrl: { type: String, required: true },
  description: { type: String, required: true },
  duration: { type: Number, required: true }, // in minutes
  quizzes: [quizSchema],
  xpReward: { type: Number, default: 0 },
  order: { type: Number, required: true }
}, { _id: false });

// Course Schema
const courseSchema = new Schema(
  {
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    title: { type: String, required: true },
    category: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    oldPrice: { type: Number, required: false },
    thumbnail: { type: String, required: true },
    slugUrl: { type: String, required: true, unique: true },
    sections: [sectionSchema],
    tags: [{ type: String }],
    difficulty: { 
      type: String, 
      required: true,
      enum: ['beginner', 'intermediate', 'advanced']
    },
    totalXp: { type: Number, default: 0 },
    estimatedDuration: { type: Number, required: true }, // in minutes
    status: { 
      type: String, 
      default: 'draft',
      enum: ['draft', 'published', 'archived']
    },
    enrolledUsers: [{
      userId: { type: Schema.Types.ObjectId, ref: 'User' },
      progress: { type: Number, default: 0 },
      currentSection: { type: Number, default: 0 },
      completedSections: [{ type: Number }],
      quizScores: [{
        sectionId: String,
        score: Number,
        attempts: Number,
        lastAttempt: Date
      }],
      enrolledAt: { type: Date, default: Date.now }
    }]
  },
  {
    toJSON: {
      transform: function (doc, ret) {
        ret.id = ret._id;
        delete ret._id;
      }
    },
    toObject: {
      transform: function (doc, ret) {
        ret.id = ret._id;
        delete ret._id;
      }
    },
    timestamps: true
  }
);

// Indexes
courseSchema.index({ 
  title: 'text', 
  category: 'text',
  description: 'text',
  tags: 'text'
}, {
  weights: {
    title: 10,
    category: 5,
    description: 3,
    tags: 5
  }
});

courseSchema.index({ title: 1 });
courseSchema.index({ category: 1 });
courseSchema.index({ status: 1 });
courseSchema.index({ slugUrl: 1 }, { unique: true });

module.exports = mongoose.model('Course', courseSchema);
