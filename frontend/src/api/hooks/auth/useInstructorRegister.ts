//  manages instructor register request and response
import { useMutation } from "@tanstack/react-query";
import { instructorRegister } from "../../auth";
import { useNavigate } from "react-router-dom";
import { useApp } from "@/app/app-provider";
import { toast } from "sonner";
import { useQueryClient } from "@tanstack/react-query";

export const useInstructorRegister = () => {
    const navigate = useNavigate();
    const { setUser, setIsAuth } = useApp();
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: instructorRegister,
        onSuccess: (response) => {
            if (response.state === 'success') {
                // Update user state
                setUser(response.data.user);
                setIsAuth(true);
                
                // Update cache
                queryClient.setQueryData(['current-user'], response.data.user);
                
                // Show success message
                toast.success("Instructor registration successful!", {
                    description: "You can now access your instructor dashboard"
                });
                
                // Navigate to dashboard
                navigate("/instructor/dashboard");
            } else {
                toast.error(response.message || "Registration failed", {
                    description: "Please check your information and try again"
                });
            }
        },
        onError: (error: any) => {
            console.error("Registration error:", error);
            
            // Handle specific error cases
            if (error.response?.status === 409) {
                toast.error("Registration failed", {
                    description: "You are already registered as an instructor"
                });
            } else if (error.response?.status === 400) {
                toast.error("Invalid information", {
                    description: error.response.data.message || "Please check your form data"
                });
            } else {
                toast.error("Registration failed", {
                    description: error.response?.data?.message || 
                               error.message || 
                               "An unexpected error occurred. Please try again."
                });
            }
        }
    });
};
