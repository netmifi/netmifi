import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { getCourseSchedule, updateCourseSchedule } from "../../courses";
import { toast } from "sonner";

export const useCourseSchedule = (courseId: string) => {
    const queryClient = useQueryClient();

    const { data: schedule, isLoading } = useQuery({
        queryKey: ['course-schedule', courseId],
        queryFn: () => getCourseSchedule(courseId),
        onError: (error: any) => {
            console.error("Schedule fetch error:", error);
            toast.error(error.response?.data?.message || "Failed to fetch schedule");
        },
    });

    const updateSchedule = useMutation({
        mutationFn: (sessions: Array<{
            date: Date;
            duration: number;
            title: string;
            description: string;
        }>) => updateCourseSchedule(courseId, sessions),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['course-schedule', courseId] });
            toast.success("Schedule updated successfully");
        },
        onError: (error: any) => {
            console.error("Schedule update error:", error);
            toast.error(error.response?.data?.message || "Failed to update schedule");
        },
    });

    return {
        schedule,
        isLoading,
        updateSchedule: updateSchedule.mutate,
        isUpdating: updateSchedule.isPending,
    };
}; 