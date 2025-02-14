import { useMutation, useQueryClient } from "@tanstack/react-query";
import { registerInstructor } from "../auth";
import { useApp } from "@/app/app-provider";

export const useInstructorRegister = () => {
        const { setUser, setIsAuth } = useApp();

    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: registerInstructor,
        onSuccess: (data) => {
            setUser(data.user);
            setIsAuth(true);
            queryClient.setQueryData(["currentUser"], data);
        },
        onError: (error) => {
            console.error("Application error:", error);
        },
    });
};
