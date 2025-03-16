import { useMutation, useQueryClient } from "@tanstack/react-query";
import { logout } from "../../auth";
import { useApp } from "@/app/app-provider";

export const useLogout = () => {
    const { setUser, setIsAuth } = useApp();


    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: logout,
        onSuccess: (data) => {
            setUser(null);
            setIsAuth(false);
            queryClient.setQueryData(["Logout"], data);
        },
        onError: (error) => {
            console.error("Logout error:", error);
        },
    });
};
