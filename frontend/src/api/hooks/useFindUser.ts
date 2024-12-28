import { useMutation, useQueryClient } from "@tanstack/react-query";
import { findUser } from "../user";

export const useFindUser = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: findUser,
        onSuccess: (data) => {
            queryClient.setQueryData(["currentUser"], data);
        },
        onError: (error) => {
            console.error("User find error:", error);
        },
    });
};
