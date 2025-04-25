import { useState } from 'react';
import { CourseProcessor } from '@/services/courseProcessor';
import { ProcessedCourse, LearningPreference } from '@/types';

export const useCourseProcessor = () => {
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [processedCourse, setProcessedCourse] = useState<ProcessedCourse | null>(null);

  const processCourse = async (videoUrl: string, learningPreference: LearningPreference) => {
    try {
      setIsProcessing(true);
      setError(null);

      const processor = new CourseProcessor(videoUrl, learningPreference);
      const course = await processor.processCourse();
      
      setProcessedCourse(course);
      return course;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'An error occurred while processing the course';
      setError(errorMessage);
      throw err;
    } finally {
      setIsProcessing(false);
    }
  };

  return {
    processCourse,
    isProcessing,
    error,
    processedCourse
  };
}; 