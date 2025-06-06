import axios from 'axios';
import { LeaderboardEntry } from '../types/leaderboard';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000';

export const leaderboardService = {
    // Get global leaderboard
    async getGlobalLeaderboard(params?: {
        page?: number;
        limit?: number;
        timeRange?: 'daily' | 'weekly' | 'monthly' | 'all';
    }) {
        const response = await axios.get(`${API_URL}/leaderboard/global`, { params });
        return response.data;
    },

    // Get course-specific leaderboard
    async getCourseLeaderboard(courseId: string, params?: {
        page?: number;
        limit?: number;
    }) {
        const response = await axios.get(`${API_URL}/leaderboard/course/${courseId}`, { params });
        return response.data;
    },

    // Get user's position in leaderboard
    async getUserPosition(userId: string, courseId?: string) {
        const url = courseId
            ? `${API_URL}/leaderboard/position/${userId}?courseId=${courseId}`
            : `${API_URL}/leaderboard/position/${userId}`;
        const response = await axios.get(url);
        return response.data;
    },

    // Get user's XP history
    async getUserXpHistory(userId: string, params?: {
        startDate?: string;
        endDate?: string;
        limit?: number;
    }) {
        const response = await axios.get(`${API_URL}/leaderboard/xp-history/${userId}`, { params });
        return response.data;
    },

    // Get top performers in a specific category
    async getTopPerformers(category: string, params?: {
        limit?: number;
        timeRange?: 'daily' | 'weekly' | 'monthly' | 'all';
    }) {
        const response = await axios.get(`${API_URL}/leaderboard/top/${category}`, { params });
        return response.data;
    }
}; 