import { useMutation, useQueryClient } from "@tanstack/react-query";
import { changeTheme } from "../../user";
import { useApp } from "@/app/app-provider";

export const useChangeTheme = () => {
    //  tanstack mutation handles hook
    const { setUser, setIsAuth } = useApp();
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: changeTheme,
        onSuccess: (data) => {
            queryClient.setQueryData(["currentUser"], data);
            setUser(data.data);
            setIsAuth(true);
        },
        onError: (error) => {
            console.error("Update Error:", error);
        },
    });
};
