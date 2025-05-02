import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { getStudentProgress, updateStudentProgress } from "../../courses";
import { toast } from "sonner";

export const useStudentProgress = (courseId: string) => {
    const queryClient = useQueryClient();

    const { data: progress, isLoading } = useQuery({
        queryKey: ['student-progress', courseId],
        queryFn: () => getStudentProgress(courseId),
        onError: (error: any) => {
            console.error("Progress fetch error:", error);
            toast.error(error.response?.data?.message || "Failed to fetch progress");
        },
    });

    const updateProgress = useMutation({
        mutationFn: (data: { sectionId: string; quizScore?: number; timeSpent?: number }) => 
            updateStudentProgress(courseId, data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['student-progress', courseId] });
            queryClient.invalidateQueries({ queryKey: ['course-analytics', courseId] });
        },
        onError: (error: any) => {
            console.error("Progress update error:", error);
            toast.error(error.response?.data?.message || "Failed to update progress");
        },
    });

    return {
        progress,
        isLoading,
        updateProgress: updateProgress.mutate,
        isUpdating: updateProgress.isPending,
    };
}; 