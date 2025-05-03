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
  id: string;
  text: string;
  type: QuestionType;
  options: string[];
  correctAnswer: number;
  explanation?: string;
}

export interface Quiz {
  id: string;
  title: string;
  description: string;
  passingScore: number;
  questions: QuizQuestion[];
}

export interface Section {
  id: string;
  title: string;
  description: string;
  contentType: ContentType;
  content: {
    videoUrl?: string;
    audioUrl?: string;
    storyContent?: string;
    quiz?: Quiz;
  };
  order: number;
  xpReward: number;
  isPublished: boolean;
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

export interface Course {
  id: string;
  title: string;
  description: string;
  instructor: string;
  price: number;
  sections: CourseSection[];
  createdAt: string;
  updatedAt: string;
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