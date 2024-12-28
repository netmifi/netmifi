import { useMutation, useQueryClient } from "@tanstack/react-query";
import { login } from "../auth";

export const useLogin = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: login,
        // cacheTime: 1000 * 60 * 60, // Cache data for 1 hour
        gcTime: 1000 * 60 * 60,
        onSuccess: (data) => {
            queryClient.setQueryData(["currentUser"], data);
        },
        onError: (error) => {
            console.error("Login Error:", error);
        },
    });
};
