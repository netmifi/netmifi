import { useMutation, useQueryClient } from "@tanstack/react-query";
import { resendCode } from "../auth";

export const useResendCode = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: resendCode,
        onSuccess: (data) => {
            queryClient.setQueryData(["resentData"], data);
        },
        onError: (error) => {
            console.error("Resend code error find error:", error);
        },
    });
};
