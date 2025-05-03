import mongoose, { Schema, Document } from 'mongoose';

export interface IQuizQuestion {
  question: string;
  options: string[];
  correctAnswer: string;
}

export interface ISection {
  id: string;
  title: string;
  type: 'text' | 'video' | 'quiz';
  content?: string;
  videoUrl?: string;
  quizQuestions?: IQuizQuestion[];
  duration?: number;
  order: number;
}

export interface IStudentProgress {
  userId: string;
  completedSections: string[];
  quizScores: Record<string, number>;
  lastAccessed: Date;
  totalTimeSpent: number;
  completionPercentage: number;
}

export interface ICourseAnalytics {
  totalEnrollments: number;
  activeStudents: number;
  averageCompletionRate: number;
  averageRating: number;
  totalRevenue: number;
  studentEngagement: {
    averageTimeSpent: number;
    averageQuizScore: number;
    completionRateBySection: Record<string, number>;
  };
}

export interface ICourse extends Document {
  title: string;
  description: string;
  category: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  targetAudience: string[];
  prerequisites: string[];
  sections: ISection[];
  thumbnail: string;
  instructor: mongoose.Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
  status: 'draft' | 'published' | 'archived';
  rating: number;
  reviews: Array<{
    user: mongoose.Types.ObjectId;
    rating: number;
    comment: string;
    createdAt: Date;
  }>;
  price: number;
  isFree: boolean;
  estimatedDuration: number;
  studentProgress: IStudentProgress[];
  analytics: ICourseAnalytics;
  enrollmentCount: number;
  lastEnrollmentDate: Date;
  tags: string[];
  requirements: string[];
  learningObjectives: string[];
  certificateTemplate?: string;
  maxEnrollments?: number;
  startDate?: Date;
  endDate?: Date;
  schedule?: {
    type: 'self-paced' | 'scheduled';
    sessions?: Array<{
      date: Date;
      duration: number;
      title: string;
      description: string;
    }>;
  };
}

const CourseSchema: Schema = new Schema({
  title: { type: String, required: true, trim: true },
  description: { type: String, required: true },
  category: { type: String, required: true },
  difficulty: {
    type: String,
    enum: ['beginner', 'intermediate', 'advanced'],
    required: true,
  },
  targetAudience: [{ type: String }],
  prerequisites: [{ type: String }],
  sections: [{
    id: { type: String, required: true },
    title: { type: String, required: true },
    type: { type: String, enum: ['text', 'video', 'quiz'], required: true },
    content: { type: String },
    videoUrl: { type: String },
    quizQuestions: [{
      question: { type: String, required: true },
      options: [{ type: String }],
      correctAnswer: { type: String, required: true }
    }],
    duration: { type: Number },
    order: { type: Number, required: true }
  }],
  thumbnail: { type: String },
  instructor: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  status: {
    type: String,
    enum: ['draft', 'published', 'archived'],
    default: 'draft',
  },
  rating: { type: Number, default: 0 },
  reviews: [{
    user: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    rating: { type: Number, required: true, min: 1, max: 5 },
    comment: { type: String },
    createdAt: { type: Date, default: Date.now }
  }],
  price: { type: Number, default: 0 },
  isFree: { type: Boolean, default: false },
  estimatedDuration: { type: Number, required: true },
  studentProgress: [{
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    completedSections: [{ type: String }],
    quizScores: { type: Map, of: Number },
    lastAccessed: { type: Date, default: Date.now },
    totalTimeSpent: { type: Number, default: 0 },
    completionPercentage: { type: Number, default: 0 }
  }],
  analytics: {
    totalEnrollments: { type: Number, default: 0 },
    activeStudents: { type: Number, default: 0 },
    averageCompletionRate: { type: Number, default: 0 },
    averageRating: { type: Number, default: 0 },
    totalRevenue: { type: Number, default: 0 },
    studentEngagement: {
      averageTimeSpent: { type: Number, default: 0 },
      averageQuizScore: { type: Number, default: 0 },
      completionRateBySection: { type: Map, of: Number }
    }
  },
  enrollmentCount: { type: Number, default: 0 },
  lastEnrollmentDate: { type: Date },
  tags: [{ type: String }],
  requirements: [{ type: String }],
  learningObjectives: [{ type: String }],
  certificateTemplate: { type: String },
  maxEnrollments: { type: Number },
  startDate: { type: Date },
  endDate: { type: Date },
  schedule: {
    type: { type: String, enum: ['self-paced', 'scheduled'] },
    sessions: [{
      date: { type: Date },
      duration: { type: Number },
      title: { type: String },
      description: { type: String }
    }]
  }
}, {
  timestamps: true,
});

// Indexes for better query performance
CourseSchema.index({ title: 'text', description: 'text' });
CourseSchema.index({ category: 1 });
CourseSchema.index({ difficulty: 1 });
CourseSchema.index({ instructor: 1 });
CourseSchema.index({ status: 1 });
CourseSchema.index({ tags: 1 });
CourseSchema.index({ 'schedule.sessions.date': 1 });

export default mongoose.model<ICourse>('Course', CourseSchema); 