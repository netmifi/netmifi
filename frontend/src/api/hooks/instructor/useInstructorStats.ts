import { useQuery } from "@tanstack/react-query";
import { api } from "@/api/axios";

interface InstructorStats {
  earnings: number;
  earningsTrend: string;
  totalCourses: number;
  coursesTrend: string;
  totalStudents: number;
  studentsTrend: string;
  totalFollowers: number;
  followersTrend: string;
  totalReviews: number;
  averageRating: number;
  upcomingSessions: number;
  sessionsToday: number;
  performanceScore: number;
  performanceRank: number;
  certifications: number;
  newBadges: number;
  completionRate: number;
  studentSatisfaction: number;
  engagementRate: number;
  recentCourses: Array<{
    id: string;
    title: string;
    thumbnail: string;
    price: number;
    rating: number;
    reviews: number;
    students: number;
    createdAt: string;
  }>;
}

export const getInstructorStats = async (): Promise<InstructorStats> => {
  const response = await api.get("/instructor/stats");
  return response.data;
};

export const useInstructorStats = () => {
  return useQuery({
    queryKey: ["instructorStats"],
    queryFn: getInstructorStats,
  });
}; 