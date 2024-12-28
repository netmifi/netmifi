import { useMutation, useQueryClient } from "@tanstack/react-query";
import { register } from "../auth";

export const useRegister = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: register,
        onSuccess: (data) => {
            queryClient.setQueryData(["currentUser"], data);
        },
        onError: (error) => {
            console.error("Registration Error:", error);
        },
    });
};
