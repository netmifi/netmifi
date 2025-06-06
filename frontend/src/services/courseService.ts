import axios from 'axios';
import { Course, Section, Quiz, CourseProgress } from '../types/course';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000';

export const courseService = {
    // Get all courses
    async getCourses(params?: {
        category?: string;
        instructor?: string;
        search?: string;
        page?: number;
        limit?: number;
    }) {
        const response = await axios.get(`${API_URL}/courses`, { params });
        return response.data;
    },

    // Get a single course
    async getCourse(id: string) {
        const response = await axios.get(`${API_URL}/courses/${id}`);
        return response.data;
    },

    // Create a course
    async createCourse(courseData: Partial<Course>) {
        const response = await axios.post(`${API_URL}/courses/create`, courseData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        });
        return response.data;
    },

    // Update a course
    async updateCourse(id: string, courseData: Partial<Course>) {
        const response = await axios.put(`${API_URL}/courses/${id}`, courseData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        });
        return response.data;
    },

    // Delete a course (soft delete)
    async deleteCourse(id: string) {
        const response = await axios.delete(`${API_URL}/courses/${id}`);
        return response.data;
    },

    // Add a section to a course
    async addSection(courseId: string, sectionData: Partial<Section>) {
        const response = await axios.post(`${API_URL}/courses/${courseId}/sections`, sectionData);
        return response.data;
    },

    // Update a section
    async updateSection(courseId: string, sectionId: string, sectionData: Partial<Section>) {
        const response = await axios.put(
            `${API_URL}/courses/${courseId}/sections/${sectionId}`,
            sectionData
        );
        return response.data;
    },

    // Delete a section
    async deleteSection(courseId: string, sectionId: string) {
        const response = await axios.delete(
            `${API_URL}/courses/${courseId}/sections/${sectionId}`
        );
        return response.data;
    },

    // Enroll in a course
    async enrollCourse(courseId: string) {
        const response = await axios.post(`${API_URL}/courses/${courseId}/enroll`);
        return response.data;
    },

    // Unenroll from a course
    async unenrollCourse(courseId: string) {
        const response = await axios.post(`${API_URL}/courses/${courseId}/unenroll`);
        return response.data;
    },

    // Complete a section
    async completeSection(courseId: string, sectionId: string) {
        const response = await axios.post(
            `${API_URL}/courses/${courseId}/sections/${sectionId}/complete`
        );
        return response.data;
    },

    // Submit a quiz
    async submitQuiz(courseId: string, sectionId: string, answers: number[]) {
        const response = await axios.post(
            `${API_URL}/courses/${courseId}/sections/${sectionId}/quiz/submit`,
            { answers }
        );
        return response.data;
    },

    // Get course progress
    async getProgress(courseId: string) {
        const response = await axios.get(`${API_URL}/courses/${courseId}/progress`);
        return response.data;
    },

    // Update quiz
    async updateQuiz(courseId: string, sectionId: string, quizData: Partial<Quiz>) {
        const response = await axios.put(
            `${API_URL}/courses/${courseId}/sections/${sectionId}/quiz`,
            quizData
        );
        return response.data;
    }
}; 