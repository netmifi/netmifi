import { useMutation, useQueryClient } from "@tanstack/react-query";
import { changePassword } from "../auth";

export const useChangePassword = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: changePassword,
        onSuccess: (data) => {
            queryClient.setQueryData(["currentUser"], data);
        },
        onError: (error) => {
            console.error("Update Error:", error);
        },
    });
};
