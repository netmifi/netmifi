export interface LeaderboardEntry {
    _id: string;
    user: {
        _id: string;
        name: string;
        email: string;
        avatar?: string;
    };
    xp: number;
    rank: number;
    progress: {
        completedCourses: number;
        totalCourses: number;
        completedSections: number;
        totalSections: number;
    };
    achievements: string[];
}

export interface LeaderboardResponse {
    entries: LeaderboardEntry[];
    total: number;
    page: number;
    totalPages: number;
}

export interface UserPosition {
    rank: number;
    xp: number;
    percentile: number;
    totalUsers: number;
}

export interface XpHistoryEntry {
    date: Date;
    xp: number;
    source: 'course' | 'quiz' | 'achievement' | 'other';
    details: {
        courseId?: string;
        courseName?: string;
        sectionId?: string;
        sectionName?: string;
        achievementId?: string;
        achievementName?: string;
    };
}

export interface XpHistoryResponse {
    history: XpHistoryEntry[];
    total: number;
    startDate: Date;
    endDate: Date;
}

export interface TopPerformersResponse {
    category: string;
    performers: LeaderboardEntry[];
    timeRange: 'daily' | 'weekly' | 'monthly' | 'all';
    total: number;
} 