import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createCourse } from "../../courses";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

export const useCreateCourse = () => {
    const navigate = useNavigate();
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: createCourse,
        onSuccess: (data) => {
            if (data.state === 'success') {
                queryClient.invalidateQueries({ queryKey: ['instructor-courses'] });
                toast.success("Course created successfully!");
                navigate("/instructor/dashboard");
            } else {
                toast.error(data.message || "Failed to create course");
            }
        },
        onError: (error: any) => {
            console.error("Course creation error:", error);
            toast.error(error.response?.data?.message || "Failed to create course");
        },
    });
}; 