import { useMutation, useQueryClient } from "@tanstack/react-query";
import { registerInstructor } from "../auth";

export const useInstructorRegister = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: registerInstructor,
        onSuccess: (data) => {
            queryClient.setQueryData(["currentUser"], data);
        },
        onError: (error) => {
            console.error("Application error:", error);
        },
    });
};
