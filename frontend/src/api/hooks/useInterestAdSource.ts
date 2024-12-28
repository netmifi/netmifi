import { useMutation, useQueryClient } from "@tanstack/react-query";
import { interestAdSource } from "../auth";

export const useIntrestAdSource = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: interestAdSource,
        onSuccess: (data) => {
            queryClient.setQueryData(["currentUser"], data);
        },
        onError: (error) => {
            console.error("Update Error", error);
        },
    });
};
