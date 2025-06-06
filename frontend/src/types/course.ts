export enum ContentType {
  VIDEO = 'VIDEO',
  AUDIO = 'AUDIO',
  STORY = 'STORY',
  QUIZ = 'QUIZ'
}

export enum QuestionType {
  MULTIPLE_CHOICE = 'MULTIPLE_CHOICE',
  TRUE_FALSE = 'TRUE_FALSE',
}

export interface QuizQuestion {
  question: string;
  options: string[];
  correctAnswer: number;
}

export interface Quiz {
  questions: QuizQuestion[];
}

export interface Section {
  _id: string;
  title: string;
  content: string;
  videoUrl?: string;
  duration?: number;
  order: number;
  quiz?: Quiz;
}

export interface CourseProgress {
  completedSections: string[];
  lastAccessed: Date;
  completed: boolean;
}

export interface CourseEnrollment {
  student: string;
  progress: CourseProgress;
}

export interface CourseReview {
  user: string;
  rating: number;
  comment: string;
  createdAt: Date;
}

export interface Course {
  _id: string;
  title: string;
  description: string;
  instructor: {
    _id: string;
    name: string;
    email: string;
  };
  category: string;
  price: number;
  thumbnail: string;
  sections: Section[];
  enrolledStudents: CourseEnrollment[];
  isPublished: boolean;
  isDisabled: boolean;
  rating: number;
  reviews: CourseReview[];
  xpReward: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface CourseListResponse {
  courses: Course[];
  total: number;
  page: number;
  totalPages: number;
}

export interface QuizSubmissionResponse {
  score: number;
  passed: boolean;
}

export interface CourseSection {
  id: string;
  title: string;
  order: number;
  content: {
    type: 'VIDEO' | 'QUIZ' | 'TEXT';
    data: any; // This will be either VideoContent, Quiz, or TextContent
  };
}

export interface VideoContent {
  id: string;
  title: string;
  description: string;
  url: string;
  duration: number;
}

export interface TextContent {
  id: string;
  title: string;
  content: string;
}

export interface CourseDraft extends Omit<Course, 'id' | 'createdAt' | 'updatedAt'> {
  id?: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface CourseCreationStep {
  id: string;
  title: string;
  description: string;
  isCompleted: boolean;
}

export interface CourseCreationState {
  currentStep: number;
  steps: CourseCreationStep[];
  draft: CourseDraft;
  isSaving: boolean;
  error: string | null;
} 