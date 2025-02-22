import { useMutation, useQueryClient } from "@tanstack/react-query";
import { checkUserAuth } from "../../user";
import { useApp } from "@/app/app-provider";

export const useCheckUserAuth = () => {
    const { setUser, setIsAuth } = useApp();
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: checkUserAuth,
        onSuccess: (data) => {
            queryClient.setQueryData(["currentUser"], data);
            setUser(data.data);
            setIsAuth(true)
        },
        onError: (error) => {
            console.error("Update Error:", error);
        },
    });
};
