import { useQuery } from "@tanstack/react-query";
import { getCourseAnalytics } from "../../courses";
import { toast } from "sonner";

export const useCourseAnalytics = (courseId: string) => {
    return useQuery({
        queryKey: ['course-analytics', courseId],
        queryFn: () => getCourseAnalytics(courseId),
        onError: (error: any) => {
            console.error("Analytics fetch error:", error);
            toast.error(error.response?.data?.message || "Failed to fetch analytics");
        },
        staleTime: 5 * 60 * 1000, // 5 minutes
    });
}; 