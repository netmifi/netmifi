import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000';

export const instructorService = {
    // Get all instructors
    async getInstructors(params?: {
        category?: string;
        instructor?: string;
        search?: string;
        page?: number;
        limit?: number;
    }) {
        const response = await axios.get(`${API_URL}/instructors`, { params });
        return response.data;
    },

    // Get a single instructor
    async getInstructor(id: string) {
        const response = await axios.get(`${API_URL}/instructors/${id}`);
        return response.data;
    },

    // Create a instructor
    async createInstructor(instructorData: Partial<Instructor>) {
        const response = await axios.post(`${API_URL}/instructors/create`, instructorData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        });
        return response.data;
    },

    // Update a instructor
    async updateInstructor(id: string, instructorData: Partial<Instructor>) {
        const response = await axios.put(`${API_URL}/instructors/${id}`, instructorData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        });
        return response.data;
    },

    // Delete a instructor (soft delete)
    async deleteInstructor(id: string) {
        const response = await axios.delete(`${API_URL}/instructors/${id}`);
        return response.data;
    },

    // Enroll in a instructor
    async enrollInstructor(instructorId: string) {
        const response = await axios.post(`${API_URL}/instructors/${instructorId}/enroll`);
        return response.data;
    },

    // Unenroll from a instructor
    async unenrollInstructor(instructorId: string) {
        const response = await axios.post(`${API_URL}/instructors/${instructorId}/unenroll`);
        return response.data;
    },

    // Get instructor progress
    async getProgress(instructorId: string) {
        const response = await axios.get(`${API_URL}/instructors/${instructorId}/progress`);
        return response.data;
    },


}; 