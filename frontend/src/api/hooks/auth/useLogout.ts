import { useMutation, useQueryClient } from "@tanstack/react-query";
import { logout } from "../../auth";
import { useApp } from "@/app/app-provider";

export const useLogout = () => {
    const queryClient = useQueryClient();
    const { setUser, setIsAuth } = useApp();

    return useMutation({
        mutationFn: logout,// **REF ../../auth**
        onSuccess: (data) => {
            setUser(null); // set user context state to null to remove stored user state
            setIsAuth(false);
            queryClient.setQueryData(["Logout"], data);
        },
        onError: (error) => {
            console.error("Logout error:", error);
        },
    });
};
