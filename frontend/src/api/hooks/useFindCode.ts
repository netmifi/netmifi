import { useMutation, useQueryClient } from "@tanstack/react-query";
import { findCode } from "../auth";

export const useFindCode = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: findCode,
        onSuccess: (data) => {
            queryClient.setQueryData(["generatedCode"], data);
        },
        onError: (error) => {
            console.error("Seek Error:", error);
        },
    });
};
