import { useMutation, useQueryClient } from "@tanstack/react-query";
import { mailCode } from "../../auth";

export const useMailGenCode = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: mailCode,
        onSuccess: (data) => {
            queryClient.setQueryData(["mailCode"], data);
        },
        onError: (error) => {
            console.error("Mail Error:", error);
        },
    });
};
