
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateProfile } from "../../user";
import { useApp } from "@/app/app-provider";

export const useProfileUpdate = () => {
    const { setUser, setIsAuth } = useApp();
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: updateProfile,
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
