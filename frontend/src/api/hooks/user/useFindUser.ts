import { useMutation, useQueryClient } from "@tanstack/react-query";
import { findUser } from "../../user";

export const useFindUser = () => {
    // this hook handles finding user usually for display profile
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: findUser,
        onSuccess: (data) => {
            queryClient.setQueryData(["currentUser"], data.data);
        },
        onError: (error) => {
            console.error("User find error:", error);
        },
    });
};
