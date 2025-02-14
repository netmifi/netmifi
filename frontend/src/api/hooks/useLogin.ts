import { useMutation, useQueryClient } from "@tanstack/react-query";
import { login } from "../auth";
import { useApp } from "@/app/app-provider";

export const useLogin = () => {
    const { setUser, setIsAuth } = useApp();


    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: login,
        // cacheTime: 1000 * 60 * 60, // Cache data for 1 hour
        gcTime: 1000 * 60 * 60,
        onSuccess: (data) => {
            console.log(data)
            setUser(data);
            setIsAuth(true);
            queryClient.setQueryData(["currentUser"], data);
        },
        onError: (error) => {
            console.error("Login Error:", error);
        },
    });
};
