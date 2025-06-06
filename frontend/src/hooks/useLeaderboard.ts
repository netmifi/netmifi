import { useState, useEffect } from 'react';
import { leaderboardService } from '../services/leaderboardService';
import {
    LeaderboardEntry,
    LeaderboardResponse,
    UserPosition,
    XpHistoryResponse,
    TopPerformersResponse
} from '../types/leaderboard';

export const useLeaderboard = (userId?: string) => {
    const [globalLeaderboard, setGlobalLeaderboard] = useState<LeaderboardEntry[]>([]);
    const [courseLeaderboard, setCourseLeaderboard] = useState<LeaderboardEntry[]>([]);
    const [userPosition, setUserPosition] = useState<UserPosition | null>(null);
    const [xpHistory, setXpHistory] = useState<XpHistoryResponse | null>(null);
    const [topPerformers, setTopPerformers] = useState<TopPerformersResponse | null>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [pagination, setPagination] = useState({
        page: 1,
        total: 0,
        totalPages: 0
    });

    // Fetch global leaderboard
    const fetchGlobalLeaderboard = async (params?: {
        page?: number;
        limit?: number;
        timeRange?: 'daily' | 'weekly' | 'monthly' | 'all';
    }) => {
        try {
            setLoading(true);
            setError(null);
            const data: LeaderboardResponse = await leaderboardService.getGlobalLeaderboard(params);
            setGlobalLeaderboard(data.entries);
            setPagination({
                page: data.page,
                total: data.total,
                totalPages: data.totalPages
            });
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Failed to fetch global leaderboard');
        } finally {
            setLoading(false);
        }
    };

    // Fetch course-specific leaderboard
    const fetchCourseLeaderboard = async (courseId: string, params?: {
        page?: number;
        limit?: number;
    }) => {
        try {
            setLoading(true);
            setError(null);
            const data: LeaderboardResponse = await leaderboardService.getCourseLeaderboard(
                courseId,
                params
            );
            setCourseLeaderboard(data.entries);
            setPagination({
                page: data.page,
                total: data.total,
                totalPages: data.totalPages
            });
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Failed to fetch course leaderboard');
        } finally {
            setLoading(false);
        }
    };

    // Fetch user's position
    const fetchUserPosition = async (courseId?: string) => {
        if (!userId) return;
        try {
            setLoading(true);
            setError(null);
            const data = await leaderboardService.getUserPosition(userId, courseId);
            setUserPosition(data);
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Failed to fetch user position');
        } finally {
            setLoading(false);
        }
    };

    // Fetch user's XP history
    const fetchXpHistory = async (params?: {
        startDate?: string;
        endDate?: string;
        limit?: number;
    }) => {
        if (!userId) return;
        try {
            setLoading(true);
            setError(null);
            const data = await leaderboardService.getUserXpHistory(userId, params);
            setXpHistory(data);
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Failed to fetch XP history');
        } finally {
            setLoading(false);
        }
    };

    // Fetch top performers
    const fetchTopPerformers = async (category: string, params?: {
        limit?: number;
        timeRange?: 'daily' | 'weekly' | 'monthly' | 'all';
    }) => {
        try {
            setLoading(true);
            setError(null);
            const data = await leaderboardService.getTopPerformers(category, params);
            setTopPerformers(data);
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Failed to fetch top performers');
        } finally {
            setLoading(false);
        }
    };

    // Effect to fetch user position when userId changes
    useEffect(() => {
        if (userId) {
            fetchUserPosition();
            fetchXpHistory();
        }
    }, [userId]);

    return {
        globalLeaderboard,
        courseLeaderboard,
        userPosition,
        xpHistory,
        topPerformers,
        loading,
        error,
        pagination,
        fetchGlobalLeaderboard,
        fetchCourseLeaderboard,
        fetchUserPosition,
        fetchXpHistory,
        fetchTopPerformers
    };
}; 