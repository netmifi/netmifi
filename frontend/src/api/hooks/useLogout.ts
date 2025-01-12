import { useMutation, useQueryClient } from "@tanstack/react-query";
import { logout } from "../auth";

export const useLogout = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: logout,
        onSuccess: (data) => {
            queryClient.setQueryData(["Logout"], data);
        },
        onError: (error) => {
            console.error("Logout error:", error);
        },
    });
};
