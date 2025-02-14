import { useMutation, useQueryClient } from "@tanstack/react-query";
import { register } from "../auth";
import { useApp } from "@/app/app-provider";

export const useRegister = () => {
    const queryClient = useQueryClient();
    const { setUser, setIsAuth } = useApp();


    return useMutation({
        mutationFn: register,
        onSuccess: (data) => {
            setUser(data);
            setIsAuth(true);
            queryClient.setQueryData(["currentUser"], data);
        },
        onError: (error) => {
            console.error("Registration Error:", error);
        },
    });
};
