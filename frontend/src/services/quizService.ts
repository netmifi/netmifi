import { api } from './api';
import { Quiz } from '@/types/course';

export const quizService = {
  submitQuiz: async (courseId: string, sectionId: string, answers: number[]) => {
    const response = await api.post(`/courses/${courseId}/sections/${sectionId}/quiz/submit`, {
      answers
    });
    return response.data;
  },

  updateQuiz: async (courseId: string, sectionId: string, quiz: Quiz) => {
    const response = await api.put(`/courses/${courseId}/sections/${sectionId}/quiz`, quiz);
    return response.data;
  }
}; 